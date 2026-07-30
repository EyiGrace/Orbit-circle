// services/quiz/quizAttemptService.ts
import QuizAttempt from '../models/quiz-attempts.model';
import QuizQuestion from '../models/quiz-question.model';
import QuizScoringService, { SubmitAnswerInput } from './quiz-scoring.service';
import QuizSelectionService from './quiz-selection.service';
import QuizConfidenceService from './quiz-confidence.service';
import QuizResultsService from './quiz-result.service';

class QuizAttemptService {
  static async startAttempt(userId: string) {
    // resume an in-progress attempt if one exists, rather than starting a duplicate
    const existing = await QuizAttempt.findInProgressForUser(userId);
    if (existing) return existing;

    return QuizAttempt.create(userId);
  }

  // returns the fixed Pool A discovery questions, in order -- same for every user
  static async getDiscoveryQuestions() {
    return QuizQuestion.findPoolA();
  }

  static async submitAnswer(input: SubmitAnswerInput) {
    const { updatedScores } = await QuizScoringService.submitAnswer(input);
    return this.afterScoringUpdate(input.attemptId);
  }

  static async skipQuestion(attemptId: string, questionId: number) {
    await QuizScoringService.submitSkip(attemptId, questionId);
    return this.afterScoringUpdate(attemptId);
  }

  // shared "what happens after any trait_scores_raw update" logic --
  // used by both a real answer and a skip
  private static async afterScoringUpdate(attemptId: string) {
    const shouldStop = await QuizConfidenceService.shouldStopQuiz(attemptId);
    if (shouldStop) {
      const results = await QuizResultsService.finalizeResults(attemptId);
      return { done: true, results };
    }

    const nextQuestion = await QuizSelectionService.pickNextQuestion(attemptId);
    if (!nextQuestion) {
      const results = await QuizResultsService.finalizeResults(attemptId);
      return { done: true, results };
    }

    return { done: false, nextQuestion };
  }
}

export default QuizAttemptService;