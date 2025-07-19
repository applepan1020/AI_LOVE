import mongoose, { Schema, Document } from 'mongoose';

export interface ITest extends Document {
  userId?: mongoose.Types.ObjectId; // 匿名测试可能没有用户ID
  testType: 'single' | 'couple';
  status: 'in_progress' | 'completed' | 'abandoned';
  answers: Array<{
    questionId: mongoose.Types.ObjectId;
    answer: any; // 根据题目类型存储不同格式的答案
    score?: number; // 该题得分
  }>;
  totalScore: number;
  maxScore: number;
  compatibilityScore?: number; // 契合度分数 (0-100)
  categoryScores: {
    personality: number;
    relationship: number;
    values: number;
    communication: number;
    intimacy: number;
  };
  startTime: Date;
  endTime?: Date;
  duration?: number; // 测试时长（分钟）
  report?: {
    summary: string;
    details: string;
    recommendations: string[];
  };
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestSchema = new Schema<ITest>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false // 匿名测试不需要用户ID
  },
  testType: {
    type: String,
    enum: ['single', 'couple'],
    required: true
  },
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'abandoned'],
    default: 'in_progress'
  },
  answers: [{
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    answer: Schema.Types.Mixed, // 支持多种答案格式
    score: Number
  }],
  totalScore: {
    type: Number,
    default: 0
  },
  maxScore: {
    type: Number,
    default: 0
  },
  compatibilityScore: {
    type: Number,
    min: 0,
    max: 100
  },
  categoryScores: {
    personality: {
      type: Number,
      default: 0
    },
    relationship: {
      type: Number,
      default: 0
    },
    values: {
      type: Number,
      default: 0
    },
    communication: {
      type: Number,
      default: 0
    },
    intimacy: {
      type: Number,
      default: 0
    }
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  duration: Number,
  report: {
    summary: String,
    details: String,
    recommendations: [String]
  },
  isAnonymous: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// 创建索引
TestSchema.index({ userId: 1, status: 1, createdAt: -1 });
TestSchema.index({ testType: 1, status: 1 });

export const Test = mongoose.model<ITest>('Test', TestSchema); 