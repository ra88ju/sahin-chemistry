'use client';

import { useState } from 'react';

interface PaymentProps {
  onPaymentMethodChange?: (method: string) => void;
  selectedMethod?: string;
  showTransactionId?: boolean; // Control whether to show transaction ID input
}

// bKash Logo Component - Using official bKash brand color (#E2136E)
const BkashLogo = ({ className = 'w-16 h-10' }: { className?: string }) => (
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

// Nagad Logo Component - Using official Nagad brand color (#00A859)
const NagadLogo = ({ className = 'w-16 h-10' }: { className?: string }) => (
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

export default function Payment({ onPaymentMethodChange, selectedMethod: controlledMethod, showTransactionId = true }: PaymentProps) {
  // Use controlled or uncontrolled pattern
  const [uncontrolledMethod, setUncontrolledMethod] = useState('');
  const isControlled = controlledMethod !== undefined;
  const selectedMethod = isControlled ? controlledMethod : uncontrolledMethod;

  const paymentMethods = [
    {
      id: 'bkash',
      name: 'bKash',
      icon: <BkashLogo className="w-16 h-10 mx-auto" />,
      description: 'Mobile Banking (bKash)',
      color: 'bg-red-50 border-red-200',
      hoverColor: 'hover:bg-red-100',
      selectedColor: 'border-red-500 bg-red-100',
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: <NagadLogo className="w-16 h-10 mx-auto" />,
      description: 'Mobile Banking (Nagad)',
      color: 'bg-green-50 border-green-200',
      hoverColor: 'hover:bg-green-100',
      selectedColor: 'border-green-500 bg-green-100',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Bank Account Transfer',
      color: 'bg-blue-50 border-blue-200',
      hoverColor: 'hover:bg-blue-100',
      selectedColor: 'border-blue-500 bg-blue-100',
    },
    {
      id: 'cash',
      name: 'Cash',
      icon: '💰',
      description: 'Cash Payment',
      color: 'bg-yellow-50 border-yellow-200',
      hoverColor: 'hover:bg-yellow-100',
      selectedColor: 'border-yellow-500 bg-yellow-100',
    },
  ];

  const handleMethodSelect = (methodId: string) => {
    if (!isControlled) {
      setUncontrolledMethod(methodId);
    }
    if (onPaymentMethodChange) {
      onPaymentMethodChange(methodId);
    }
  };

  const getPaymentInstructions = (methodId: string) => {
    switch (methodId) {
      case 'bkash':
        return {
          title: 'bKash Payment Instructions',
          steps: [
            'Dial *247# from your bKash registered mobile number',
            'Select "Send Money"',
            'Enter our bKash number: 017XXXXXXXX',
            'Enter the payment amount',
            'Enter your bKash PIN',
            'Save the transaction ID (TXN ID)',
            'Enter the TXN ID in the form below',
          ],
          accountInfo: 'bKash Number: 017XXXXXXXX',
        };
      case 'nagad':
        return {
          title: 'Nagad Payment Instructions',
          steps: [
            'Dial *167# from your Nagad registered mobile number',
            'Select "Send Money"',
            'Enter our Nagad number: 017XXXXXXXX',
            'Enter the payment amount',
            'Enter your Nagad PIN',
            'Save the transaction ID (TXN ID)',
            'Enter the TXN ID in the form below',
          ],
          accountInfo: 'Nagad Number: 017XXXXXXXX',
        };
      case 'bank':
        return {
          title: 'Bank Transfer Instructions',
          steps: [
            'Transfer the payment amount to our bank account',
            'Use your name as reference',
            'Save the transaction receipt/transaction ID',
            'Enter the transaction details in the form below',
          ],
          accountInfo: 'Bank: ABC Bank Ltd.\nAccount Name: Sahin Chemistry Center\nAccount Number: 1234567890\nBranch: Main Branch',
        };
      case 'cash':
        return {
          title: 'Cash Payment Instructions',
          steps: [
            'Visit our office during working hours',
            'Bring the required payment amount in cash',
            'Submit the payment at the front desk',
            'Collect your payment receipt',
          ],
          accountInfo: 'Office Address: 123 Education Street, Chemistry District, City',
        };
      default:
        return null;
    }
  };

  const instructions = selectedMethod ? getPaymentInstructions(selectedMethod) : null;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-4">
          Payment Method <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => handleMethodSelect(method.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                selectedMethod === method.id
                  ? method.selectedColor
                  : `${method.color} ${method.hoverColor}`
              }`}
            >
              <div className="mb-2 flex items-center justify-center">
                {typeof method.icon === 'string' ? (
                  <span className="text-3xl">{method.icon}</span>
                ) : (
                  method.icon
                )}
              </div>
              <div className="font-semibold text-gray-800">{method.name}</div>
              <div className="text-xs text-gray-600 mt-1">{method.description}</div>
              {selectedMethod === method.id && (
                <div className="mt-2">
                  <svg
                    className="w-5 h-5 mx-auto text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {instructions && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">{instructions.title}</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Steps:</h4>
              <ol className="list-decimal list-inside space-y-1 text-blue-700 text-sm">
                {instructions.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="bg-white rounded p-3 border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-1">Account Information:</h4>
              <pre className="text-blue-700 text-sm whitespace-pre-wrap font-sans">
                {instructions.accountInfo}
              </pre>
            </div>
          </div>
        </div>
      )}

      {showTransactionId && selectedMethod && selectedMethod !== 'cash' && (
        <div>
          <label htmlFor="transactionId" className="block text-gray-700 font-medium mb-2">
            Transaction ID / Reference Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="transactionId"
            name="transactionId"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter your transaction ID or reference number"
          />
          <p className="text-sm text-gray-500 mt-1">
            Please enter the transaction ID you received after making the payment
          </p>
        </div>
      )}

      {selectedMethod === 'cash' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> For cash payment, please visit our office during working hours.
            Our office hours are Monday to Saturday, 9:00 AM - 5:00 PM.
          </p>
        </div>
      )}

      <input type="hidden" name="paymentMethod" value={selectedMethod} />
    </div>
  );
}

