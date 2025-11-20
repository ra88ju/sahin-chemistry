'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';

interface Payment {
  id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  purpose: string;
  paymentMethod: string;
  transactionId?: string;
  status: 'pending' | 'verified' | 'failed';
  createdAt: string;
}

export default function AdminPaymentsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchPayments();
    }
  }, [isAdmin]);

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/admin/payments');
      const data = await response.json();
      if (data.success) {
        setPayments(data.data);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (paymentId: string, status: 'verified' | 'failed') => {
    try {
      const response = await fetch('/api/admin/payments', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId, status }),
      });

      const data = await response.json();
      if (data.success) {
        fetchPayments(); // Refresh the list
      } else {
        alert(data.error || 'Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('An error occurred while updating payment status');
    }
  };

  if (isLoading || loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-24 pb-20 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Payment Management</h1>
                <Link
                  href="/admin"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Back to Dashboard
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="px-6 py-4 text-center text-gray-500">
                          No payments found
                        </td>
                      </tr>
                    ) : (
                      payments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">৳{payment.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.purpose}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentMethod}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.transactionId || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              payment.status === 'verified' ? 'bg-green-100 text-green-800' :
                              payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {payment.status === 'pending' && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => updatePaymentStatus(payment.id, 'verified')}
                                  className="text-green-600 hover:text-green-900 font-medium"
                                >
                                  Verify
                                </button>
                                <button
                                  onClick={() => updatePaymentStatus(payment.id, 'failed')}
                                  className="text-red-600 hover:text-red-900 font-medium"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}



