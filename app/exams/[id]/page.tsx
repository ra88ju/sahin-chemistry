'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Timer from '../../components/exam/Timer';
import { exams } from '../../data/exams';
import { ExamResult } from '../../types/exam';

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;

  const exam = exams.find((e) => e.id === examId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [isExamStarted, setIsExamStarted] = useState(false);

  useEffect(() => {
    if (!exam) {
      router.push('/exams');
      return;
    }
  }, [exam, router]);

  if (!exam) {
    return null;
  }

  const handleStartExam = () => {
    setIsExamStarted(true);
  };

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the exam? You cannot change your answers after submission.')) {
      calculateResult();
    }
  };

  const handleTimeUp = () => {
    if (window.confirm('Time is up! Your exam will be submitted automatically.')) {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let score = 0;
    let correctAnswers = 0;

    exam.questions.forEach((question) => {
      const selectedAnswer = answers[question.id];
      if (selectedAnswer !== undefined && selectedAnswer === question.correctAnswer) {
        score += question.points;
        correctAnswers++;
      }
    });

    const percentage = (score / exam.totalPoints) * 100;

    const examResult: ExamResult = {
      examId: exam.id,
      score,
      totalPoints: exam.totalPoints,
      percentage: Math.round(percentage * 100) / 100,
      correctAnswers,
      totalQuestions: exam.totalQuestions,
      timeSpent,
      submittedAt: new Date(),
    };

    setResult(examResult);
    setIsSubmitted(true);
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  const answeredQuestions = Object.keys(answers).length;

  if (!isExamStarted) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 animate-fade-in backdrop-blur-sm border border-white/50">
                {/* Title Section */}
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {exam.title}
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
                </div>

                {/* Exam Details Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200/50 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Duration</span>
                      <span className="font-bold text-blue-700 text-lg">{exam.duration} min</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-5 border border-indigo-200/50 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Total Questions</span>
                      <span className="font-bold text-indigo-700 text-lg">{exam.totalQuestions}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200/50 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Total Points</span>
                      <span className="font-bold text-purple-700 text-lg">{exam.totalPoints}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 border border-pink-200/50 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Difficulty</span>
                      <span className="font-bold text-pink-700 text-lg capitalize">{exam.difficulty}</span>
                    </div>
                  </div>
                </div>

                {/* Subject Badge */}
                <div className="mb-8 text-center">
                  <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-sm shadow-lg">
                    {exam.subject}
                  </span>
                </div>

                {/* Instructions Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200/60 rounded-xl p-6 mb-8 shadow-inner">
                  <h3 className="font-bold text-blue-900 mb-4 text-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Instructions
                  </h3>
                  <ul className="space-y-3 text-blue-800">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm md:text-base">Read each question carefully before answering</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm md:text-base">You can navigate between questions using Previous/Next buttons</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm md:text-base">The exam will auto-submit when time runs out</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm md:text-base">You can submit the exam early if you finish before time</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm md:text-base">Review your answers before submitting</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleStartExam}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Start Exam
                  </button>
                  <button
                    onClick={() => router.push('/exams')}
                    className="flex-1 bg-white text-gray-700 py-4 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center shadow-md"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Exams
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (isSubmitted && result) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Exam Results</h1>
                <div className="text-center mb-8">
                  <div
                    className={`text-6xl font-bold mb-4 ${
                      result.percentage >= 70
                        ? 'text-green-600'
                        : result.percentage >= 50
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {result.percentage.toFixed(1)}%
                  </div>
                  <p className="text-lg text-gray-600">
                    {result.percentage >= 70
                      ? 'Excellent Work!'
                      : result.percentage >= 50
                      ? 'Good Job!'
                      : 'Keep Practicing!'}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Score</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {result.score} / {result.totalPoints}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Correct Answers</div>
                    <div className="text-2xl font-bold text-green-600">
                      {result.correctAnswers} / {result.totalQuestions}
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-4">Question Review</h3>
                  <div className="space-y-4">
                    {exam.questions.map((question, index) => {
                      const selectedAnswer = answers[question.id];
                      const isCorrect = selectedAnswer === question.correctAnswer;
                      return (
                        <div
                          key={question.id}
                          className={`border rounded-lg p-4 ${
                            isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="font-semibold text-gray-800">
                              Question {index + 1}
                            </span>
                            {isCorrect ? (
                              <span className="text-green-600 font-semibold">Correct</span>
                            ) : (
                              <span className="text-red-600 font-semibold">Incorrect</span>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{question.question}</p>
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="font-semibold">Your Answer: </span>
                              <span
                                className={isCorrect ? 'text-green-700' : 'text-red-700'}
                              >
                                {selectedAnswer !== undefined
                                  ? question.options[selectedAnswer]
                                  : 'Not answered'}
                              </span>
                            </div>
                            {!isCorrect && (
                              <div className="text-sm">
                                <span className="font-semibold">Correct Answer: </span>
                                <span className="text-green-700">
                                  {question.options[question.correctAnswer]}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => router.push('/exams')}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    Take Another Exam
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
                  >
                    Retake Exam
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Exam Header */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{exam.title}</h2>
                  <p className="text-sm text-gray-600">
                    Question {currentQuestionIndex + 1} of {exam.totalQuestions}
                  </p>
                </div>
                <Timer
                  initialTime={exam.duration * 60}
                  onTimeUp={handleTimeUp}
                  isActive={!isSubmitted}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Question Navigation Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
                  <h3 className="font-semibold text-gray-800 mb-3">Questions</h3>
                  <div className="grid grid-cols-5 lg:grid-cols-3 gap-2">
                    {exam.questions.map((question, index) => {
                      const isAnswered = answers[question.id] !== undefined;
                      const isCurrent = index === currentQuestionIndex;
                      return (
                        <button
                          key={question.id}
                          onClick={() => setCurrentQuestionIndex(index)}
                          className={`w-10 h-10 rounded-lg font-semibold text-sm transition-colors ${
                            isCurrent
                              ? 'bg-blue-600 text-white'
                              : isAnswered
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Answered:</span>
                        <span className="font-semibold">{answeredQuestions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Remaining:</span>
                        <span className="font-semibold">
                          {exam.totalQuestions - answeredQuestions}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question Area */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {currentQuestion.question}
                    </h3>
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => {
                        const isSelected = answers[currentQuestion.id] === index;
                        return (
                          <label
                            key={index}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${currentQuestion.id}`}
                              value={index}
                              checked={isSelected}
                              onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-3 text-gray-700">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {currentQuestionIndex === exam.questions.length - 1 ? (
                      <button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Submit Exam
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Next
                      </button>
                    )}
                  </div>
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

