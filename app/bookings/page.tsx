'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { AuthGuard } from '@/components/auth-guard';
import { useAuth } from '@/context/auth-context';
import { mockBookings, mockRooms, getRoomById } from '@/lib/data';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Plus,
  Search,
  Filter,
  MoreVertical,
  ArrowRight,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const STATUS_CONFIG = {
  confirmed: { color: 'bg-green-100 text-green-700', icon: CheckCircle2, label: 'Confirmed' },
  pending: { color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle, label: 'Pending' },
  cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Cancelled' },
};

export default function BookingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const now = new Date();
  
  const filteredBookings = mockBookings.filter(booking => {
    const room = getRoomById(booking.roomId);
    const matchesSearch = booking.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'upcoming') return booking.startTime > now && booking.status !== 'cancelled' && matchesSearch;
    if (activeTab === 'past') return booking.endTime < now && matchesSearch;
    return matchesSearch;
  });

  const stats = {
    upcoming: mockBookings.filter(b => b.startTime > now && b.status !== 'cancelled').length,
    today: mockBookings.filter(b => {
      const today = new Date();
      return b.startTime.toDateString() === today.toDateString() && b.status !== 'cancelled';
    }).length,
    total: mockBookings.length,
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
                <p className="text-gray-600">Manage your space reservations</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Today</p>
                <p className="text-2xl font-bold text-green-600">{stats.today}</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>

            {/* Tabs & Search */}
            <div className="bg-white rounded-lg border mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b gap-4">
                <div className="flex gap-1">
                  {(['upcoming', 'past', 'all'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                  />
                </div>
              </div>

              {/* Bookings List */}
              <div className="divide-y">
                {filteredBookings.map((booking) => {
                  const room = getRoomById(booking.roomId);
                  const status = STATUS_CONFIG[booking.status];
                  const StatusIcon = status.icon;
                  
                  return (
                    <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-lg flex flex-col items-center justify-center">
                            <span className="text-xs text-blue-600 font-medium">
                              {formatDate(booking.startTime).split(' ')[1]}
                            </span>
                            <span className="text-lg font-bold text-blue-900">
                              {booking.startTime.getDate()}
                            </span>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.purpose}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Building2 className="h-4 w-4" />
                              {room?.name || 'Unknown Room'}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {room?.building || 'Unknown'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </span>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <MoreVertical className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredBookings.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No bookings found</h3>
                    <p className="text-gray-500 mb-4">You don't have any {activeTab} bookings</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Booking
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Book Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Need a space urgently?</h3>
                  <p className="text-blue-100">Check real-time availability and book instantly</p>
                </div>
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Find Available Spaces
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
