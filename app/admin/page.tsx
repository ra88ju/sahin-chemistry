'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

interface DashboardStats {
  totalUsers: number;
  totalPayments: number;
  totalAdmissions: number;
  pendingPayments: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading, isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPayments: 0,
    totalAdmissions: 0,
    pendingPayments: 0,
    totalRevenue: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }
      // Check if user has admin role
      if (user && user.role !== 'admin') {
        router.push('/student');
        return;
      }
    }
  }, [isAuthenticated, isLoading, isAdmin, user, router]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  const fetchStats = async () => {
    try {
      const [usersRes, paymentsRes, admissionsRes] = await Promise.all([
        fetch('/api/admin/users').catch(() => ({ ok: false, json: async () => ({ success: false, data: [] }) })),
        fetch('/api/admin/payments').catch(() => ({ ok: false, json: async () => ({ success: false, data: [] }) })),
        fetch('/api/admin/admissions').catch(() => ({ ok: false, json: async () => ({ success: false, data: [] }) })),
      ]);

      const [usersData, paymentsData, admissionsData] = await Promise.all([
        usersRes.json().catch(() => ({ success: false, data: [] })),
        paymentsRes.json().catch(() => ({ success: false, data: [] })),
        admissionsRes.json().catch(() => ({ success: false, data: [] })),
      ]);

      const payments = paymentsData.data || [];
      interface Payment {
        status: string;
        amount: number;
      }

      const totalRevenue = (payments as Payment[])
        .filter((p) => p.status === 'verified')
        .reduce((sum, p) => sum + (p.amount || 0), 0);

      setStats({
        totalUsers: usersData.data?.length || 0,
        totalPayments: payments.length,
        totalAdmissions: admissionsData.data?.length || 0,
        pendingPayments: (payments as Payment[]).filter((p) => p.status === 'pending').length,
        totalRevenue,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default stats on error
      setStats({
        totalUsers: 0,
        totalPayments: 0,
        totalAdmissions: 0,
        pendingPayments: 0,
        totalRevenue: 0,
      });
    } finally {
      setLoadingStats(false);
    }
  };

  if (isLoading || loadingStats) {
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

  if (!isAuthenticated || !user) {
    return null;
  }

  if (user.role !== 'admin') {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Welcome, <span className="font-semibold">{user.name}</span>
                  </p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalUsers}</div>
                <div className="text-gray-600">Total Users</div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalPayments}</div>
                <div className="text-gray-600">Total Payments</div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pendingPayments}</div>
                <div className="text-gray-600">Pending Payments</div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalAdmissions}</div>
                <div className="text-gray-600">Admissions</div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">৳{stats.totalRevenue.toLocaleString()}</div>
                <div className="text-gray-600">Total Revenue</div>
              </div>
            </div>

            {/* Management Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/admin/users"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage Users</h3>
                <p className="text-gray-600 text-sm">View and manage all users</p>
              </Link>

              <Link
                href="/admin/payments"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage Payments</h3>
                <p className="text-gray-600 text-sm">Review and verify payments</p>
              </Link>

              <Link
                href="/admin/admissions"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage Admissions</h3>
                <p className="text-gray-600 text-sm">View and process admissions</p>
              </Link>

              <Link
                href="/admin/exams"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage Exams</h3>
                <p className="text-gray-600 text-sm">Create and manage exams</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

