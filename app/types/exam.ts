export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  points: number;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  totalPoints: number;
  questions: Question[];
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ExamAttempt {
  examId: string;
  answers: Record<number, number>; // questionId -> selectedOptionIndex
  timeSpent: number; // in seconds
  submittedAt: Date;
}

export interface ExamResult {
  examId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  submittedAt: Date;
}

