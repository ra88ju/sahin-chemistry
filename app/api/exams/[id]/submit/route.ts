import { NextRequest, NextResponse } from 'next/server';
import { exams } from '../../../../data/exams';
import { getCollection } from '../../../../lib/mongodb';
import { ExamResult } from '../../../../models/ExamResult';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const examId = params.id;
    const body = await request.json();
    const { answers, timeSpent } = body;

    const exam = exams.find((e) => e.id === examId);

    if (!exam) {
      return NextResponse.json(
        { success: false, error: 'Exam not found' },
        { status: 404 }
      );
    }

    // Calculate score
    let score = 0;
    let correctAnswers = 0;
    const results: Array<{
      questionId: number;
      correct: boolean;
      selectedAnswer?: number;
      correctAnswer: number;
    }> = [];

    exam.questions.forEach((question) => {
      const selectedAnswer = answers[question.id];
      const isCorrect = selectedAnswer !== undefined && selectedAnswer === question.correctAnswer;
      
      if (isCorrect) {
        score += question.points;
        correctAnswers++;
      }

      results.push({
        questionId: question.id,
        correct: isCorrect,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
      });
    });

    const percentage = (score / exam.totalPoints) * 100;

    // TODO: Get userId from authenticated token
    // For now, save without userId (can be added later)
    const examResultsCollection = await getCollection<ExamResult>('examResults');
    const newExamResult: ExamResult = {
      examId: exam.id,
      answers,
      score,
      totalPoints: exam.totalPoints,
      percentage: Math.round(percentage * 100) / 100,
      correctAnswers,
      totalQuestions: exam.totalQuestions,
      timeSpent: timeSpent || 0,
      submittedAt: new Date(),
      createdAt: new Date(),
    };

    const result = await examResultsCollection.insertOne(newExamResult);

    return NextResponse.json({
      success: true,
      data: {
        resultId: result.insertedId.toString(),
        examId: exam.id,
        score,
        totalPoints: exam.totalPoints,
        percentage: newExamResult.percentage,
        correctAnswers,
        totalQuestions: exam.totalQuestions,
        results,
      },
      message: 'Exam submitted successfully',
    });
  } catch (error) {
    console.error('Exam submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit exam',
      },
      { status: 500 }
    );
  }
}

