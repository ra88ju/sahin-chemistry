'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  studentId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side to avoid SSR/hydration issues
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('student_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as User;
          setUser(parsedUser);
        }
      } catch {
        // If parsing fails, remove corrupted data
        localStorage.removeItem('student_user');
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - Replace with actual API integration
    // For demo purposes, accepting any email/password combination
    // In production, this should call your backend API
    
    // Demo: Accept any credentials (replace with real authentication)
    if (email && password) {
      const userData: User = {
        id: Date.now().toString(),
        email: email,
        name: email.split('@')[0], // Use email prefix as name for demo
        studentId: `STU${Date.now().toString().slice(-6)}`,
      };
      
      setUser(userData);
      localStorage.setItem('student_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('student_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

