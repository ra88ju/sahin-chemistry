import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '../../../lib/mongodb';
import { Admission } from '../../../models/Admission';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const admissionsCollection = await getCollection<Admission>('admissions');
    const admissions = await admissionsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: admissions.map((admission) => ({
        id: admission._id?.toString(),
        name: admission.name,
        email: admission.email,
        phone: admission.phone,
        course: admission.course,
        paymentMethod: admission.paymentMethod,
        transactionId: admission.transactionId,
        status: admission.status,
        createdAt: admission.createdAt,
      })),
      message: 'Admissions retrieved successfully',
    });
  } catch (error) {
    console.error('Get admissions error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve admissions',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { admissionId, status } = body;

    if (!admissionId || !status) {
      return NextResponse.json(
        { success: false, error: 'Admission ID and status are required' },
        { status: 400 }
      );
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status. Must be pending, approved, or rejected' },
        { status: 400 }
      );
    }

    const admissionsCollection = await getCollection<Admission>('admissions');
    const result = await admissionsCollection.updateOne(
      { _id: new ObjectId(admissionId) },
      { $set: { status: status as 'pending' | 'approved' | 'rejected', updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Admission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admission status updated successfully',
    });
  } catch (error) {
    console.error('Update admission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update admission',
      },
      { status: 500 }
    );
  }
}



