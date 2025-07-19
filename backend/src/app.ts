import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import userRoutes from './routes/userRoutes';
import testRoutes from './routes/testRoutes';

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();
const PORT = process.env['PORT'] || 3001;

// CORS配置
app.use(cors({ origin: '*', credentials: true }));

// 解析JSON请求体
app.use(express.json());

// 健康检查接口
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'AI_Love 后端服务运行正常',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API路由
app.get('/api/v1', (_req, res) => {
  res.json({
    success: true,
    message: 'AI_Love API 服务',
    version: '1.0.0',
    endpoints: {
      users: '/api/v1/users',
      tests: '/api/v1/tests',
      reports: '/api/v1/reports',
      data: '/api/v1/data'
    }
  });
});

// 用户管理路由
app.use('/api/v1/users', userRoutes);

// 测试系统路由
app.use('/api/v1/tests', testRoutes);

// 测试接口
app.get('/test', (_req, res) => {
  res.json({
    success: true,
    message: '测试接口正常',
    timestamp: new Date().toISOString()
  });
});

// 404处理
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    message: '接口不存在',
    timestamp: new Date().toISOString()
  });
});

// 启动服务器
const startServer = async () => {
  try {
    // 连接数据库
    await connectDatabase();
    
    // 启动服务器
    app.listen(PORT, () => {
      console.log(`🚀 AI_Love 后端服务已启动`);
      console.log(`📍 服务地址: http://localhost:${PORT}`);
      console.log(`📊 健康检查: http://localhost:${PORT}/health`);
      console.log(`🧪 测试接口: http://localhost:${PORT}/test`);
      console.log(`👤 用户API: http://localhost:${PORT}/api/v1/users`);
      console.log(`🧪 测试API: http://localhost:${PORT}/api/v1/tests`);
      console.log(`🗄️ 数据库: MongoDB Atlas 已连接`);
    });
  } catch (error) {
    console.error('❌ 服务器启动失败:', error);
    process.exit(1);
  }
};

startServer();

export default app; 