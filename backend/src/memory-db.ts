// 内存数据库 - 用于快速测试，无需安装MongoDB
import bcrypt from 'bcryptjs';

export interface IUser {
  id: string;
  email: string;
  password: string;
  username?: string;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITest {
  id: string;
  userId?: string;
  type: 'single' | 'couple';
  answers: any[];
  score: number;
  report: any;
  createdAt: Date;
}

// 内存存储
const users: Map<string, IUser> = new Map();
const tests: Map<string, ITest> = new Map();

// 用户管理
export const userDB = {
  // 创建用户
  create: async (userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser> => {
    const id = Date.now().toString();
    const now = new Date();
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const user: IUser = {
      ...userData,
      password: hashedPassword,
      id,
      createdAt: now,
      updatedAt: now
    };
    users.set(id, user);
    return user;
  },

  // 根据邮箱查找用户
  findByEmail: (email: string): IUser | undefined => {
    return Array.from(users.values()).find(user => user.email === email);
  },

  // 根据ID查找用户
  findById: (id: string): IUser | undefined => {
    return users.get(id);
  },

  // 更新用户
  update: (id: string, updates: Partial<IUser>): IUser | null => {
    const user = users.get(id);
    if (!user) return null;
    
    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date()
    };
    users.set(id, updatedUser);
    return updatedUser;
  },

  // 获取所有用户
  getAll: (): IUser[] => {
    return Array.from(users.values());
  }
};

// 测试管理
export const testDB = {
  // 创建测试
  create: (testData: Omit<ITest, 'id' | 'createdAt'>): ITest => {
    const id = Date.now().toString();
    const test: ITest = {
      ...testData,
      id,
      createdAt: new Date()
    };
    tests.set(id, test);
    return test;
  },

  // 根据ID查找测试
  findById: (id: string): ITest | undefined => {
    return tests.get(id);
  },

  // 根据用户ID查找测试历史
  findByUserId: (userId: string): ITest[] => {
    return Array.from(tests.values()).filter(test => test.userId === userId);
  },

  // 获取所有测试
  getAll: (): ITest[] => {
    return Array.from(tests.values());
  }
};

// 初始化一些测试数据
export const initTestData = async () => {
  // 添加一个测试用户
  await userDB.create({
    email: 'test@example.com',
    password: '123456',
    username: '测试用户',
    isActive: true
  });

  console.log('✅ 内存数据库初始化完成');
  console.log(`📊 测试用户: test@example.com / 123456`);
}; 