import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '../../lib/mongodb';
import { Payment } from '../../models/Payment';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, amount, purpose, paymentMethod, transactionId } = body;

    // Validate input
    if (!name || !email || !phone || !amount || !purpose || !paymentMethod) {
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

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Payment amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Save to database
    const paymentsCollection = await getCollection<Payment>('payments');
    const newPayment: Payment = {
      name,
      email: email.toLowerCase(),
      phone,
      amount,
      purpose,
      paymentMethod,
      transactionId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await paymentsCollection.insertOne(newPayment);

    // TODO: Verify transaction ID with payment gateway (bKash/Nagad API)
    // if (paymentMethod === 'bkash') {
    //   const verified = await verifyBkashTransaction(transactionId);
    //   if (!verified) {
    //     return NextResponse.json(
    //       { success: false, error: 'Invalid transaction ID' },
    //       { status: 400 }
    //     );
    //   }
    // }

    // TODO: Send confirmation email
    // await sendEmail({
    //   to: email,
    //   subject: 'Payment Received',
    //   template: 'payment-confirmation',
    //   data: { name, amount, purpose },
    // });

    return NextResponse.json({
      success: true,
      data: {
        paymentId: result.insertedId.toString(),
        amount,
        paymentMethod,
        status: 'pending',
      },
      message: 'Payment information received. We will verify and confirm your payment soon.',
    });
  } catch (error) {
    console.error('Payment submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process payment',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Get user from token
    // const token = request.headers.get('authorization')?.replace('Bearer ', '');
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const userId = decoded.userId;

    // Get email from query params for now (in production, use authenticated user)
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const paymentsCollection = await getCollection<Payment>('payments');
    const query = email ? { email: email.toLowerCase() } : {};
    const payments = await paymentsCollection.find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({
      success: true,
      data: payments.map((payment) => ({
        id: payment._id?.toString(),
        amount: payment.amount,
        purpose: payment.purpose,
        paymentMethod: payment.paymentMethod,
        status: payment.status,
        createdAt: payment.createdAt,
      })),
      message: 'Payment history retrieved',
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

