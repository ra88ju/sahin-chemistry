// API Configuration and Utility Functions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || 'An error occurred',
      };
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

// Authentication API
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  // Add other fields as appropriate
}

export const authApi = {
  login: async (email: string, password: string) => {
    return apiRequest<{ user: AuthUser; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    return apiRequest<{ user: AuthUser; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  getCurrentUser: async () => {
    return apiRequest<{ user: AuthUser }>('/auth/me', {
      method: 'GET',
    });
  },
};

// Student API Types
export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  role?: string;
}

export interface Course {
  id: string;
  name: string;
  description?: string;
  duration?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  totalQuestions: number;
}

export interface ExamResult {
  id: string;
  examId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  submittedAt: string;
}

export interface StudentPayment {
  id: string;
  amount: number;
  purpose: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
}

export interface PaymentSubmissionData {
  name: string;
  email: string;
  phone: string;
  amount: number;
  purpose: string;
  paymentMethod: string;
  transactionId?: string;
}

// Student API
export const studentApi = {
  getProfile: async () => {
    return apiRequest<{ profile: StudentProfile }>('/student/profile', {
      method: 'GET',
    });
  },

  updateProfile: async (profileData: UpdateProfileData) => {
    return apiRequest<{ profile: StudentProfile }>('/student/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  getCourses: async () => {
    return apiRequest<Course[]>('/student/courses', {
      method: 'GET',
    });
  },

  getExams: async () => {
    return apiRequest<Exam[]>('/student/exams', {
      method: 'GET',
    });
  },

  getExamResults: async () => {
    return apiRequest<ExamResult[]>('/student/exam-results', {
      method: 'GET',
    });
  },

  getPayments: async () => {
    return apiRequest<StudentPayment[]>('/student/payments', {
      method: 'GET',
    });
  },

  submitPayment: async (paymentData: PaymentSubmissionData) => {
    return apiRequest<{ paymentId: string; message: string }>('/student/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },
};

// Exam API Types
export interface ExamDetail extends Exam {
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    points: number;
  }>;
  totalPoints: number;
}

export interface ExamAnswers {
  [questionId: number]: number;
}

export interface ExamSubmissionResult {
  resultId: string;
  examId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  results: Array<{
    questionId: number;
    correct: boolean;
    selectedAnswer?: number;
    correctAnswer: number;
  }>;
}

// Exam API
export const examApi = {
  getExams: async () => {
    return apiRequest<Exam[]>('/exams', {
      method: 'GET',
    });
  },

  getExam: async (examId: string) => {
    return apiRequest<ExamDetail>(`/exams/${examId}`, {
      method: 'GET',
    });
  },

  submitExam: async (examId: string, answers: ExamAnswers) => {
    return apiRequest<ExamSubmissionResult>(`/exams/${examId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  },
};

// Payment API
export type PaymentHistory = {
  id: string;
  amount: number;
  date: string;
  purpose: string;
  paymentMethod: string;
  transactionId?: string;
  [key: string]: unknown; // In case the API returns extra fields
};

export interface PaymentSubmissionData {
  name: string;
  email: string;
  phone: string;
  amount: number;
  purpose: string;
  paymentMethod: string;
  transactionId?: string;
}

export const paymentApi = {
  submitPayment: async (paymentData: PaymentSubmissionData) => {
    return apiRequest<{ paymentId: string; amount: number; paymentMethod: string; status: string }>('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },

  getPaymentHistory: async () => {
    return apiRequest<PaymentHistory[]>('/payments', {
      method: 'GET',
    });
  },
};

// Admission API
export const admissionApi = {
  submitApplication: async (applicationData: {
    name: string;
    email: string;
    phone: string;
    course: string;
    paymentMethod: string;
    transactionId?: string;
  }) => {
    return apiRequest<{ applicationId: string; message: string }>('/admission', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  },
};

