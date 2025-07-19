const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('🔍 测试MongoDB连接...');
    
    // 使用成功的连接字符串
    const mongoUri = 'mongodb+srv://ai_love_user:simple123@cluster0.r0ajv0u.mongodb.net/ai_love?retryWrites=true&w=majority';
    
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB连接成功！');
    
    // 测试数据库操作
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 数据库集合:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ 连接已关闭');
    
  } catch (error) {
    console.error('❌ MongoDB连接失败:', error.message);
    process.exit(1);
  }
}

testConnection(); 