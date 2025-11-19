import { ObjectId } from 'mongodb';

export interface Payment {
  _id?: ObjectId | string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  purpose: 'admission' | 'tuition' | 'exam' | 'other';
  paymentMethod: 'bkash' | 'nagad' | 'bank' | 'cash';
  transactionId?: string;
  status: 'pending' | 'verified' | 'failed';
  verifiedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

