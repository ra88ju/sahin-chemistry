'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// ========== EASY TO CHANGE ==========
// Replace the URL below to change the hero background image
// Chemistry lab & education images:
//   - Current (team photo): /hero-bg.jpg
//   - Lab with students: https://images.unsplash.com/photo-1581093808694-7b8349abc3e7?auto=format&fit=crop&w=2000&q=80
//   - Modern chemistry lab: https://images.unsplash.com/photo-1576174881033-58b1e0c9ce13?auto=format&fit=crop&w=2000&q=80
//   - Science experiment: https://images.unsplash.com/photo-1530549233789-810c7e383e7d?auto=format&fit=crop&w=2000&q=80
const HERO_BACKGROUND_IMAGE = '/hero-bg.jpg';

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
      href: '/admission-test-schedule.txt',
      download: true,
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
  const handleOpenNotices = () => {
    setActiveNoticeIndex(0);
    setIsNoticeOpen(true);
  };

  const handleCloseNotices = () => setIsNoticeOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % highlightColors.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isNoticeOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseNotices();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isNoticeOpen]);

  return (
    <section
      id="home"
      className="relative pt-24 pb-32 overflow-hidden text-white min-h-screen flex items-center"
      style={{
        backgroundImage: `url(${HERO_BACKGROUND_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-indigo-900/80 to-blue-800/60 -z-10" />
      
      {/* Additional subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-600/20 -z-10" />

      <div className="container mx-auto px-4 relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight hero-3d-title"
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px) scale(1.05)`;
                card.style.transition = 'none';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.transition = 'transform 0.5s ease-out';
              }}
            >
              Welcome to  Chemistry World
            </h1>
            <style jsx global>{`
              .hero-3d-title {
                transform-style: preserve-3d;
                animation: float3d 6s ease-in-out infinite;
                transition: transform 0.5s ease-out;
              }
              
              @keyframes float3d {
                0%, 100% {
                  transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px);
                }
                25% {
                  transform: perspective(1000px) rotateX(3deg) rotateY(-3deg) translateY(-8px) translateZ(15px);
                }
                50% {
                  transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-12px) translateZ(20px);
                }
                75% {
                  transform: perspective(1000px) rotateX(-3deg) rotateY(3deg) translateY(-8px) translateZ(15px);
                }
              }
            `}</style>
            <p
              className="text-lg md:text-xl mb-8 transition-colors duration-700 ease-in-out"
              style={{ color: highlightColors[colorIndex] }}
            >
               Quality teaching is our formula for your success.”
              🌟 Chemistry World: রসায়ন শেখার সর্বাধিক নির্ভরযোগ্য প্রাইভেট সেন্টার

            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
              <a
                href="#admission"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Admission
              </a>

              <button
                type="button"
                onClick={handleOpenNotices}
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
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur relative aspect-4/3">
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
          <div
            className="absolute inset-0"
            onClick={handleCloseNotices}
          />
          <div
            className="relative max-w-3xl w-full rounded-3xl bg-white px-5 py-6 shadow-2xl z-10 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Latest important notice"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            <button
              type="button"
              onClick={handleCloseNotices}
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

            <div className="space-y-6 mt-6">
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
                      type="button"
                      onClick={() =>
                        setActiveNoticeIndex((prev) =>
                          prev === 0 ? notices.length - 1 : prev - 1
                        )
                      }
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors"
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
                    <span className="text-sm font-semibold text-gray-900 bg-white/80 px-2 py-1 rounded-full border border-transparent shadow-sm">
                      {activeNoticeIndex + 1}/{notices.length}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveNoticeIndex((prev) =>
                          prev === notices.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors"
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
                <p className="text-base leading-relaxed text-gray-900">
                  {notices[activeNoticeIndex].description}
                </p>
                <ul className="space-y-2 text-sm text-gray-900">
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
                  onClick={handleCloseNotices}
                >
                  {notices[activeNoticeIndex].primaryAction.label}
                </a>
                {notices[activeNoticeIndex].secondaryAction ? (
                  <a
                    href={notices[activeNoticeIndex].secondaryAction.href}
                    className="flex-1 text-center border border-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-gray-900"
                    download={notices[activeNoticeIndex].secondaryAction.download ? true : undefined}
                    target={notices[activeNoticeIndex].secondaryAction.download ? '_blank' : undefined}
                    rel="noreferrer"
                    onClick={handleCloseNotices}
                  >
                    {notices[activeNoticeIndex].secondaryAction.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={handleCloseNotices}
                    className="flex-1 text-center border border-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
