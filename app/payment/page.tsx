'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Payment from '../components/Payment';

// bKash Logo Component
const BkashLogo = ({ className = 'w-20 h-12' }: { className?: string }) => (
  <svg
    viewBox="0 0 120 35"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="120" height="35" rx="5" fill="#E2136E" />
    <text
      x="60"
      y="24"
      fontSize="20"
      fontWeight="700"
      fill="white"
      textAnchor="middle"
      fontFamily="'Arial Black', Arial, sans-serif"
      letterSpacing="0.5px"
    >
      bKash
    </text>
  </svg>
);

// Nagad Logo Component
const NagadLogo = ({ className = 'w-20 h-12' }: { className?: string }) => (
  <svg
    viewBox="0 0 120 35"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="120" height="35" rx="5" fill="#00A859" />
    <text
      x="60"
      y="24"
      fontSize="20"
      fontWeight="700"
      fill="white"
      textAnchor="middle"
      fontFamily="'Arial Black', Arial, sans-serif"
      letterSpacing="1px"
    >
      NAGAD
    </text>
  </svg>
);

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    paymentMethod: '',
    transactionId: '',
    purpose: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    if (formData.paymentMethod !== 'cash' && !formData.transactionId) {
      setError('Please enter your transaction ID');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          amount: parseFloat(formData.amount),
          purpose: formData.purpose,
          paymentMethod: formData.paymentMethod,
          transactionId: formData.transactionId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message || 'Payment information submitted successfully! We will verify and confirm your payment soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          amount: '',
          paymentMethod: '',
          transactionId: '',
          purpose: '',
        });
      } else {
        setError(result.error || 'Failed to submit payment. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Payment submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData({
      ...formData,
      paymentMethod: method,
      transactionId: '',
    });
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Make a Payment</h1>
            <p className="text-center text-gray-600 mb-8">
              Complete your payment using your preferred payment method
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                    Payment Amount (BDT) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter payment amount"
                  />
                </div>

                <div>
                  <label htmlFor="purpose" className="block text-gray-700 font-medium mb-2">
                    Payment Purpose <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select payment purpose...</option>
                    <option value="admission">Admission Fee</option>
                    <option value="tuition">Tuition Fee</option>
                    <option value="exam">Exam Fee</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Payment Method Section */}
                <div className="border-t border-gray-200 pt-6">
                  <Payment
                    onPaymentMethodChange={handlePaymentMethodChange}
                    selectedMethod={formData.paymentMethod}
                  />
                  {formData.paymentMethod && formData.paymentMethod !== 'cash' && (
                    <div className="mt-4">
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        required={formData.paymentMethod !== 'cash'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Enter transaction ID"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Submitting...' : 'Submit Payment'}
                </button>
              </form>
            </div>

            {/* Payment Methods Info */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Methods</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-3 flex justify-center">
                    <BkashLogo className="w-24 h-14" />
                  </div>
                  <p className="text-sm text-gray-600 text-center">Send money to: 017XXXXXXXX</p>
                  <p className="text-xs text-gray-500 mt-1 text-center">Available 24/7</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-3 flex justify-center">
                    <NagadLogo className="w-24 h-14" />
                  </div>
                  <p className="text-sm text-gray-600 text-center">Send money to: 017XXXXXXXX</p>
                  <p className="text-xs text-gray-500 mt-1 text-center">Available 24/7</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 text-center">🏦 Bank Transfer</h3>
                  <p className="text-sm text-gray-600 text-center">ABC Bank Ltd.</p>
                  <p className="text-xs text-gray-500 mt-1 text-center">Account: 1234567890</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 text-center">💰 Cash Payment</h3>
                  <p className="text-sm text-gray-600 text-center">Visit our office</p>
                  <p className="text-xs text-gray-500 mt-1 text-center">Mon-Sat: 9 AM - 5 PM</p>
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

