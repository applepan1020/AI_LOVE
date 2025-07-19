# AI_Love - AI爱情测试平台

## 🎯 项目简介

AI_Love 是一个基于AI的爱情测试和分析平台，提供个性化的爱情测试、AI分析和数据管理功能。

## 🏷️ 版本信息

### v0.2.0 - 首次前后端完整功能发布 (2024-01-15)
**🎉 重要里程碑：完整的商业化功能发布**

#### ✨ 核心功能
- 🔐 **用户认证系统** - 完整的注册/登录功能
- 🧪 **智能测试系统** - 18道心理学题目，5个分析维度
- 📊 **结果分析** - AI生成的契合度分析和个性化建议
- 📚 **历史记录** - 完整的测试历史管理
- 👤 **个人资料** - 用户信息管理和账户设置
- 🎨 **响应式UI** - 美观的现代化界面设计

#### 🛠️ 技术成就
- **前端**: Next.js 13+ App Router, TypeScript, Tailwind CSS
- **后端**: Node.js + Express + MongoDB Atlas
- **认证**: JWT Token 安全认证
- **部署**: Vercel 前端 + Railway 后端
- **数据库**: MongoDB Atlas 云端数据库

#### 📈 项目规模
- **代码行数**: 2000+ 行高质量代码
- **前端页面**: 8个完整功能页面
- **后端API**: 完整的RESTful API体系
- **数据库模型**: 3个核心数据模型
- **测试覆盖**: 18道精心设计的心理学题目

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

## 📊 当前状态 (v0.2.0)

### ✅ 已完成功能
- [x] 项目基础架构
- [x] MongoDB Atlas连接
- [x] 后端用户注册API
- [x] 后端用户登录API
- [x] 前端首页设计
- [x] 前端用户认证系统
- [x] 用户仪表板
- [x] Git版本控制
- [x] Vercel部署
- [x] 后端测试系统（18道题目）
- [x] 前端测试界面（单人测试页面和问卷页面）
- [x] 测试结果页面（契合度分析和个性化建议）
- [x] 历史记录功能（测试历史查看）
- [x] 个人资料管理（信息编辑和账户设置）

### 🚧 开发中功能
- [ ] 情侣测试模式
- [ ] AI分析报告优化
- [ ] 数据可视化图表

### 📋 未来规划 (v0.3.0+)
- [ ] 移动端APP开发
- [ ] 社交分享功能
- [ ] 高级会员系统
- [ ] 多语言支持
- [ ] 数据导出功能

## 🌐 部署信息

### 生产环境
- **前端**: https://ai-love-sand.vercel.app
- **后端**: Railway/Render 云服务
- **数据库**: MongoDB Atlas 云端数据库

### 部署架构
- **前端部署 (Vercel)**
  - 自动从 `frontend/` 目录部署
  - 免费域名和SSL证书
  - 全球CDN加速

- **后端部署 (Railway/Render)**
  - 从 `backend/` 目录部署
  - 连接MongoDB Atlas
  - 自动扩缩容

- **数据库 (MongoDB Atlas)**
  - 云端数据库服务
  - 自动备份和扩展
  - 99.9% 可用性保证

### 环境变量配置
```env
# 后端环境变量
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
PORT=3001

# 前端环境变量
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📝 开发指南

### 代码规范
- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 规则确保代码质量
- 使用 Prettier 进行代码格式化
- 组件化开发，提高代码复用性

### Git提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

### 版本发布规范
- **主版本号**: 重大功能更新或架构变更
- **次版本号**: 新功能发布
- **修订版本号**: Bug修复和小幅改进

### 分支管理
- `master`: 主分支，用于生产环境
- `develop`: 开发分支，用于功能开发
- `feature/*`: 功能分支，用于新功能开发
- `hotfix/*`: 热修复分支，用于紧急修复

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📊 项目统计

### v0.2.0 版本统计
- **开发时间**: 2周
- **代码行数**: 2000+ 行
- **文件数量**: 50+ 个
- **API接口**: 15+ 个
- **前端页面**: 8个
- **数据库模型**: 3个

### 技术栈使用率
- **前端**: Next.js 13+ (100%)
- **后端**: Node.js + Express (100%)
- **数据库**: MongoDB (100%)
- **认证**: JWT (100%)
- **部署**: Vercel + Railway (100%)

## 📄 许可证

MIT License

## 🎯 项目愿景

AI_Love 致力于成为最智能、最专业的爱情测试平台，通过先进的AI技术和心理学理论，为用户提供科学、准确、个性化的情感分析和建议。

---

> 如有问题，请查看各目录下的 README.md 文档。
> 
> **当前版本**: v0.2.0 - 首次前后端完整功能发布
> **发布日期**: 2024-01-15 