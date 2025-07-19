'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface TestResult {
  testId: string;
  testType: string;
  status: string;
  compatibilityScore: number;
  categoryScores: {
    personality: number;
    relationship: number;
    values: number;
    communication: number;
    intimacy: number;
  };
  report: {
    summary: string;
    details: string;
    recommendations: string[];
  };
  duration: number;
  startTime: string;
  endTime: string;
}

export default function TestResultPage() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;

  useEffect(() => {
    loadTestResult();
  }, [testId]);

  const loadTestResult = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:3001/api/v1/tests/${testId}/result`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        alert('加载测试结果失败：' + data.message);
        router.push('/dashboard');
      }
    } catch (error) {
      alert('网络错误，请稍后重试');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return '优秀';
    if (score >= 60) return '良好';
    if (score >= 40) return '一般';
    return '需要提升';
  };

  const getCompatibilityLevel = (score: number) => {
    if (score >= 80) return '天生一对';
    if (score >= 60) return '很有潜力';
    if (score >= 40) return '需要努力';
    return '建议深思';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载测试结果中...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">测试结果加载失败</p>
          <Link href="/dashboard" className="text-purple-600 hover:text-purple-500 mt-4 block">
            返回仪表板
          </Link>
        </div>
      </div>
    );
  }

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
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                返回仪表板
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 结果标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            测试结果分析
          </h1>
          <p className="text-xl text-gray-600">
            基于你的回答，AI为你生成了详细的分析报告
          </p>
        </div>

        {/* 总体契合度 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              总体契合度
            </h2>
            <div className="mb-6">
              <div className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {result.compatibilityScore}%
              </div>
              <div className="text-xl text-gray-600 mb-4">
                {getCompatibilityLevel(result.compatibilityScore)}
              </div>
              <div className="w-64 h-4 bg-gray-200 rounded-full mx-auto">
                <div 
                  className="h-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-1000"
                  style={{ width: `${result.compatibilityScore}%` }}
                ></div>
              </div>
            </div>
            <p className="text-gray-600">
              测试用时：{result.duration} 分钟
            </p>
          </div>
        </div>

        {/* 各维度分析 */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              各维度分析
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">个性特质</span>
                  <span className={`font-semibold ${getScoreColor(result.categoryScores.personality)}`}>
                    {result.categoryScores.personality}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${result.categoryScores.personality}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {getScoreLevel(result.categoryScores.personality)}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">关系处理</span>
                  <span className={`font-semibold ${getScoreColor(result.categoryScores.relationship)}`}>
                    {result.categoryScores.relationship}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-pink-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${result.categoryScores.relationship}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {getScoreLevel(result.categoryScores.relationship)}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">价值观</span>
                  <span className={`font-semibold ${getScoreColor(result.categoryScores.values)}`}>
                    {result.categoryScores.values}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${result.categoryScores.values}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {getScoreLevel(result.categoryScores.values)}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">沟通方式</span>
                  <span className={`font-semibold ${getScoreColor(result.categoryScores.communication)}`}>
                    {result.categoryScores.communication}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-pink-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${result.categoryScores.communication}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {getScoreLevel(result.categoryScores.communication)}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">亲密关系</span>
                  <span className={`font-semibold ${getScoreColor(result.categoryScores.intimacy)}`}>
                    {result.categoryScores.intimacy}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${result.categoryScores.intimacy}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {getScoreLevel(result.categoryScores.intimacy)}
                </div>
              </div>
            </div>
          </div>

          {/* AI分析报告 */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              AI分析报告
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">总结</h4>
                <p className="text-gray-600 leading-relaxed">
                  {result.report.summary}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">详细分析</h4>
                <p className="text-gray-600 leading-relaxed">
                  {result.report.details}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 个性化建议 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            个性化建议
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {result.report.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start">
                <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/test/single"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              再次测试
            </Link>
            <Link
              href="/dashboard"
              className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200"
            >
              返回仪表板
            </Link>
          </div>
          <p className="text-gray-500 text-sm">
            测试结果已保存，你可以在历史记录中查看
          </p>
        </div>
      </div>
    </div>
  );
} 