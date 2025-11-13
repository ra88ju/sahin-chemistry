export interface Admission {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  paymentMethod: 'bkash' | 'nagad' | 'bank' | 'cash';
  transactionId?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
}

