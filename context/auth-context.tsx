'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'faculty' | 'admin';
  department?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: string, department?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (updates: Partial<User>) => void;
  departments: typeof LEAD_CITY_DEPARTMENTS;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Lead City University Departments
export const LEAD_CITY_DEPARTMENTS = [
  'College of Medicine',
  'College of Law',
  'College of Engineering',
  'College of Business Administration',
  'College of Arts and Humanities',
  'College of Science and Technology',
  'College of Social Sciences',
  'College of Education',
  'College of Nursing',
  'College of Pharmacy',
] as const;

// Mock users for demonstration
const MOCK_USERS: User[] = [
  { id: '1', email: 'student@lcu.edu.ng', name: 'John Student', role: 'student', department: 'College of Engineering' },
  { id: '2', email: 'faculty@lcu.edu.ng', name: 'Dr. Jane Smith', role: 'faculty', department: 'College of Medicine' },
  { id: '3', email: 'admin@lcu.edu.ng', name: 'Admin User', role: 'admin' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('smart-campus-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check mock users first
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('smart-campus-user', JSON.stringify(foundUser));
      router.push('/dashboard');
      setIsLoading(false);
      return;
    }

    // Check stored signed-up users
    const storedUsers = localStorage.getItem('smart-campus-users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const storedUser = users.find((u: User & { password: string }) => u.email === email && u.password === password);
      if (storedUser) {
        const { password, ...userWithoutPassword } = storedUser;
        setUser(userWithoutPassword);
        localStorage.setItem('smart-campus-user', JSON.stringify(userWithoutPassword));
        router.push('/dashboard');
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(false);
    throw new Error('Invalid email or password');
  };

  const signup = async (name: string, email: string, password: string, role: string, department?: string) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if email already exists
    const existingUsers = localStorage.getItem('smart-campus-users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    if (users.find((u: User & { password: string }) => u.email === email) || MOCK_USERS.find(u => u.email === email)) {
      setIsLoading(false);
      throw new Error('Email already exists');
    }

    // Create new user with password
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: role as 'student' | 'faculty' | 'admin',
      department,
      password,
    };

    // Store in users list
    users.push(newUser);
    localStorage.setItem('smart-campus-users', JSON.stringify(users));

    // Set current user (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('smart-campus-user', JSON.stringify(userWithoutPassword));
    router.push('/dashboard');

    setIsLoading(false);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('smart-campus-user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smart-campus-user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      updateUser,
      departments: LEAD_CITY_DEPARTMENTS,
    }}>
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
