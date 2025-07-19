import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    // 使用成功的MongoDB Atlas连接字符串
    const mongoUri = 'mongodb+srv://ai_love_user:simple123@cluster0.r0ajv0u.mongodb.net/ai_love?retryWrites=true&w=majority';
    
    await mongoose.connect(mongoUri);
    
    console.log('✅ MongoDB Atlas 连接成功');
    
    // 监听连接事件
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB 连接错误:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB 连接断开');
    });
    
  } catch (error) {
    console.error('❌ MongoDB 连接失败:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('✅ MongoDB 连接已关闭');
    }
  } catch (error) {
    console.error('❌ 关闭 MongoDB 连接失败:', error);
  }
}; 