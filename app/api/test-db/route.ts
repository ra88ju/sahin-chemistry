/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '../../lib/mongodb';
import { User } from '../../models/User';

export async function GET(_request: NextRequest) {
  try {
    // Try to connect and query the database
    const usersCollection = await getCollection<User>('users');
    const count = await usersCollection.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        userCount: count,
      },
    });
  } catch (error: any) {
    console.error('Database test error:', error);
    
    let errorMessage = 'Database connection failed';
    
    if (error.message?.includes('authentication failed') || 
        error.message?.includes('bad auth') ||
        error.message?.includes('MongoServerError')) {
      errorMessage = 'MongoDB authentication failed. Please check your MongoDB credentials.';
    } else if (error.message?.includes('ENOTFOUND') || error.message?.includes('ECONNREFUSED')) {
      errorMessage = 'Cannot connect to MongoDB server. Please check your connection string.';
    } else {
      errorMessage = error.message || 'Unknown database error';
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}




