# AI_Love 后端服务

## 🎉 最新状态：MongoDB连接成功！

### 数据库连接信息
- **连接字符串：** `mongodb+srv://ai_love_user:simple123@cluster0.r0ajv0u.mongodb.net/ai_love`
- **用户：** `ai_love_user`
- **状态：** ✅ 连接成功
- **数据库：** `ai_love`

### API测试结果
- ✅ 健康检查：`http://localhost:3001/health`
- ✅ 用户注册：`http://localhost:3001/api/v1/users/register`
- ✅ 数据库操作：用户数据成功保存到MongoDB Atlas

### 测试用户
- **用户名：** `testuser`
- **邮箱：** `test@example.com`
- **用户ID：** `687b5afa36d55ce1ed6d30dc`

---

## 项目概述

AI_Love 是一个基于AI的爱情测试和分析平台，提供个性化的爱情测试、AI分析和数据管理功能。

## 技术栈

- **运行时：** Node.js
- **框架：** Express.js
- **语言：** TypeScript
- **数据库：** MongoDB (MongoDB Atlas)
- **认证：** JWT
- **密码加密：** bcrypt
- **日志：** Winston
- **安全：** Helmet, CORS, Rate Limiting

## 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
cd backend
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
npm start
```

## API接口

### 基础接口
- `GET /health` - 健康检查
- `GET /test` - 测试接口
- `GET /api/v1` - API信息

### 用户管理
- `POST /api/v1/users/register` - 用户注册
- `POST /api/v1/users/login` - 用户登录
- `GET /api/v1/users/profile` - 获取用户信息
- `PUT /api/v1/users/profile` - 更新用户信息

### 测试系统
- `GET /api/v1/tests` - 获取测试列表
- `POST /api/v1/tests` - 创建测试
- `GET /api/v1/tests/:id` - 获取测试详情
- `POST /api/v1/tests/:id/submit` - 提交测试答案

### 报告系统
- `GET /api/v1/reports` - 获取报告列表
- `GET /api/v1/reports/:id` - 获取报告详情
- `POST /api/v1/reports` - 生成新报告

## 环境变量

创建 `.env` 文件：
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb+srv://ai_love_user:simple123@cluster0.r0ajv0u.mongodb.net/ai_love
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

## 项目结构

```
backend/
├── src/
│   ├── config/          # 配置文件
│   ├── controllers/     # 控制器
│   ├── models/          # 数据模型
│   ├── routes/          # 路由
│   ├── middleware/      # 中间件
│   └── app.ts          # 应用入口
├── tests/              # 测试文件
├── docs/               # 文档
└── package.json
```

## 开发指南

### 代码规范
- 使用 TypeScript
- 遵循 ESLint 规则
- 使用 Prettier 格式化

### 测试
```bash
npm test
```

### 代码检查
```bash
npm run lint
npm run format
```

## 部署

### 生产环境
1. 构建项目：`npm run build`
2. 设置环境变量
3. 启动服务：`npm start`

### Docker部署
```bash
docker build -t ai-love-backend .
docker run -p 3001:3001 ai-love-backend
```

## 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License 