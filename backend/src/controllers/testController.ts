import { Request, Response } from 'express';
import { Question } from '../models/Question';
import { Test } from '../models/Test';

// 开始测试
export const startTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { testType } = req.body;
    const userId = (req as any).user?.userId;

    // 验证测试类型
    if (!testType || !['single', 'couple'].includes(testType)) {
      res.status(400).json({
        success: false,
        message: '测试类型无效',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // 获取测试题目
    const questions = await Question.find({ isActive: true })
      .sort({ order: 1 })
      .select('-__v');

    if (questions.length === 0) {
      res.status(404).json({
        success: false,
        message: '暂无可用题目',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // 计算最大分数
    const maxScore = questions.reduce((total, question) => {
      if (question.type === 'single' || question.type === 'multiple') {
        const maxOptionValue = Math.max(...(question.options?.map(opt => opt.value) || [0]));
        return total + (maxOptionValue * question.weight);
      } else if (question.type === 'scale') {
        return total + ((question.scaleRange?.max || 5) * question.weight);
      }
      return total;
    }, 0);

    // 创建测试记录
    const test = new Test({
      userId: userId || undefined,
      testType,
      isAnonymous: !userId,
      maxScore,
      answers: []
    });

    await test.save();

    res.json({
      success: true,
      message: '测试开始成功',
      data: {
        testId: test._id,
        testType,
        questions,
        totalQuestions: questions.length,
        maxScore
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('开始测试错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      timestamp: new Date().toISOString()
    });
  }
};

// 获取测试题目
export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId);
    if (!test) {
      res.status(404).json({
        success: false,
        message: '测试不存在',
        timestamp: new Date().toISOString()
      });
      return;
    }

    const questions = await Question.find({ isActive: true })
      .sort({ order: 1 })
      .select('-__v');

    res.json({
      success: true,
      data: {
        testId: test._id,
        testType: test.testType,
        questions,
        totalQuestions: questions.length,
        currentAnswers: test.answers
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('获取题目错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      timestamp: new Date().toISOString()
    });
  }
};

// 提交答案
export const submitAnswer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { testId } = req.params;
    const { questionId, answer } = req.body;

    if (!questionId || answer === undefined) {
      res.status(400).json({
        success: false,
        message: '题目ID和答案不能为空',
        timestamp: new Date().toISOString()
      });
      return;
    }

    const test = await Test.findById(testId);
    if (!test) {
      res.status(404).json({
        success: false,
        message: '测试不存在',
        timestamp: new Date().toISOString()
      });
      return;
    }

    if (test.status === 'completed') {
      res.status(400).json({
        success: false,
        message: '测试已完成',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // 获取题目信息
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json({
        success: false,
        message: '题目不存在',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // 计算该题得分
    let score = 0;
    if (question.type === 'single' || question.type === 'multiple') {
      const selectedOption = question.options?.find(opt => opt.value === answer);
      score = selectedOption ? selectedOption.value * question.weight : 0;
    } else if (question.type === 'scale') {
      score = (answer || 0) * question.weight;
    }

    // 更新或添加答案
    const existingAnswerIndex = test.answers.findIndex(
      ans => ans.questionId.toString() === questionId
    );

    if (existingAnswerIndex >= 0) {
      test.answers[existingAnswerIndex].answer = answer;
      test.answers[existingAnswerIndex].score = score;
    } else {
      test.answers.push({
        questionId: question._id,
        answer,
        score
      });
    }

    // 重新计算总分
    test.totalScore = test.answers.reduce((total, ans) => total + (ans.score || 0), 0);

    await test.save();

    res.json({
      success: true,
      message: '答案提交成功',
      data: {
        testId: test._id,
        questionId,
        score,
        totalScore: test.totalScore,
        maxScore: test.maxScore,
        progress: test.answers.length
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('提交答案错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      timestamp: new Date().toISOString()
    });
  }
};

// 完成测试
export const completeTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId);
    if (!test) {
      res.status(404).json({
        success: false,
        message: '测试不存在',
        timestamp: new Date().toISOString()
      });
      return;
    }

    if (test.status === 'completed') {
      res.status(400).json({
        success: false,
        message: '测试已完成',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // 计算契合度分数 (0-100)
    const compatibilityScore = Math.round((test.totalScore / test.maxScore) * 100);

    // 计算各维度分数
    const categoryScores = {
      personality: 0,
      relationship: 0,
      values: 0,
      communication: 0,
      intimacy: 0
    };

    // 这里需要根据题目分类计算各维度分数
    // 简化实现，后续可以优化
    for (const answer of test.answers) {
      const question = await Question.findById(answer.questionId);
      if (question && answer.score) {
        const category = question.category as keyof typeof categoryScores;
        categoryScores[category] += answer.score;
      }
    }

    // 生成简单报告
    const report = generateReport(compatibilityScore, categoryScores);

    // 更新测试状态
    test.status = 'completed';
    test.compatibilityScore = compatibilityScore;
    test.categoryScores = categoryScores;
    test.report = report;
    test.endTime = new Date();
    test.duration = Math.round((test.endTime.getTime() - test.startTime.getTime()) / (1000 * 60));

    await test.save();

    res.json({
      success: true,
      message: '测试完成',
      data: {
        testId: test._id,
        compatibilityScore,
        categoryScores,
        report,
        duration: test.duration
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('完成测试错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      timestamp: new Date().toISOString()
    });
  }
};

// 获取测试结果
export const getTestResult = async (req: Request, res: Response): Promise<void> => {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId).populate('answers.questionId');
    if (!test) {
      res.status(404).json({
        success: false,
        message: '测试不存在',
        timestamp: new Date().toISOString()
      });
      return;
    }

    res.json({
      success: true,
      data: {
        testId: test._id,
        testType: test.testType,
        status: test.status,
        compatibilityScore: test.compatibilityScore,
        categoryScores: test.categoryScores,
        report: test.report,
        duration: test.duration,
        startTime: test.startTime,
        endTime: test.endTime,
        answers: test.answers
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('获取测试结果错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      timestamp: new Date().toISOString()
    });
  }
};

// 生成测试报告
function generateReport(compatibilityScore: number, categoryScores: any) {
  let summary = '';
  let details = '';
  const recommendations: string[] = [];

  // 根据契合度分数生成总结
  if (compatibilityScore >= 80) {
    summary = '你们的契合度非常高！你们在多个维度上都表现出色，是天生的一对。';
    recommendations.push('继续保持良好的沟通和互动');
    recommendations.push('定期进行情感交流，加深了解');
  } else if (compatibilityScore >= 60) {
    summary = '你们的契合度良好，有很好的发展潜力。';
    recommendations.push('加强沟通，增进相互理解');
    recommendations.push('关注共同兴趣的培养');
  } else if (compatibilityScore >= 40) {
    summary = '你们的契合度中等，需要更多的努力和沟通。';
    recommendations.push('学习有效的沟通技巧');
    recommendations.push('寻找共同话题和兴趣');
    recommendations.push('考虑寻求专业的情感咨询');
  } else {
    summary = '你们的契合度较低，建议深入沟通和了解。';
    recommendations.push('认真思考关系的发展方向');
    recommendations.push('寻求专业的情感咨询帮助');
    recommendations.push('给彼此更多的时间和空间');
  }

  details = `你们的总体契合度为${compatibilityScore}分。在个性匹配、关系处理、价值观、沟通方式和亲密关系等方面都有不同的表现。建议你们重点关注契合度较低的维度，通过沟通和理解来改善关系。`;

  return {
    summary,
    details,
    recommendations
  };
} 