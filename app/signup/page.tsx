'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      await signup(name, email, password, role);
    } catch (err) {
      setError('Failed to create account');
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
          <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
          <p className="mt-2 text-gray-600">Join Smart Campus today</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Fill in your details to get started
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
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

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
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Administrator</option>
                </select>
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" required />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="#" className="text-blue-600 hover:text-blue-500">Terms</Link>
                  {' '}and{' '}
                  <Link href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
                </span>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign in
                </Link>
              </p>
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
