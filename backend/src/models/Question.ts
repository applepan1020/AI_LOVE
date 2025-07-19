import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  title: string;
  description?: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  category: 'personality' | 'relationship' | 'values' | 'communication' | 'intimacy';
  options?: Array<{
    text: string;
    value: number;
    description?: string;
  }>;
  scaleRange?: {
    min: number;
    max: number;
    labels: {
      min: string;
      max: string;
    };
  };
  weight: number; // 题目权重
  isActive: boolean;
  order: number; // 题目顺序
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['single', 'multiple', 'scale', 'text'],
    required: true
  },
  category: {
    type: String,
    enum: ['personality', 'relationship', 'values', 'communication', 'intimacy'],
    required: true
  },
  options: [{
    text: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    description: String
  }],
  scaleRange: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 5
    },
    labels: {
      min: String,
      max: String
    }
  },
  weight: {
    type: Number,
    default: 1,
    min: 0,
    max: 10
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// 创建索引
QuestionSchema.index({ category: 1, isActive: 1, order: 1 });

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema); 