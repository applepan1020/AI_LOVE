'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Question {
  _id: string;
  title: string;
  description?: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  category: string;
  options?: Array<{
    text: string;
    value: number;
    description?: string;
  }>;
  scaleRange?: {
    min: number;
    max: number;
    labels: {
      min: string;
      max: string;
    };
  };
  weight: number;
  order: number;
}

interface TestData {
  testId: string;
  testType: string;
  questions: Question[];
  totalQuestions: number;
  maxScore: number;
}

export default function QuestionnairePage() {
  const [testData, setTestData] = useState<TestData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;

  useEffect(() => {
    loadQuestions();
  }, [testId]);

  const loadQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:3001/api/v1/tests/${testId}/questions`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      const data = await response.json();

      if (data.success) {
        setTestData(data.data);
        // 恢复已保存的答案
        if (data.data.currentAnswers) {
          const savedAnswers: Record<string, any> = {};
          data.data.currentAnswers.forEach((answer: any) => {
            savedAnswers[answer.questionId] = answer.answer;
          });
          setAnswers(savedAnswers);
        }
      } else {
        alert('加载题目失败：' + data.message);
        router.push('/dashboard');
      }
    } catch (error) {
      alert('网络错误，请稍后重试');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer: any) => {
    if (!testData) return;

    const currentQuestion = testData.questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion._id]: answer }));

    // 提交答案到后端
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      await fetch(`http://localhost:3001/api/v1/tests/${testId}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          questionId: currentQuestion._id,
          answer: answer
        })
      });

      // 自动进入下一题
      if (currentQuestionIndex < testData.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    } catch (error) {
      console.error('提交答案失败:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async () => {
    if (!testData) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:3001/api/v1/tests/${testId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      const data = await response.json();

      if (data.success) {
        // 跳转到结果页面
        router.push(`/test/result/${testId}`);
      } else {
        alert('完成测试失败：' + data.message);
      }
    } catch (error) {
      alert('网络错误，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载题目中...</p>
        </div>
      </div>
    );
  }

  if (!testData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">测试数据加载失败</p>
          <Link href="/dashboard" className="text-purple-600 hover:text-purple-500 mt-4 block">
            返回仪表板
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = testData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / testData.totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                AI_Love
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                题目 {currentQuestionIndex + 1} / {testData.totalQuestions}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* 进度条 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>开始</span>
            <span>{Math.round(progress)}%</span>
            <span>完成</span>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 题目卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {currentQuestion.title}
            </h1>
            {currentQuestion.description && (
              <p className="text-gray-600">{currentQuestion.description}</p>
            )}
          </div>

          {/* 答案选项 */}
          <div className="space-y-4">
            {currentQuestion.type === 'single' && currentQuestion.options && (
              currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  disabled={submitting}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQuestion._id] === option.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  } ${submitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                      answers[currentQuestion._id] === option.value
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQuestion._id] === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium">{option.text}</span>
                  </div>
                </button>
              ))
            )}

            {currentQuestion.type === 'scale' && currentQuestion.scaleRange && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>{currentQuestion.scaleRange.labels.min}</span>
                  <span>{currentQuestion.scaleRange.labels.max}</span>
                </div>
                <div className="flex justify-between">
                  {Array.from({ length: currentQuestion.scaleRange.max - currentQuestion.scaleRange.min + 1 }, (_, i) => {
                    const value = i + currentQuestion.scaleRange!.min;
                    return (
                      <button
                        key={value}
                        onClick={() => handleAnswer(value)}
                        disabled={submitting}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                          answers[currentQuestion._id] === value
                            ? 'border-purple-500 bg-purple-500 text-white'
                            : 'border-gray-300 hover:border-purple-300'
                        } ${submitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0 || submitting}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一题
          </button>

          {currentQuestionIndex === testData.questions.length - 1 ? (
            <button
              onClick={handleComplete}
              disabled={submitting || !answers[currentQuestion._id]}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? '完成中...' : '完成测试'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              disabled={!answers[currentQuestion._id] || submitting}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一题
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 