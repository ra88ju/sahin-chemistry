import { NextRequest, NextResponse } from 'next/server';
import { exams } from '../../data/exams';

export async function GET(request: NextRequest) {
  try {
    // Return all available exams
    // In production, you might filter based on user permissions, enrollment, etc.
    return NextResponse.json({
      success: true,
      data: exams.map((exam) => ({
        id: exam.id,
        title: exam.title,
        description: exam.description,
        duration: exam.duration,
        totalQuestions: exam.totalQuestions,
        totalPoints: exam.totalPoints,
        subject: exam.subject,
        difficulty: exam.difficulty,
        // Don't send questions in list view
      })),
      message: 'Exams retrieved successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve exams',
      },
      { status: 500 }
    );
  }
}

