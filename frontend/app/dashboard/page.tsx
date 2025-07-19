'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  username: string;
  email: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 检查用户是否已登录
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userData);
      setUser(user);
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                AI_Love
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">欢迎，{user.username}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎区域 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              欢迎回来，{user.username}！
            </h2>
            <p className="text-gray-600 mb-6">
              准备好开始你的爱情测试之旅了吗？
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/test/single"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                开始单人测试
              </Link>
              <Link
                href="/test/couple"
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200"
              >
                情侣测试
              </Link>
            </div>
          </div>
        </div>

        {/* 功能卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* 测试历史 */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">测试历史</h3>
              <p className="text-gray-600 mb-4">查看你之前的测试结果和分析报告</p>
              <Link
                href="/history"
                className="text-purple-600 hover:text-purple-500 font-semibold"
              >
                查看历史 →
              </Link>
            </div>
          </div>

          {/* 个人资料 */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">个人资料</h3>
              <p className="text-gray-600 mb-4">管理你的个人信息和偏好设置</p>
              <Link
                href="/profile"
                className="text-purple-600 hover:text-purple-500 font-semibold"
              >
                编辑资料 →
              </Link>
            </div>
          </div>

          {/* AI建议 */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI建议</h3>
              <p className="text-gray-600 mb-4">获取个性化的情感建议和成长指导</p>
              <Link
                href="/advice"
                className="text-purple-600 hover:text-purple-500 font-semibold"
              >
                查看建议 →
              </Link>
            </div>
          </div>
        </div>

        {/* 快速统计 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">你的测试统计</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-gray-600">已完成测试</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">0</div>
              <div className="text-gray-600">平均契合度</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-gray-600">生成报告</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">0</div>
              <div className="text-gray-600">获得建议</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 