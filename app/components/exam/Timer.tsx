'use client';

import { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
}

export default function Timer({ initialTime, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft <= 0) {
        onTimeUp();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getColorClass = () => {
    if (timeLeft <= 300) return 'text-red-600'; // Less than 5 minutes
    if (timeLeft <= 600) return 'text-orange-600'; // Less than 10 minutes
    return 'text-blue-600';
  };

  return (
    <div className={`flex items-center space-x-2 ${getColorClass()}`}>
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="font-bold text-lg">{formatTime(timeLeft)}</span>
    </div>
  );
}

