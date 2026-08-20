// utils/quizConfidence.util.ts
export function calculateRequiredPoolAQuestions(confidenceScore: number): number {
  if (confidenceScore >= 70) return 0;
  if (confidenceScore >= 50) return 2;
  if (confidenceScore >= 30) return 4;
  return 7;
}