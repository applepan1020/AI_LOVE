'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isActive: boolean;
  lastLoginAt: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:3001/api/v1/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setProfile(data.data);
        setFormData({
          username: data.data.username,
          email: data.data.email
        });
      } else {
        alert('加载用户信息失败：' + data.message);
        router.push('/login');
      }
    } catch (error) {
      console.error('加载用户信息失败:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:3001/api/v1/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setProfile(prev => prev ? { ...prev, ...formData } : null);
        setEditing(false);
        alert('个人信息更新成功！');
      } else {
        alert('更新失败：' + data.message);
      }
    } catch (error) {
      alert('网络错误，请稍后重试');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载个人信息中...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">用户信息加载失败</p>
          <Link href="/login" className="text-purple-600 hover:text-purple-500 mt-4 block">
            重新登录
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            个人资料
          </h1>
          <p className="text-xl text-gray-600">
            管理你的个人信息和账户设置
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* 左侧：头像和基本信息 */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-4xl font-bold">
                    {profile.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {profile.username}
                </h3>
                <p className="text-gray-600 mb-4">
                  {profile.email}
                </p>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-600 text-sm">在线</span>
                </div>
                <button
                  onClick={() => setEditing(!editing)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {editing ? '取消编辑' : '编辑资料'}
                </button>
              </div>
            </div>
          </div>

          {/* 右侧：详细信息 */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                账户信息
              </h3>
              
              <div className="space-y-6">
                {/* 用户名 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    用户名
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      {profile.username}
                    </div>
                  )}
                </div>

                {/* 邮箱 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱地址
                  </label>
                  {editing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      {profile.email}
                    </div>
                  )}
                </div>

                {/* 注册时间 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    注册时间
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    {formatDate(profile.createdAt)}
                  </div>
                </div>

                {/* 最后登录 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最后登录
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    {formatDate(profile.lastLoginAt)}
                  </div>
                </div>

                {/* 账户状态 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    账户状态
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <span className="text-green-600 font-semibold">
                      {profile.isActive ? '正常' : '已禁用'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 保存按钮 */}
              {editing && (
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? '保存中...' : '保存更改'}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                  >
                    取消
                  </button>
                </div>
              )}
            </div>

            {/* 账户操作 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                账户操作
              </h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      <span className="text-gray-700">修改密码</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
                
                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-gray-700">隐私设置</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left p-4 border border-red-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-red-700">退出登录</span>
                    </div>
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 