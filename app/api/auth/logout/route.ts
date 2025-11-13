import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // TODO: Invalidate token on server side if using token blacklist
    // const token = request.headers.get('authorization')?.replace('Bearer ', '');
    // await tokenBlacklist.add(token);

    return NextResponse.json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Logout failed',
      },
      { status: 500 }
    );
  }
}

