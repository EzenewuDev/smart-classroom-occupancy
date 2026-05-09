'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Building2, Bell, User, Menu, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Menu */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                  Lead City University
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Smart Space Occupancy System
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Time */}
          <div className="hidden md:block text-sm text-gray-600">
            {currentTime}
          </div>

          {/* Right: Notifications and Profile */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            
            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Guest'}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role || 'Unknown'}</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    {user?.department && (
                      <p className="text-xs text-blue-600 mt-1">{user.department}</p>
                    )}
                  </div>
                  
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
