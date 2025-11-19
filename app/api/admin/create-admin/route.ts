import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '../../../lib/mongodb';
import { hashPassword, generateStudentId } from '../../../lib/auth';
import { User } from '../../../models/User';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;

    // Validate input
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    try {
      // Check if user already exists
      const usersCollection = await getCollection<User>('users');
      const existingUser = await usersCollection.findOne({
        email: email.toLowerCase(),
      });

      if (existingUser) {
        // Update existing user to admin
        const hashedPassword = await hashPassword(password);
        await usersCollection.updateOne(
          { email: email.toLowerCase() },
          {
            $set: {
              role: 'admin',
              password: hashedPassword,
              updatedAt: new Date(),
            },
          }
        );

        return NextResponse.json({
          success: true,
          message: 'User updated to admin successfully',
        });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create admin user
      const newAdmin: User = {
        name,
        email: email.toLowerCase(),
        phone,
        password: hashedPassword,
        studentId: generateStudentId(),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await usersCollection.insertOne(newAdmin);

      return NextResponse.json({
        success: true,
        message: 'Admin user created successfully',
      });
    } catch (dbError: any) {
      // Handle MongoDB connection errors
      console.error('Database error:', dbError);
      
      if (dbError.message?.includes('authentication failed') || 
          dbError.message?.includes('bad auth') ||
          dbError.message?.includes('MongoServerError') ||
          dbError.message?.toLowerCase().includes('authentication')) {
        return NextResponse.json(
          {
            success: false,
            error: 'MongoDB authentication failed. Please check your MongoDB connection string in .env.local file. Make sure your username and password are correct. If your password contains special characters (@, #, %, etc.), they must be URL-encoded.',
          },
          { status: 500 }
        );
      }
      
      throw dbError; // Re-throw if it's not a connection error
    }
  } catch (error) {
    console.error('Create admin error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create admin';
    
    // Check for specific MongoDB errors
    if (errorMessage.toLowerCase().includes('authentication failed') || 
        errorMessage.toLowerCase().includes('bad auth') ||
        errorMessage.toLowerCase().includes('authentication')) {
      return NextResponse.json(
        {
          success: false,
          error: 'MongoDB authentication failed. Please create a .env.local file with your MongoDB connection string. See .env.local.example for the format.',
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

