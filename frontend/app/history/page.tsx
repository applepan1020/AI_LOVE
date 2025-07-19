'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TestHistory {
  _id: string;
  testType: string;
  status: string;
  compatibilityScore: number;
  startTime: string;
  endTime: string;
  duration: number;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<TestHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      // 这里需要后端提供获取历史记录的API
      // 暂时使用模拟数据
      const mockHistory: TestHistory[] = [
        {
          _id: '1',
          testType: 'single',
          status: 'completed',
          compatibilityScore: 85,
          startTime: '2024-01-15T10:00:00Z',
          endTime: '2024-01-15T10:15:00Z',
          duration: 15
        },
        {
          _id: '2',
          testType: 'single',
          status: 'completed',
          compatibilityScore: 72,
          startTime: '2024-01-10T14:30:00Z',
          endTime: '2024-01-10T14:42:00Z',
          duration: 12
        }
      ];

      setHistory(mockHistory);
    } catch (error) {
      console.error('加载历史记录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载历史记录中...</p>
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
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            测试历史记录
          </h1>
          <p className="text-xl text-gray-600">
            查看你所有的测试结果和分析报告
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {history.length}
            </div>
            <div className="text-gray-600">总测试次数</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">
              {history.length > 0 ? Math.round(history.reduce((sum, test) => sum + test.compatibilityScore, 0) / history.length) : 0}
            </div>
            <div className="text-gray-600">平均契合度</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {history.length > 0 ? Math.round(history.reduce((sum, test) => sum + test.duration, 0) / history.length) : 0}
            </div>
            <div className="text-gray-600">平均用时(分钟)</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">
              {history.filter(test => test.compatibilityScore >= 80).length}
            </div>
            <div className="text-gray-600">优秀结果</div>
          </div>
        </div>

        {/* 历史记录列表 */}
        {history.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              暂无测试记录
            </h3>
            <p className="text-gray-600 mb-6">
              你还没有完成任何测试，开始你的第一次测试吧！
            </p>
            <Link
              href="/test/single"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              开始测试
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((test) => (
              <div key={test._id} className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  {/* 左侧信息 */}
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {test.testType === 'single' ? '单人测试' : '情侣测试'}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {formatDate(test.startTime)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">契合度</div>
                        <div className={`text-lg font-semibold ${getScoreColor(test.compatibilityScore)}`}>
                          {test.compatibilityScore}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {getScoreLevel(test.compatibilityScore)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">测试用时</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {test.duration} 分钟
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">状态</div>
                        <div className="text-lg font-semibold text-green-600">
                          已完成
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">测试类型</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {test.testType === 'single' ? '单人' : '情侣'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 右侧操作 */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
                    <Link
                      href={`/test/result/${test._id}`}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
                    >
                      查看详情
                    </Link>
                    <button className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                      分享
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 底部操作 */}
        <div className="text-center mt-12">
          <Link
            href="/test/single"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            开始新测试
          </Link>
        </div>
      </div>
    </div>
  );
} 