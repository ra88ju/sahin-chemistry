'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';

interface Admission {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  paymentMethod: string;
  transactionId?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function AdminAdmissionsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchAdmissions();
    }
  }, [isAdmin]);

  const fetchAdmissions = async () => {
    try {
      const response = await fetch('/api/admin/admissions');
      const data = await response.json();
      if (data.success) {
        setAdmissions(data.data);
      }
    } catch (error) {
      console.error('Error fetching admissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAdmissionStatus = async (admissionId: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch('/api/admin/admissions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admissionId, status }),
      });

      const data = await response.json();
      if (data.success) {
        fetchAdmissions(); // Refresh the list
      } else {
        alert(data.error || 'Failed to update admission status');
      }
    } catch (error) {
      console.error('Error updating admission:', error);
      alert('An error occurred while updating admission status');
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
                <h1 className="text-3xl font-bold text-gray-800">Admission Management</h1>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admissions.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                          No admissions found
                        </td>
                      </tr>
                    ) : (
                      admissions.map((admission) => (
                        <tr key={admission.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admission.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admission.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admission.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admission.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admission.paymentMethod}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admission.transactionId || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              admission.status === 'approved' ? 'bg-green-100 text-green-800' :
                              admission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {admission.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(admission.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {admission.status === 'pending' && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => updateAdmissionStatus(admission.id, 'approved')}
                                  className="text-green-600 hover:text-green-900 font-medium"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => updateAdmissionStatus(admission.id, 'rejected')}
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


