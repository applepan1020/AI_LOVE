import { Router } from 'express';
import { 
  startTest, 
  getQuestions, 
  submitAnswer, 
  completeTest, 
  getTestResult 
} from '../controllers/testController';

const router = Router();

// 开始测试
router.post('/start', startTest);

// 获取测试题目
router.get('/:testId/questions', getQuestions);

// 提交答案
router.post('/:testId/answer', submitAnswer);

// 完成测试
router.post('/:testId/complete', completeTest);

// 获取测试结果
router.get('/:testId/result', getTestResult);

export default router; 