'use client';

import React, { useState, Suspense, lazy } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { BookingModal } from '@/components/booking-modal';
import { mockRooms, mockBookings, LEAD_CITY_DEPARTMENTS } from '@/lib/data';
import { Room } from '@/types';
import { Filter, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

// Lazy load heavy components
const FloorPlan = lazy(() => import('@/components/floor-plan').then(m => ({ default: m.FloorPlan })));
const StatisticsPanel = lazy(() => import('@/components/statistics-panel').then(m => ({ default: m.StatisticsPanel })));
const RoomList = lazy(() => import('@/components/room-list').then(m => ({ default: m.RoomList })));
const OccupancyChart = lazy(() => import('@/components/occupancy-chart').then(m => ({ default: m.OccupancyChart })));

// Loading fallback
const CardSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg h-64 w-full" />
);

export default function Dashboard() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingRoom, setBookingRoom] = useState<Room | null>(null);

  const departments = LEAD_CITY_DEPARTMENTS;

  // Filter rooms by department using the actual department field
  const filteredRooms = selectedDepartment
    ? mockRooms.filter(r => r.department === selectedDepartment)
    : mockRooms;

  const handleBookRoom = (room?: Room) => {
    setBookingRoom(room || null);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 lg:ml-0 p-4 sm:p-6 lg:p-8 min-w-0">
          {/* Welcome & Quick Actions */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Welcome back, Guest
                </h1>
                <p className="text-sm text-gray-500">
                  CampusFlow • Dashboard
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBookRoom()}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  Book Room
                </button>
                <Link
                  href="/schedule"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-white border text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <Clock className="h-4 w-4" />
                  My Schedule
                </Link>
              </div>
            </div>
          </div>

          {/* Department Filter */}
          <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex-shrink-0 bg-white border rounded-lg p-2 mr-1">
              <Filter className="h-4 w-4 text-gray-500" />
            </div>
            <button
              onClick={() => setSelectedDepartment('')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border shadow-sm ${
                selectedDepartment === ''
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              All Departments
            </button>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border shadow-sm ${
                  selectedDepartment === dept
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {dept.replace('College of ', '')}
              </button>
            ))}
          </div>

          {/* Statistics Overview */}
          <section className="mb-8">
            <Suspense fallback={<CardSkeleton />}>
              <StatisticsPanel rooms={filteredRooms} bookings={mockBookings} />
            </Suspense>
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Floor Plan - Takes up 2 columns */}
            <div className="xl:col-span-2 space-y-8">
              <Suspense fallback={<CardSkeleton />}>
                <FloorPlan
                  rooms={filteredRooms}
                  selectedRoomId={selectedRoom?.id}
                  onRoomClick={setSelectedRoom}
                />
              </Suspense>

              <Suspense fallback={<CardSkeleton />}>
                <OccupancyChart />
              </Suspense>
            </div>

            {/* Room List - Takes up 1 column */}
            <div className="xl:col-span-1">
              <Suspense fallback={<CardSkeleton />}>
                <RoomList
                  rooms={filteredRooms}
                  selectedRoomId={selectedRoom?.id}
                  onRoomClick={setSelectedRoom}
                />
              </Suspense>
            </div>
          </div>

          {/* Selected Room Details */}
          {selectedRoom && (
            <section className="mt-8">
              <div className="bg-white rounded-xl border p-5 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Room Details: {selectedRoom.name}</h2>
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 text-sm mb-1">Location</h3>
                    <p className="text-gray-600 text-sm">{selectedRoom.building}</p>
                    <p className="text-gray-600 text-sm">Floor {selectedRoom.floor}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 text-sm mb-1">Capacity</h3>
                    <p className="text-gray-600 text-sm">{selectedRoom.currentOccupancy} / {selectedRoom.capacity} people</p>
                    <p className="text-gray-600 text-sm">
                      {Math.round((selectedRoom.currentOccupancy / selectedRoom.capacity) * 100)}% occupied
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 text-sm mb-1">Environment</h3>
                    {selectedRoom.temperature && (
                      <p className="text-gray-600 text-sm">Temperature: {selectedRoom.temperature}°C</p>
                    )}
                    {selectedRoom.humidity && (
                      <p className="text-gray-600 text-sm">Humidity: {selectedRoom.humidity}%</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleBookRoom(selectedRoom)}
                    disabled={selectedRoom.status !== 'available'}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Book Room
                  </button>
                  <Link
                    href="/schedule"
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Schedule
                  </Link>
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                    onClick={() => setSelectedRoom(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setBookingRoom(null);
        }}
        preSelectedRoom={bookingRoom?.status === 'available' ? bookingRoom : null}
      />
    </div>
  );
}
