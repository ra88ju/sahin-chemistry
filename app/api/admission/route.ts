import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '../../lib/mongodb';
import { Admission } from '../../models/Admission';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, course, paymentMethod, transactionId } = body;

    // Validate input
    if (!name || !email || !phone || !course || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    if (paymentMethod !== 'cash' && !transactionId) {
      return NextResponse.json(
        { success: false, error: 'Transaction ID is required for digital payments' },
        { status: 400 }
      );
    }

    // Save to database
    const admissionsCollection = await getCollection<Admission>('admissions');
    const newAdmission: Admission = {
      name,
      email: email.toLowerCase(),
      phone,
      course,
      paymentMethod,
      transactionId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await admissionsCollection.insertOne(newAdmission);

    // TODO: Send confirmation email
    // await sendEmail({
    //   to: email,
    //   subject: 'Admission Application Received',
    //   template: 'admission-confirmation',
    //   data: { name, course },
    // });

    return NextResponse.json({
      success: true,
      data: {
        applicationId: result.insertedId.toString(),
        message: 'Application submitted successfully',
      },
      message: 'Your admission application has been received. We will contact you soon.',
    });
  } catch (error) {
    console.error('Admission submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit application',
      },
      { status: 500 }
    );
  }
}

