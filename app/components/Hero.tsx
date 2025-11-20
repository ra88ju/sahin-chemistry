'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const highlightColors = ['#DBEAFE', '#CFFAFE', '#FEE2E2', '#F5F3FF'];

const notices = [
  {
    id: 'notice-jan',
    label: 'Admission Test Schedule Updated',
    tag: 'Admission',
    date: 'Updated on Jan 3, 2025',
    description:
      'The admission test for the 2025 session will be held on January 15. Please collect your admit card from the office between January 5 - 10. For any assistance, contact the admission desk.',
    highlights: [
      'Exam Date: January 15, 2025 (9:00 AM)',
      'Admit card distribution: January 5 - 10',
      'Venue: Chemistry World Main Campus',
    ],
    primaryAction: {
      label: 'Go to Admission',
      href: '#admission',
    },
    secondaryAction: {
      label: 'Download Schedule',
      href: '#',
    },
  },
  {
    id: 'notice-lab',
    label: 'Lab Safety Orientation',
    tag: 'Academic',
    date: 'Published on Dec 29, 2024',
    description:
      'Compulsory lab safety orientation for all new students on January 18 at 10:00 AM in Lab 03. Attendance is mandatory.',
    highlights: [
      'Orientation Date: January 18, 10:00 AM',
      'Location: Lab 03, Research Building',
      'Bring lab coat and safety goggles',
    ],
    primaryAction: {
      label: 'View Details',
      href: '#courses',
    },
  },
];

export default function Hero() {
  const [colorIndex, setColorIndex] = useState(0);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % highlightColors.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-32 pb-24 overflow-hidden text-white"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=1600&q=80"
          alt="Chemistry lab background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-800/85 to-blue-700/80 backdrop-blur-sm -z-10" />

      <div className="container mx-auto px-4 relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Welcome to  Chemistry World
            </h1>
            <p
              className="text-lg md:text-xl mb-8 transition-colors duration-700 ease-in-out"
              style={{ color: highlightColors[colorIndex] }}
            >
              Excellence in Chemical Education – Building Future Chemists with modern labs,
              expert mentors, and interactive learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
              <a
                href="#admission"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Apply Now
              </a>
              <a
                href="#contact"
                className="inline-block border border-white/80 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </a>
              <button
                onClick={() => setIsNoticeOpen(true)}
                className="inline-flex items-center gap-2 bg-yellow-400/90 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg w-full sm:w-auto justify-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M5.64 17.36A9 9 0 1120.36 6.64 9 9 0 015.64 17.36z"
                  />
                </svg>
                Notices ({notices.length})
              </button>
            </div>
            
            {/* Scroll Down Button */}
            <div className="flex justify-center mt-12 lg:mt-16">
              <a
                href="#courses"
                className="group flex flex-col items-center text-white/80 hover:text-white transition-all duration-300 animate-bounce"
                aria-label="Scroll down"
              >
                <span className="text-sm mb-2 font-medium">Scroll Down</span>
                <svg
                  className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full -z-10"></div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur relative aspect-[4/3]">
              <Image
                src="/books-graduation.jpg"
                alt="Stack of books with graduation cap and ladder - symbolizing education and achievement"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
      {isNoticeOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-6">
          <div className="bg-white text-gray-800 rounded-3xl max-w-3xl w-full shadow-2xl relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            <div className="p-5 sm:p-8">
            <button
              onClick={() => setIsNoticeOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close notice"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      IMPORTANT NOTICE
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                      {notices[activeNoticeIndex].tag}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {notices[activeNoticeIndex].label}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {notices[activeNoticeIndex].date}
                  </p>
                </div>
                {notices.length > 1 && (
                  <div className="flex items-center gap-2 self-start">
                    <button
                      onClick={() =>
                        setActiveNoticeIndex((prev) =>
                          prev === 0 ? notices.length - 1 : prev - 1
                        )
                      }
                      className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                      aria-label="Previous notice"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="text-sm font-semibold text-gray-500">
                      {activeNoticeIndex + 1}/{notices.length}
                    </span>
                    <button
                      onClick={() =>
                        setActiveNoticeIndex((prev) =>
                          prev === notices.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                      aria-label="Next notice"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4">
                <p className="text-base leading-relaxed text-gray-600">
                  {notices[activeNoticeIndex].description}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {notices[activeNoticeIndex].highlights.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={notices[activeNoticeIndex].primaryAction.href}
                  className="flex-1 text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  onClick={() => setIsNoticeOpen(false)}
                >
                  {notices[activeNoticeIndex].primaryAction.label}
                </a>
                {notices[activeNoticeIndex].secondaryAction ? (
                  <a
                    href={notices[activeNoticeIndex].secondaryAction.href}
                    className="flex-1 text-center border border-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {notices[activeNoticeIndex].secondaryAction.label}
                  </a>
                ) : (
                  <button
                    onClick={() => setIsNoticeOpen(false)}
                    className="flex-1 text-center border border-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
