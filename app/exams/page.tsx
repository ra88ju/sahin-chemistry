'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { exams } from '../data/exams';

export default function ExamsPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const subjects = ['All', ...Array.from(new Set(exams.map((exam) => exam.subject)))];
  const difficulties = ['All', ...Array.from(new Set(exams.map((exam) => exam.difficulty)))];

  const filteredExams = exams.filter((exam) => {
    const subjectMatch = selectedSubject === 'All' || exam.subject === selectedSubject;
    const difficultyMatch = selectedDifficulty === 'All' || exam.difficulty === selectedDifficulty;
    return subjectMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-300 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
              Online Exams
            </h1>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Test your chemistry knowledge with our comprehensive exam system
            </p>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-100">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    style={{ color: '#000' }}
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject} style={{ color: '#000', backgroundColor: '#fff' }}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    style={{ color: '#000' }}
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty} style={{ color: '#000', backgroundColor: '#fff' }}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Exam Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                          exam.difficulty
                        )}`}
                      >
                        {exam.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">{exam.subject}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{exam.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                          />
                        </svg>
                        <span>{exam.totalQuestions} Questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4"
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
                        <span>{exam.duration} min</span>
                      </div>
                    </div>
                    <Link
                      href={`/exams/${exam.id}`}
                      className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                    >
                      Start Exam
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredExams.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No exams found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

