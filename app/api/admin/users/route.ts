import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '../../../lib/mongodb';
import { User } from '../../../models/User';

export async function GET(request: NextRequest) {
  try {
    const usersCollection = await getCollection<User>('users');
    const users = await usersCollection
      .find({})
      .project({ password: 0 }) // Exclude password
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: users.map((user) => ({
        id: user._id?.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        studentId: user.studentId,
        role: user.role || 'student',
        createdAt: user.createdAt,
      })),
      message: 'Users retrieved successfully',
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve users',
      },
      { status: 500 }
    );
  }
}


