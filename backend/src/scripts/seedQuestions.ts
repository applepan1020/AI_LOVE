import mongoose from 'mongoose';
import { Question } from '../models/Question';
import dotenv from 'dotenv';

dotenv.config();

const questions = [
  // 个性维度题目
  {
    title: '在社交场合中，你更倾向于：',
    type: 'single',
    category: 'personality',
    options: [
      { text: '主动与他人交谈，认识新朋友', value: 5 },
      { text: '与熟悉的朋友聊天', value: 4 },
      { text: '安静地观察周围环境', value: 3 },
      { text: '独自一人，享受独处时光', value: 2 },
      { text: '尽量避免社交活动', value: 1 }
    ],
    weight: 2,
    order: 1
  },
  {
    title: '面对问题时，你通常会：',
    type: 'single',
    category: 'personality',
    options: [
      { text: '立即行动，快速解决', value: 5 },
      { text: '仔细分析后制定计划', value: 4 },
      { text: '寻求他人建议', value: 3 },
      { text: '等待时机成熟', value: 2 },
      { text: '逃避问题，希望自行解决', value: 1 }
    ],
    weight: 2,
    order: 2
  },
  {
    title: '你更喜欢的生活方式是：',
    type: 'single',
    category: 'personality',
    options: [
      { text: '规律有序，计划周详', value: 5 },
      { text: '灵活多变，随遇而安', value: 4 },
      { text: '平衡稳定，适度变化', value: 3 },
      { text: '自由散漫，不受约束', value: 2 },
      { text: '完全随性，无拘无束', value: 1 }
    ],
    weight: 2,
    order: 3
  },

  // 关系处理维度题目
  {
    title: '当与伴侣发生分歧时，你会：',
    type: 'single',
    category: 'relationship',
    options: [
      { text: '立即沟通，寻求共识', value: 5 },
      { text: '冷静思考后理性讨论', value: 4 },
      { text: '寻求第三方建议', value: 3 },
      { text: '暂时回避，等待冷静', value: 2 },
      { text: '坚持己见，不愿妥协', value: 1 }
    ],
    weight: 3,
    order: 4
  },
  {
    title: '你认为理想的爱情关系应该是：',
    type: 'single',
    category: 'relationship',
    options: [
      { text: '相互理解，共同成长', value: 5 },
      { text: '激情浪漫，充满惊喜', value: 4 },
      { text: '稳定可靠，相互支持', value: 3 },
      { text: '独立自主，互不干涉', value: 2 },
      { text: '完全融合，不分彼此', value: 1 }
    ],
    weight: 3,
    order: 5
  },
  {
    title: '对于伴侣的过去，你的态度是：',
    type: 'single',
    category: 'relationship',
    options: [
      { text: '完全接受，这是成长的一部分', value: 5 },
      { text: '理解但不深究', value: 4 },
      { text: '适度了解，不过分关注', value: 3 },
      { text: '有些介意，但能接受', value: 2 },
      { text: '非常在意，难以释怀', value: 1 }
    ],
    weight: 2,
    order: 6
  },

  // 价值观维度题目
  {
    title: '你认为人生最重要的是：',
    type: 'single',
    category: 'values',
    options: [
      { text: '家庭和爱情', value: 5 },
      { text: '事业和成就', value: 4 },
      { text: '个人成长和体验', value: 3 },
      { text: '财富和地位', value: 2 },
      { text: '自由和独立', value: 1 }
    ],
    weight: 3,
    order: 7
  },
  {
    title: '对于金钱的态度，你更倾向于：',
    type: 'single',
    category: 'values',
    options: [
      { text: '合理规划，适度消费', value: 5 },
      { text: '享受当下，及时行乐', value: 4 },
      { text: '节俭储蓄，为未来打算', value: 3 },
      { text: '投资理财，追求增值', value: 2 },
      { text: '完全不在意，随性消费', value: 1 }
    ],
    weight: 2,
    order: 8
  },
  {
    title: '你认为成功的标准是：',
    type: 'single',
    category: 'values',
    options: [
      { text: '内心的满足和快乐', value: 5 },
      { text: '社会的认可和尊重', value: 4 },
      { text: '个人目标的实现', value: 3 },
      { text: '物质财富的积累', value: 2 },
      { text: '权力和影响力', value: 1 }
    ],
    weight: 2,
    order: 9
  },

  // 沟通方式维度题目
  {
    title: '你更喜欢哪种沟通方式：',
    type: 'single',
    category: 'communication',
    options: [
      { text: '面对面深入交流', value: 5 },
      { text: '电话或视频通话', value: 4 },
      { text: '文字消息或邮件', value: 3 },
      { text: '社交媒体互动', value: 2 },
      { text: '肢体语言和表情', value: 1 }
    ],
    weight: 2,
    order: 10
  },
  {
    title: '当表达爱意时，你更倾向于：',
    type: 'single',
    category: 'communication',
    options: [
      { text: '直接表达"我爱你"', value: 5 },
      { text: '通过行动和关怀', value: 4 },
      { text: '送礼物或惊喜', value: 3 },
      { text: '身体接触和拥抱', value: 2 },
      { text: '默默付出，不表达', value: 1 }
    ],
    weight: 2,
    order: 11
  },
  {
    title: '你表达情感的方式是：',
    type: 'single',
    category: 'communication',
    options: [
      { text: '直接坦诚，毫不掩饰', value: 5 },
      { text: '适度表达，有所保留', value: 4 },
      { text: '含蓄委婉，暗示为主', value: 3 },
      { text: '很少表达，内心丰富', value: 2 },
      { text: '完全压抑，不表达情感', value: 1 }
    ],
    weight: 2,
    order: 12
  },

  // 亲密关系维度题目
  {
    title: '你认为理想的亲密关系频率是：',
    type: 'single',
    category: 'intimacy',
    options: [
      { text: '每天都有亲密接触', value: 5 },
      { text: '每周几次', value: 4 },
      { text: '每周一次', value: 3 },
      { text: '每月几次', value: 2 },
      { text: '很少或不需要', value: 1 }
    ],
    weight: 2,
    order: 13
  },
  {
    title: '对于公共场合的亲昵行为，你的态度是：',
    type: 'single',
    category: 'intimacy',
    options: [
      { text: '完全接受，这是爱的表达', value: 5 },
      { text: '适度接受，但不过分', value: 4 },
      { text: '可以接受轻微接触', value: 3 },
      { text: '不太喜欢，保持距离', value: 2 },
      { text: '完全反对，认为不合适', value: 1 }
    ],
    weight: 2,
    order: 14
  },
  {
    title: '你更看重亲密关系中的：',
    type: 'single',
    category: 'intimacy',
    options: [
      { text: '情感连接和精神交流', value: 5 },
      { text: '身体接触和亲密行为', value: 4 },
      { text: '相互理解和信任', value: 3 },
      { text: '独立空间和个人隐私', value: 2 },
      { text: '完全融合，不分彼此', value: 1 }
    ],
    weight: 3,
    order: 15
  },

  // 量表题目
  {
    title: '你对未来的规划程度（1-非常随性，5-非常详细）：',
    type: 'scale',
    category: 'personality',
    scaleRange: {
      min: 1,
      max: 5,
      labels: {
        min: '非常随性',
        max: '非常详细'
      }
    },
    weight: 1,
    order: 16
  },
  {
    title: '你对伴侣的依赖程度（1-完全独立，5-高度依赖）：',
    type: 'scale',
    category: 'relationship',
    scaleRange: {
      min: 1,
      max: 5,
      labels: {
        min: '完全独立',
        max: '高度依赖'
      }
    },
    weight: 2,
    order: 17
  },
  {
    title: '你对传统价值观的认同程度（1-完全反对，5-完全认同）：',
    type: 'scale',
    category: 'values',
    scaleRange: {
      min: 1,
      max: 5,
      labels: {
        min: '完全反对',
        max: '完全认同'
      }
    },
    weight: 2,
    order: 18
  }
];

async function seedQuestions() {
  try {
    // 连接数据库
    await mongoose.connect('mongodb+srv://ai_love_user:simple123@cluster0.r0ajv0u.mongodb.net/ai_love');
    console.log('✅ 数据库连接成功');

    // 清空现有题目
    await Question.deleteMany({});
    console.log('🗑️ 清空现有题目');

    // 插入新题目
    await Question.insertMany(questions);
    console.log(`✅ 成功插入 ${questions.length} 道题目`);

    // 验证插入结果
    const count = await Question.countDocuments();
    console.log(`📊 数据库中现有 ${count} 道题目`);

    console.log('🎉 题目种子数据创建完成！');
    process.exit(0);
  } catch (error) {
    console.error('❌ 种子数据创建失败:', error);
    process.exit(1);
  }
}

seedQuestions(); 