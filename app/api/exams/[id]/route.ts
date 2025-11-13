import { NextRequest, NextResponse } from 'next/server';
import { exams } from '../../../data/exams';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const examId = id;
    const exam = exams.find((e) => e.id === examId);

    if (!exam) {
      return NextResponse.json(
        { success: false, error: 'Exam not found' },
        { status: 404 }
      );
    }

    // TODO: Check if user has access to this exam
    // TODO: Check if user has already taken this exam
    // TODO: Return questions (in production, you might want to randomize or limit)

    return NextResponse.json({
      success: true,
      data: exam,
      message: 'Exam retrieved successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve exam',
      },
      { status: 500 }
    );
  }
}

