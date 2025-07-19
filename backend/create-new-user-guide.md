# MongoDB Atlas 新用户创建指南

## 步骤1：进入Database Access
1. 打开 https://cloud.mongodb.com
2. 登录你的账户
3. 点击你的集群 "Cluster0"
4. 在左侧菜单点击 **"Database Access"**

## 步骤2：删除旧用户
1. 找到用户 "applepan1020@admin"
2. 点击用户旁边的 **"Delete"** 按钮（垃圾桶图标）
3. 确认删除

## 步骤3：创建新用户
1. 点击 **"+ Add New Database User"**
2. 设置：
   - **Authentication Method:** Password
   - **Username:** `ai_love_user`
   - **Password:** `simple123`
   - **Database User Privileges:** Built-in Role → **"Atlas admin"**
3. 点击 **"Add User"**

## 步骤4：更新连接字符串
新连接字符串将是：
```
mongodb+srv://ai_love_user:simple123@cluster0.r0ajv0u.mongodb.net/ai_love?retryWrites=true&w=majority
```

## 步骤5：测试连接
运行测试脚本验证连接是否成功。 