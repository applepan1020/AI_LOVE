# AI_Love - AI爱情测试平台

## 🎯 项目简介

AI_Love 是一个基于AI的爱情测试和分析平台，提供个性化的爱情测试、AI分析和数据管理功能。

## 📁 项目结构

```
AI_Love/
├── backend/          # 后端服务 (Node.js + Express + MongoDB)
│   ├── src/          # 源代码
│   ├── package.json  # 后端依赖
│   └── README.md     # 后端文档
├── frontend/         # 前端应用 (Next.js + React)
│   ├── app/          # Next.js App Router
│   ├── package.json  # 前端依赖
│   └── README.md     # 前端文档
└── README.md         # 项目总说明
```

## 🚀 快速开始

### 后端启动
```bash
cd backend
npm install
npm run dev
```
后端服务运行在：http://localhost:3001

### 前端启动
```bash
cd frontend
npm install
npm run dev
```
前端应用运行在：http://localhost:3000

## 🛠️ 技术栈

### 后端
- **运行时：** Node.js
- **框架：** Express.js
- **语言：** TypeScript
- **数据库：** MongoDB (MongoDB Atlas)
- **认证：** JWT
- **密码加密：** bcrypt

### 前端
- **框架：** Next.js 13+ (App Router)
- **语言：** TypeScript
- **UI库：** React
- **样式：** CSS-in-JS
- **部署：** Vercel

## 📊 当前状态

### ✅ 已完成
- [x] 项目基础架构
- [x] MongoDB Atlas连接
- [x] 后端用户注册API
- [x] 前端首页设计
- [x] Git版本控制

### 🚧 开发中
- [ ] 用户登录功能
- [ ] 测试系统开发
- [ ] AI分析功能
- [ ] 前端后端集成

## 🌐 部署

### 前端部署 (Vercel)
- 自动从 `frontend/` 目录部署
- 免费域名和SSL证书

### 后端部署 (Railway/Render)
- 从 `backend/` 目录部署
- 连接MongoDB Atlas

### 数据库 (MongoDB Atlas)
- 云端数据库服务
- 自动备份和扩展

## 📝 开发指南

### 代码规范
- 使用 TypeScript
- 遵循 ESLint 规则
- 使用 Prettier 格式化

### Git提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
```

## 🤝 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

---

> 如有问题，请查看各目录下的 README.md 文档。 