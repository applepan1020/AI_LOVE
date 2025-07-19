import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env['JWT_SECRET'] || 'your-secret-key';

// 用户注册
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username } = req.body;

    // 验证输入
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: '邮箱和密码不能为空',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // 检查邮箱是否已存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: '邮箱已被注册',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // 创建用户
    const user = new User({
      email,
      password,
      username
    });

    await user.save();

    // 生成JWT令牌
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: '注册成功',
      data: {
        user: {
          id: user._id,
          email: user.email,
          username: user.username
        },
        token
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      timestamp: new Date().toISOString()
    });
  }
};

// 用户登录
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 验证输入
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: '邮箱和密码不能为空',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: '邮箱或密码错误',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // 验证密码
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      res.status(401).json({
        success: false,
        message: '邮箱或密码错误',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // 更新最后登录时间
    user.lastLoginAt = new Date();
    await user.save();

    // 生成JWT令牌
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: '登录成功',
      data: {
        user: {
          id: user._id,
          email: user.email,
          username: user.username
        },
        token
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      timestamp: new Date().toISOString()
    });
  }
};

// 获取用户信息
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    
    if (!userId) {
      res.status(401).json({
        success: false,
        message: '未授权访问',
        timestamp: new Date().toISOString()
      });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: '用户不存在',
        timestamp: new Date().toISOString()
      });
      return;
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        isActive: user.isActive,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      timestamp: new Date().toISOString()
    });
  }
}; 