export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* 英雄区域 */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
              AI_Love
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-8">
              AI驱动的爱情测试平台
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              通过先进的AI技术，深度分析你们的契合度，提供个性化的情感建议，
              让爱情更加美好。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center">
                登录
              </Link>
              <Link href="/register" className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200 text-center">
                注册
              </Link>
            </div>
          </div>
        </div>
        
        {/* 装饰元素 */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300 rounded-full opacity-40 animate-pulse delay-2000"></div>
      </section>

      {/* 功能特色 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              为什么选择AI_Love？
            </h2>
            <p className="text-xl text-gray-600">
              我们提供最先进的AI情感分析技术
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* 特色1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI智能分析</h3>
              <p className="text-gray-600">
                基于先进的AI算法，深度分析你们的契合度，提供科学的评估结果。
              </p>
            </div>

            {/* 特色2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">个性化建议</h3>
              <p className="text-gray-600">
                根据测试结果生成个性化的情感建议，帮助你们更好地了解彼此。
              </p>
            </div>

            {/* 特色3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">隐私保护</h3>
              <p className="text-gray-600">
                严格的数据加密和隐私保护措施，确保你们的个人信息安全。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 测试流程 */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              简单三步，开始你的爱情测试
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">选择测试模式</h3>
              <p className="text-gray-600">单人测试或情侣模式，根据你的需求选择</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">完成测试问卷</h3>
              <p className="text-gray-600">回答精心设计的心理学问题，大约需要10分钟</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">获取分析报告</h3>
              <p className="text-gray-600">AI生成详细的契合度分析和个性化建议</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              立即开始测试
            </button>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">AI_Love</h3>
            <p className="text-gray-400 mb-6">
              让AI为你的爱情保驾护航
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">关于我们</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">隐私政策</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">使用条款</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">联系我们</a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400">
                © 2024 AI_Love. 保留所有权利。
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 