export interface ExamResult {
  _id?: string;
  userId: string;
  examId: string;
  answers: Record<number, number>; // questionId -> selectedOptionIndex
  score: number;
  totalPoints: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  submittedAt: Date;
  createdAt?: Date;
}

