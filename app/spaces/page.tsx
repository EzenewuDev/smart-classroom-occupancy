'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { BookingModal } from '@/components/booking-modal';
import { mockRooms, ALL_BUILDINGS } from '@/lib/data';
import { Room } from '@/types';
import {
  Building2,
  Users,
  Thermometer,
  Search,
  Grid3X3,
  List,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  QrCode,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QRCode } from '@/components/qr-code';

const STATUS_CONFIG = {
  available: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Available', icon: CheckCircle2, dot: 'bg-green-500' },
  occupied: { color: 'bg-red-100 text-red-700 border-red-200', label: 'Occupied', icon: Users, dot: 'bg-red-500' },
  maintenance: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Maintenance', icon: AlertCircle, dot: 'bg-yellow-500' },
  cleaning: { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Cleaning', icon: Clock, dot: 'bg-blue-500' },
};

export default function SpacesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [detailRoom, setDetailRoom] = useState<Room | null>(null);

  const filteredRooms = mockRooms.filter(room => {
    const matchesBuilding = selectedBuilding === 'all' || room.building === selectedBuilding;
    const matchesStatus = selectedStatus === 'all' || room.status === selectedStatus;
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (room.department || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBuilding && matchesStatus && matchesSearch;
  });

  const stats = {
    total: mockRooms.length,
    available: mockRooms.filter(r => r.status === 'available').length,
    occupied: mockRooms.filter(r => r.status === 'occupied').length,
    maintenance: mockRooms.filter(r => r.status === 'maintenance').length,
  };

  const handleBookNow = (room: Room) => {
    setSelectedRoomForBooking(room);
    setBookingModalOpen(true);
  };

  const handleOpenBookingBrowse = () => {
    setSelectedRoomForBooking(null);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Spaces & Facilities</h1>
              <p className="text-gray-600 text-sm">Browse and manage university spaces across all buildings</p>
            </div>
            <Button
              onClick={handleOpenBookingBrowse}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              + New Booking
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Total Spaces', value: stats.total, textColor: 'text-blue-600' },
              { label: 'Available', value: stats.available, textColor: 'text-green-600' },
              { label: 'Occupied', value: stats.occupied, textColor: 'text-red-600' },
              { label: 'Maintenance', value: stats.maintenance, textColor: 'text-yellow-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
                <p className={`text-xl sm:text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border p-3 mb-5">
            <div className="flex flex-col gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rooms, buildings, departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Filter Row */}
              <div className="flex gap-2 flex-wrap">
                <select
                  value={selectedBuilding}
                  onChange={(e) => setSelectedBuilding(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm flex-1 min-w-[130px]"
                >
                  <option value="all">All Buildings</option>
                  {ALL_BUILDINGS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm flex-1 min-w-[120px]"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="cleaning">Cleaning</option>
                </select>
                <div className="flex border rounded-lg overflow-hidden flex-shrink-0">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                    title="Grid view"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                    title="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-3">
            Showing <span className="font-semibold text-gray-900">{filteredRooms.length}</span> of {stats.total} spaces
          </p>

          {/* Spaces Grid / List */}
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
            : 'space-y-3'
          }>
            {filteredRooms.map((room) => {
              const status = STATUS_CONFIG[room.status];
              const StatusIcon = status.icon;
              const occupancyPercent = Math.round((room.currentOccupancy / room.capacity) * 100);
              const canBook = room.status === 'available';

              if (viewMode === 'list') {
                return (
                  <div key={room.id} className="bg-white rounded-xl border hover:shadow-sm transition-shadow p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${canBook ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <Building2 className={`h-5 w-5 ${canBook ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900 text-sm">{room.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5 flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />{room.building} · F{room.floor}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />{room.currentOccupancy}/{room.capacity}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => setDetailRoom(room)}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700"
                          title="View Details"
                        >
                          <Info className="h-4 w-4" />
                        </button>
                        <Button
                          size="sm"
                          onClick={() => canBook && handleBookNow(room)}
                          disabled={!canBook}
                          className={canBook ? 'bg-blue-600 hover:bg-blue-700' : ''}
                          variant={canBook ? 'default' : 'outline'}
                        >
                          {canBook ? 'Book' : 'Unavailable'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={room.id} className="bg-white rounded-xl border hover:shadow-md transition-all p-4 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">{room.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{room.building} · Floor {room.floor}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ml-2 ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <Users className="h-3.5 w-3.5 mx-auto mb-1 text-gray-500" />
                      <p className="text-[10px] text-gray-500">Capacity</p>
                      <p className="font-semibold text-xs">{room.capacity}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <StatusIcon className="h-3.5 w-3.5 mx-auto mb-1 text-gray-500" />
                      <p className="text-[10px] text-gray-500">Occupied</p>
                      <p className="font-semibold text-xs">{room.currentOccupancy}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <Thermometer className="h-3.5 w-3.5 mx-auto mb-1 text-gray-500" />
                      <p className="text-[10px] text-gray-500">Temp</p>
                      <p className="font-semibold text-xs">{room.temperature ?? '-'}°C</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Occupancy</span>
                      <span className="font-medium">{occupancyPercent}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          occupancyPercent > 80 ? 'bg-red-500' : occupancyPercent > 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${occupancyPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* QR Code row */}
                  <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
                    <QRCode
                      value={JSON.stringify({ id: room.id, name: room.name, status: room.status, building: room.building })}
                      size={36}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-500 font-mono truncate">{room.id}</p>
                      <p className="text-[10px] text-gray-400">Scan to check availability</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button
                      className={`flex-1 text-sm ${canBook ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      disabled={!canBook}
                      variant={canBook ? 'default' : 'outline'}
                      onClick={() => canBook && handleBookNow(room)}
                    >
                      {canBook ? 'Book Now' : 'Unavailable'}
                    </Button>
                    <button
                      onClick={() => setDetailRoom(room)}
                      className="px-3 py-2 border rounded-lg hover:bg-gray-50 text-gray-500 hover:text-gray-700"
                      title="View Details"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredRooms.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border">
              <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No spaces found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          )}
        </main>
      </div>

      {/* Room Detail Side Panel */}
      {detailRoom && (
        <div className="fixed inset-0 z-[90] flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDetailRoom(null)} />
          <div className="relative bg-white w-full max-w-sm shadow-2xl overflow-y-auto">
            <div className="p-5 border-b flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900">
              <h3 className="text-base font-bold text-white">Room Details</h3>
              <button
                onClick={() => setDetailRoom(null)}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center"
              >
                <span className="text-white text-lg leading-none">×</span>
              </button>
            </div>
            <div className="p-5 space-y-5">
              {/* QR */}
              <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
                <QRCode
                  value={JSON.stringify({
                    id: detailRoom.id,
                    name: detailRoom.name,
                    building: detailRoom.building,
                    status: detailRoom.status,
                    capacity: detailRoom.capacity,
                    floor: detailRoom.floor,
                  })}
                  size={140}
                />
                <p className="text-xs text-gray-500 mt-2 font-mono">{detailRoom.id}</p>
                <p className="text-[11px] text-gray-400">Scan this QR to check room status</p>
              </div>

              {/* Info */}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{detailRoom.name}</h2>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <MapPin className="h-4 w-4" />
                  {detailRoom.building} · Floor {detailRoom.floor}
                </div>
                {detailRoom.department && (
                  <p className="text-sm text-blue-600 mt-1">{detailRoom.department}</p>
                )}
              </div>

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${STATUS_CONFIG[detailRoom.status].color}`}>
                {React.createElement(STATUS_CONFIG[detailRoom.status].icon, { className: 'h-4 w-4' })}
                {STATUS_CONFIG[detailRoom.status].label}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Users className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                  <p className="text-xs text-gray-500">Capacity</p>
                  <p className="font-bold text-gray-900">{detailRoom.capacity}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Users className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                  <p className="text-xs text-gray-500">Current</p>
                  <p className="font-bold text-gray-900">{detailRoom.currentOccupancy}</p>
                </div>
                {detailRoom.temperature && (
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <Thermometer className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                    <p className="text-xs text-gray-500">Temperature</p>
                    <p className="font-bold text-gray-900">{detailRoom.temperature}°C</p>
                  </div>
                )}
                {detailRoom.humidity && (
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                    <p className="text-xs text-gray-500">Humidity</p>
                    <p className="font-bold text-gray-900">{detailRoom.humidity}%</p>
                  </div>
                )}
              </div>

              {detailRoom.status === 'available' ? (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setDetailRoom(null);
                    handleBookNow(detailRoom);
                  }}
                >
                  Book This Room
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Not Available for Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setSelectedRoomForBooking(null);
        }}
        preSelectedRoom={selectedRoomForBooking}
      />
    </div>
  );
}
