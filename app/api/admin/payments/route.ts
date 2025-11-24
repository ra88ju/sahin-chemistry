import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '../../../lib/mongodb';
import { Payment } from '../../../models/Payment';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const paymentsCollection = await getCollection<Payment>('payments');
    const payments = await paymentsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: payments.map((payment) => ({
        id: payment._id?.toString(),
        name: payment.name,
        email: payment.email,
        phone: payment.phone,
        amount: payment.amount,
        purpose: payment.purpose,
        paymentMethod: payment.paymentMethod,
        transactionId: payment.transactionId,
        status: payment.status,
        createdAt: payment.createdAt,
      })),
      message: 'Payments retrieved successfully',
    });
  } catch (error) {
    console.error('Get payments error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve payments',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, status } = body;

    if (!paymentId || !status) {
      return NextResponse.json(
        { success: false, error: 'Payment ID and status are required' },
        { status: 400 }
      );
    }

    if (!['pending', 'verified', 'failed'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status. Must be pending, verified, or failed' },
        { status: 400 }
      );
    }

    const paymentsCollection = await getCollection<Payment>('payments');
    const updateData: Partial<Payment> = {
      status: status as 'pending' | 'verified' | 'failed',
      updatedAt: new Date(),
    };

    if (status === 'verified') {
      updateData.verifiedAt = new Date();
    }

    const result = await paymentsCollection.updateOne(
      { _id: new ObjectId(paymentId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment status updated successfully',
    });
  } catch (error) {
    console.error('Update payment error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update payment',
      },
      { status: 500 }
    );
  }
}






