// controllers/quizController.ts
import QuizAttemptService from '../services/quiz-attempts.service';
import QuizAttempt from '../models/quiz-attempts.model';
import QuizResultsService from '../services/quiz-result.service';
//import { HTTP_STATUS } from '../utils/const';

import type { Request, Response } from 'express';

// assumes an auth middleware has already set req.user = { id: string }
function getUserId(req: Request): string {
  return (req as any).user.id;
}

// confirms the attempt in the URL actually belongs to the logged-in user
async function assertOwnsAttempt(attemptId: string, userId: string) {
  const attempt = await QuizAttempt.findById(attemptId);
  if (!attempt) {
    const err: any = new Error('Quiz attempt not found');
    err.status = 404;
    throw err;
  }
  if (attempt.user_id !== userId) {
    const err: any = new Error('This quiz attempt does not belong to you');
    err.status = 403;

    throw err;
  }
  return attempt;
}

export const startQuiz = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const attempt = await QuizAttemptService.startAttempt(userId);
  const discoveryQuestions = await QuizAttemptService.getDiscoveryQuestions();

  res.status(200).json({
    attempt: {
      id: attempt.id,
      startedAt: attempt.started_at,
      askedQuestionIds: attempt.asked_question_ids
    },
    // only relevant if this is a brand-new attempt with nothing answered yet
    discoveryQuestions: attempt.asked_question_ids.length === 0 ? discoveryQuestions : []
  });
};

export const getAttemptStatus = async (req: Request, res: Response) => {
  try {
    const attempt = await assertOwnsAttempt(req.params.attemptId, getUserId(req));
    res.status(200).json({
      id: attempt.id,
      completed: !!attempt.completed_at,
      questionsAnswered: attempt.asked_question_ids.length,
      confidence: attempt.confidence
    });
  } catch (err: any) {
    res.status(err.status ?? 400).json({ message: err.message });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const attemptId = req.params.attemptId;
    await assertOwnsAttempt(attemptId, getUserId(req));

    const { questionId, selectedOptionIds, rankingOrder, scaleValue, reflectionText } = req.body;
    if (!questionId) {
      return res.status(400).json({ message: 'questionId is required' });
    }

    const result = await QuizAttemptService.submitAnswer({
      attemptId,
      questionId,
      selectedOptionIds,
      rankingOrder,
      scaleValue,
      reflectionText
    });

    if (result.done) {
      return res.status(200).json({ done: true, results: result.results });
    }

    res.status(200).json({ done: false, nextQuestion: result.nextQuestion });
  } catch (err: any) {
    res.status(err.status ?? 400).json({ message: err.message });
  }
};

export const skipQuestion = async (req: Request, res: Response) => {
  try {
    const attemptId = req.params.attemptId;
    await assertOwnsAttempt(attemptId, getUserId(req));

    const { questionId } = req.body;
    if (!questionId) {
      return res.status(400).json({ message: 'questionId is required' });
    }

    const result = await QuizAttemptService.skipQuestion(attemptId, questionId);

    if (result.done) {
      return res.status(200).json({ done: true, results: result.results });
    }

    res.status(200).json({ done: false, nextQuestion: result.nextQuestion });
  } catch (err: any) {
    res.status(err.status ?? 400).json({ message: err.message });
  }
};

export const getResults = async (req: Request, res: Response) => {
  try {
    const attemptId = req.params.attemptId;
    await assertOwnsAttempt(attemptId, getUserId(req));
    const results = await QuizResultsService.getStoredResults(attemptId);
    res.status(200).json({ results });
  } catch (err: any) {
    res.status(err.status ?? 400).json({ message: err.message });
  }
};