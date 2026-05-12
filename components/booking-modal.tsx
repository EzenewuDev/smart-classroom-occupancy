'use client';

import React, { useState, useEffect } from 'react';
import { Room, Booking } from '@/types';
import { mockRooms, mockBookings, LEAD_CITY_DEPARTMENTS, ALL_BUILDINGS } from '@/lib/data';
import { QRCode } from '@/components/qr-code';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Building2,
  Search,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedRoom?: Room | null;
}

type Step = 'choose' | 'qr-scan' | 'select-room' | 'form' | 'success';

const STATUS_CONFIG = {
  available: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Available', icon: CheckCircle2 },
  occupied: { color: 'bg-red-100 text-red-700 border-red-200', label: 'Occupied', icon: Users },
  maintenance: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Maintenance', icon: AlertCircle },
  cleaning: { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Cleaning', icon: Clock },
};

export function BookingModal({ isOpen, onClose, preSelectedRoom }: BookingModalProps) {
  const [step, setStep] = useState<Step>('choose');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(preSelectedRoom || null);
  const [qrRoom, setQrRoom] = useState<Room | null>(null);
  const [qrRoomId, setQrRoomId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    purpose: '',
    date: '',
    startTime: '',
    endTime: '',
    attendees: '',
    department: '',
    notes: '',
  });

  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: today }));
  }, []);

  // If a room is pre-selected (e.g., from Book Now), skip to form
  useEffect(() => {
    if (preSelectedRoom && isOpen) {
      setSelectedRoom(preSelectedRoom);
      setStep('form');
    }
  }, [preSelectedRoom, isOpen]);

  const handleClose = () => {
    setStep('choose');
    setSelectedRoom(null);
    setQrRoom(null);
    setQrRoomId('');
    setSearchQuery('');
    setSelectedBuilding('all');
    setFormData({ purpose: '', date: new Date().toISOString().split('T')[0], startTime: '', endTime: '', attendees: '', department: '', notes: '' });
    onClose();
  };

  const handleQrLookup = () => {
    const room = mockRooms.find(r =>
      r.id === qrRoomId.trim() ||
      r.name.toLowerCase().includes(qrRoomId.toLowerCase()) ||
      qrRoomId.toLowerCase().includes(r.id)
    );
    if (room) {
      setQrRoom(room);
    } else {
      setQrRoom(null);
    }
  };

  const filteredRooms = mockRooms.filter(room => {
    const matchBuilding = selectedBuilding === 'all' || room.building === selectedBuilding;
    const matchSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (room.department || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchBuilding && matchSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate booking submission
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl max-h-[95vh] overflow-hidden flex flex-col rounded-t-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {step === 'choose' && 'Book a Room'}
                {step === 'qr-scan' && 'Check Room via QR'}
                {step === 'select-room' && 'Choose a Room'}
                {step === 'form' && (selectedRoom ? `Book: ${selectedRoom.name}` : 'Room Details')}
                {step === 'success' && 'Booking Confirmed!'}
              </h2>
              <p className="text-xs text-blue-100">CampusFlow · Lead City University</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">

          {/* STEP: Choose */}
          {step === 'choose' && (
            <div className="p-5 space-y-3">
              <p className="text-sm text-gray-500 mb-4">How would you like to book a room?</p>
              <button
                onClick={() => setStep('select-room')}
                className="w-full flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-left transition-all group"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Browse & Select Room</p>
                  <p className="text-sm text-gray-500">Search through available rooms and book</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>

              <button
                onClick={() => setStep('qr-scan')}
                className="w-full flex items-center gap-4 p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-left transition-all group"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <QrCode className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Check Room via QR Code</p>
                  <p className="text-sm text-gray-500">Scan or enter a room ID to check availability</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </button>
            </div>
          )}

          {/* STEP: QR Scan */}
          {step === 'qr-scan' && (
            <div className="p-5">
              <button onClick={() => setStep('choose')} className="text-sm text-blue-600 mb-4 flex items-center gap-1 hover:underline">
                ← Back
              </button>
              <p className="text-sm text-gray-600 mb-4">
                Each classroom has a QR code on its door. Enter the room ID shown below the QR code, or type the room name to check availability instantly.
              </p>

              {/* Example QR display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {mockRooms.slice(0, 4).map(room => {
                  const qrData = JSON.stringify({
                    id: room.id,
                    name: room.name,
                    building: room.building,
                    status: room.status,
                    capacity: room.capacity,
                    available: room.status === 'available',
                  });
                  const status = STATUS_CONFIG[room.status];
                  const StatusIcon = status.icon;
                  return (
                    <div key={room.id} className="border rounded-xl p-3 flex gap-3 items-start">
                      <QRCode value={qrData} size={80} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">{room.name}</p>
                        <p className="text-xs text-gray-500 truncate">{room.building}</p>
                        <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium border ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                        <p className="text-[10px] text-gray-400 mt-1 font-mono">{room.id}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter room ID or room name (e.g. room-202)"
                  value={qrRoomId}
                  onChange={e => setQrRoomId(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleQrLookup()}
                  className="flex-1 px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button onClick={handleQrLookup} className="bg-blue-600 hover:bg-blue-700 rounded-xl">
                  Check
                </Button>
              </div>

              {qrRoomId && qrRoom === null && (
                <p className="mt-3 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" /> Room not found. Try a different ID or name.
                </p>
              )}

              {qrRoom && (
                <div className="mt-4 border-2 border-blue-200 rounded-xl p-4 bg-blue-50">
                  <div className="flex gap-4 items-start">
                    <QRCode value={JSON.stringify({ id: qrRoom.id, name: qrRoom.name, status: qrRoom.status })} size={100} />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{qrRoom.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                        <MapPin className="h-3 w-3" />
                        {qrRoom.building} · Floor {qrRoom.floor}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                        <Users className="h-3 w-3" />
                        Capacity: {qrRoom.capacity} · Current: {qrRoom.currentOccupancy}
                      </div>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${STATUS_CONFIG[qrRoom.status].color}`}>
                        {React.createElement(STATUS_CONFIG[qrRoom.status].icon, { className: 'h-4 w-4' })}
                        {STATUS_CONFIG[qrRoom.status].label}
                      </span>
                    </div>
                  </div>
                  {qrRoom.status === 'available' && (
                    <Button
                      className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        setSelectedRoom(qrRoom);
                        setStep('form');
                      }}
                    >
                      Book This Room
                    </Button>
                  )}
                  {qrRoom.status !== 'available' && (
                    <p className="mt-3 text-center text-sm text-gray-500">
                      This room is currently not available for booking.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP: Select Room */}
          {step === 'select-room' && (
            <div className="p-5">
              <button onClick={() => setStep('choose')} className="text-sm text-blue-600 mb-4 flex items-center gap-1 hover:underline">
                ← Back
              </button>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={selectedBuilding}
                  onChange={e => setSelectedBuilding(e.target.value)}
                  className="px-3 py-2.5 border rounded-xl text-sm"
                >
                  <option value="all">All Buildings</option>
                  {ALL_BUILDINGS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                {filteredRooms.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No rooms match your search</p>
                )}
                {filteredRooms.map(room => {
                  const status = STATUS_CONFIG[room.status];
                  const StatusIcon = status.icon;
                  const canBook = room.status === 'available';
                  return (
                    <div
                      key={room.id}
                      onClick={() => canBook && setSelectedRoom(room)}
                      className={`flex items-center gap-3 p-3 border rounded-xl transition-all ${
                        canBook ? 'cursor-pointer hover:border-blue-400 hover:bg-blue-50' : 'opacity-60 cursor-not-allowed'
                      } ${selectedRoom?.id === room.id ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        canBook ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Building2 className={`h-5 w-5 ${canBook ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900">{room.name}</p>
                        <p className="text-xs text-gray-500 truncate">{room.building} · Floor {room.floor} · Cap: {room.capacity}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {selectedRoom && (
                <Button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setStep('form')}
                >
                  Continue with {selectedRoom.name}
                </Button>
              )}
            </div>
          )}

          {/* STEP: Form */}
          {step === 'form' && selectedRoom && (
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <button
                type="button"
                onClick={() => {
                  if (preSelectedRoom) {
                    handleClose();
                  } else {
                    setStep('select-room');
                    setSelectedRoom(null);
                  }
                }}
                className="text-sm text-blue-600 flex items-center gap-1 hover:underline"
              >
                ← Back
              </button>

              {/* Selected Room Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <QRCode
                  value={JSON.stringify({ id: selectedRoom.id, name: selectedRoom.name, status: selectedRoom.status, url: `https://campusflow.lcu.edu.ng/rooms/${selectedRoom.id}` })}
                  size={72}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900">{selectedRoom.name}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" />
                    {selectedRoom.building} · Floor {selectedRoom.floor}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Users className="h-3 w-3" />
                    Capacity: {selectedRoom.capacity} people
                  </p>
                  <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs font-medium border bg-green-100 text-green-700 border-green-200">
                    <CheckCircle2 className="h-3 w-3" />
                    Available
                  </span>
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Department Meeting, Lecture, Study Group"
                  value={formData.purpose}
                  onChange={e => setFormData(p => ({ ...p, purpose: e.target.value }))}
                  className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="time"
                      required
                      value={formData.startTime}
                      onChange={e => setFormData(p => ({ ...p, startTime: e.target.value }))}
                      className="w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="time"
                      required
                      value={formData.endTime}
                      onChange={e => setFormData(p => ({ ...p, endTime: e.target.value }))}
                      className="w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Attendees + Department */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      max={selectedRoom.capacity}
                      placeholder="Count"
                      value={formData.attendees}
                      onChange={e => setFormData(p => ({ ...p, attendees: e.target.value }))}
                      className="w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={e => setFormData(p => ({ ...p, department: e.target.value }))}
                    className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    {LEAD_CITY_DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  placeholder="Any special requirements or notes..."
                  value={formData.notes}
                  onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base font-semibold rounded-xl"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Confirming Booking...
                  </span>
                ) : (
                  'Confirm Booking'
                )}
              </Button>
            </form>
          )}

          {/* STEP: Success */}
          {step === 'success' && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-500 mb-6">
                Your room has been successfully booked. You'll receive a confirmation at your email.
              </p>

              {selectedRoom && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6 flex flex-col items-center">
                  <QRCode
                    value={JSON.stringify({
                      id: selectedRoom.id,
                      name: selectedRoom.name,
                      building: selectedRoom.building,
                      date: formData.date,
                      time: `${formData.startTime} - ${formData.endTime}`,
                      purpose: formData.purpose,
                      bookedAt: new Date().toISOString(),
                    })}
                    size={140}
                    className="mb-3"
                  />
                  <p className="text-sm text-gray-600 font-medium">{selectedRoom.name}</p>
                  <p className="text-xs text-gray-500">{selectedRoom.building}</p>
                  <p className="text-xs text-gray-500">{formData.date} · {formData.startTime} – {formData.endTime}</p>
                  <p className="text-[11px] text-gray-400 mt-2">Show this QR code at the room entrance</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setStep('choose');
                    setSelectedRoom(null);
                    setQrRoom(null);
                    setFormData({ purpose: '', date: new Date().toISOString().split('T')[0], startTime: '', endTime: '', attendees: '', department: '', notes: '' });
                  }}
                >
                  New Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
