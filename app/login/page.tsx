'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password. Try: student@university.edu / password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>
                <Link href="#" className="text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500 mb-3">Demo accounts:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => { setEmail('student@university.edu'); setPassword('password'); }}
                  className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('faculty@university.edu'); setPassword('password'); }}
                  className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  Faculty
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('admin@university.edu'); setPassword('password'); }}
                  className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  Admin
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
