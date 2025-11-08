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
        <div className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{exam.title}</h1>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{exam.duration} minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Questions:</span>
                    <span className="font-semibold">{exam.totalQuestions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Points:</span>
                    <span className="font-semibold">{exam.totalPoints}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-semibold">{exam.subject}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className="font-semibold">{exam.difficulty}</span>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
                  <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm">
                    <li>Read each question carefully before answering</li>
                    <li>You can navigate between questions using Previous/Next buttons</li>
                    <li>The exam will auto-submit when time runs out</li>
                    <li>You can submit the exam early if you finish before time</li>
                    <li>Review your answers before submitting</li>
                  </ul>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleStartExam}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    Start Exam
                  </button>
                  <button
                    onClick={() => router.push('/exams')}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
                  >
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

