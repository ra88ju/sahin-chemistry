import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '../../../lib/mongodb';
import { User } from '../../../models/User';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    // TODO: Get user from token
    // const token = request.headers.get('authorization')?.replace('Bearer ', '');
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const userId = decoded.userId;

    // For now, get userId from query params (in production, use authenticated token)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Fetch user from database
    const usersCollection = await getCollection<User>('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) } as any);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id?.toString(),
          email: user.email,
          name: user.name,
          phone: user.phone,
          studentId: user.studentId,
        },
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get user',
      },
      { status: 500 }
    );
  }
}
