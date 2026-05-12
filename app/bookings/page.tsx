'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { BookingModal } from '@/components/booking-modal';
import { mockBookings, getRoomById } from '@/lib/data';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Search,
  MoreVertical,
  ArrowRight,
  Building2,
  QrCode,
  Trash2,
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
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const now = new Date();

  const filteredBookings = mockBookings.filter(booking => {
    const room = getRoomById(booking.roomId);
    const matchesSearch =
      booking.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
              <p className="text-gray-600 text-sm">Manage your space reservations</p>
            </div>
            <Button
              onClick={() => setBookingModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white rounded-xl border p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-500">Upcoming</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.upcoming}</p>
            </div>
            <div className="bg-white rounded-xl border p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-500">Today</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.today}</p>
            </div>
            <div className="bg-white rounded-xl border p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-500">Total</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>

          {/* Tabs & Search */}
          <div className="bg-white rounded-xl border mb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b gap-3">
              <div className="flex gap-1">
                {(['upcoming', 'past', 'all'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium capitalize transition-colors ${
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
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
                />
              </div>
            </div>

            {/* Bookings List */}
            <div className="divide-y">
              {filteredBookings.map((booking) => {
                const room = getRoomById(booking.roomId);
                const status = STATUS_CONFIG[booking.status];
                const StatusIcon = status.icon;
                const isMenuOpen = menuOpenId === booking.id;

                return (
                  <div key={booking.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors relative">
                    <div className="flex items-start justify-between gap-3">
                      {/* Date block */}
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-xl flex flex-col items-center justify-center">
                        <span className="text-[10px] sm:text-xs text-blue-600 font-medium uppercase">
                          {formatDate(booking.startTime).split(' ')[1]}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-blue-900">
                          {booking.startTime.getDate()}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{booking.purpose}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                          <Building2 className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{room?.name || 'Unknown Room'}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(booking.startTime)} – {formatTime(booking.endTime)}
                          </span>
                          <span className="hidden sm:flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {room?.building || 'Unknown'}
                          </span>
                        </div>
                      </div>

                      {/* Status + Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium hidden sm:flex items-center gap-1 ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                        <div className="relative">
                          <button
                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                            onClick={() => setMenuOpenId(isMenuOpen ? null : booking.id)}
                          >
                            <MoreVertical className="h-4 w-4 text-gray-500" />
                          </button>
                          {isMenuOpen && (
                            <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border py-1 z-10">
                              <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50">
                                <QrCode className="h-3 w-3" />
                                View QR Code
                              </button>
                              <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50">
                                <Trash2 className="h-3 w-3" />
                                Cancel Booking
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Mobile status badge */}
                    <div className="mt-2 flex items-center gap-2 sm:hidden">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        {room?.building || 'Unknown'}
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredBookings.length === 0 && (
                <div className="text-center py-10 px-4">
                  <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base font-medium text-gray-900">No bookings found</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {activeTab === 'upcoming'
                      ? "You don't have any upcoming bookings"
                      : activeTab === 'past'
                      ? "No past bookings found"
                      : "No bookings found matching your search"}
                  </p>
                  <Button
                    onClick={() => setBookingModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Booking
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Book Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold">Need a space urgently?</h3>
                <p className="text-blue-100 text-sm">Check real-time availability and book instantly</p>
              </div>
              <Button
                onClick={() => setBookingModalOpen(true)}
                className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto flex-shrink-0"
              >
                Find Available Spaces
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
