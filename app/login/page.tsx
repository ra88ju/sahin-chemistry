'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);

  // Animate background shapes
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        const storedUser = localStorage.getItem('student_user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/student');
          }
        } else {
          router.push('/student');
        }
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="relative pt-20 pb-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 min-h-screen overflow-hidden flex items-center">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating circles with gradient colors */}
          <div
            className={`absolute w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl transition-all duration-1000 ease-in-out ${
              animationIndex === 0 ? 'top-0 -left-48' : animationIndex === 1 ? 'top-1/4 -right-32' : animationIndex === 2 ? 'bottom-0 left-1/3' : 'bottom-1/4 right-0'
            }`}
          />
          <div
            className={`absolute w-80 h-80 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl transition-all duration-1000 ease-in-out ${
              animationIndex === 0 ? 'bottom-1/4 right-0' : animationIndex === 1 ? 'top-0 -left-48' : animationIndex === 2 ? 'top-1/4 -right-32' : 'bottom-0 left-1/3'
            }`}
          />
          <div
            className={`absolute w-72 h-72 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl transition-all duration-1000 ease-in-out ${
              animationIndex === 0 ? 'top-1/4 -right-32' : animationIndex === 1 ? 'bottom-0 left-1/3' : animationIndex === 2 ? 'bottom-1/4 right-0' : 'top-0 -left-48'
            }`}
          />
          <div
            className={`absolute w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl transition-all duration-1000 ease-in-out ${
              animationIndex === 1 ? 'top-1/3 right-1/4' : animationIndex === 2 ? 'bottom-1/3 left-1/4' : animationIndex === 3 ? 'top-1/2 -right-32' : 'bottom-1/2 -left-32'
            }`}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Branding */}
            <div className="hidden md:block text-white">
              <div className="mb-8">
                <div className="inline-block bg-gradient-to-r from-cyan-400/30 to-blue-400/30 backdrop-blur-md px-6 py-3 rounded-full mb-4 border border-white/20">
                  <p className="text-sm font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">Welcome Back</p>
                </div>
              </div>
              <h2 className="text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">Chemistry World</h2>
              <p className="text-xl text-blue-50 mb-8 font-light drop-shadow">Unlock your learning potential with our premium chemistry courses and expert guidance.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/50 to-blue-400/50 backdrop-blur rounded-lg flex items-center justify-center group-hover:from-cyan-500 group-hover:to-blue-500 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white drop-shadow">Fast Learning</p>
                    <p className="text-sm text-blue-100">Accelerated courses designed for you</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400/50 to-pink-400/50 backdrop-blur rounded-lg flex items-center justify-center group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0-4v2m0 0v6m0-6H8m4 0h4m-6 6a2 2 0 100 4m0-4a2 2 0 110 4m0-4v2m0 0v2m0 0H8m4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white drop-shadow">Expert Tutors</p>
                    <p className="text-sm text-blue-100">Learn from experienced professionals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400/50 to-pink-400/50 backdrop-blur rounded-lg flex items-center justify-center group-hover:from-rose-500 group-hover:to-pink-500 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white drop-shadow">24/7 Support</p>
                    <p className="text-sm text-blue-100">Always here to help your journey</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full max-w-md mx-auto md:mx-0 group">
              {/* Animated Gradient Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />
              <div className="relative bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-white/30">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-transform duration-300 animate-pulse">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Student Login</h1>
                  <p className="text-gray-600 text-sm font-medium">Sign in to access your student portal</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-700 px-4 py-4 rounded-lg mb-6 animate-shake">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group/input">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg opacity-0 group-focus-within/input:opacity-100 transition duration-300 blur" />
                      <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="relative w-full pl-12 pr-4 py-3 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-lg focus:border-transparent focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300 placeholder-gray-400 text-gray-800"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group/input">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg opacity-0 group-focus-within/input:opacity-100 transition duration-300 blur" />
                      <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="relative w-full pl-12 pr-12 py-3 bg-gradient-to-br from-gray-50 to-purple-50 border-2 border-gray-200 rounded-lg focus:border-transparent focus:ring-2 focus:ring-pink-500 outline-none transition-all duration-300 placeholder-gray-400 text-gray-800"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3.5 text-gray-400 hover:text-purple-600 transition-colors duration-300"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-white rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-gray-700 font-medium">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 text-white py-3.5 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/98 text-gray-600 font-semibold">New to Chemistry World?</span>
                  </div>
                </div>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-gray-700 text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

