'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SingleTestPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const startTest = async () => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:3001/api/v1/tests/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          testType: 'single'
        })
      });

      const data = await response.json();

      if (data.success) {
        // 跳转到测试问卷页面
        router.push(`/test/questionnaire/${data.data.testId}`);
      } else {
        alert('开始测试失败：' + data.message);
      }
    } catch (error) {
      alert('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 测试介绍 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            单人爱情测试
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            通过18道精心设计的心理学问题，深度分析你的爱情观和情感特质
          </p>
        </div>

        {/* 测试信息卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 左侧：测试详情 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                测试详情
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">18</span>
                  </div>
                  <span className="text-gray-700">道测试题目</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-pink-600 font-semibold">10</span>
                  </div>
                  <span className="text-gray-700">分钟完成时间</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">5</span>
                  </div>
                  <span className="text-gray-700">个分析维度</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-pink-600 font-semibold">AI</span>
                  </div>
                  <span className="text-gray-700">智能分析报告</span>
                </div>
              </div>
            </div>

            {/* 右侧：分析维度 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                分析维度
              </h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">个性特质</span>
                </div>
                <div className="flex items-center p-3 bg-pink-50 rounded-lg">
                  <div className="w-4 h-4 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">关系处理</span>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">价值观</span>
                </div>
                <div className="flex items-center p-3 bg-pink-50 rounded-lg">
                  <div className="w-4 h-4 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">沟通方式</span>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">亲密关系</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 测试说明 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            测试说明
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>• 请根据你的真实想法和感受回答问题，没有对错之分</p>
            <p>• 测试过程中可以随时保存进度，稍后继续</p>
            <p>• 所有数据严格保密，仅用于生成个性化分析报告</p>
            <p>• 测试完成后将获得详细的契合度分析和成长建议</p>
          </div>
        </div>

        {/* 开始测试按钮 */}
        <div className="text-center">
          <button
            onClick={startTest}
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '准备中...' : '开始测试'}
          </button>
          <p className="text-gray-500 mt-4">
            点击开始测试，你将进入问卷页面
          </p>
        </div>
      </div>
    </div>
  );
} 