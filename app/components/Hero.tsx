'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const highlightColors = ['#DBEAFE', '#CFFAFE', '#FEE2E2', '#F5F3FF'];

export default function Hero() {
  const [colorIndex, setColorIndex] = useState(0);

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
    </section>
  );
}
