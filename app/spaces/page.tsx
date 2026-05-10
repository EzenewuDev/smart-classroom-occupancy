'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { AuthGuard } from '@/components/auth-guard';
import { useAuth } from '@/context/auth-context';
import { mockRooms, mockBookings } from '@/lib/data';
import { Room } from '@/types';
import { 
  Building2, 
  Users, 
  Thermometer, 
  Search,
  Filter,
  Grid3X3,
  List,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const STATUS_CONFIG = {
  available: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Available', icon: CheckCircle2 },
  occupied: { color: 'bg-red-100 text-red-700 border-red-200', label: 'Occupied', icon: Users },
  maintenance: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Maintenance', icon: AlertCircle },
  cleaning: { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Cleaning', icon: Clock },
};

export default function SpacesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { user, departments } = useAuth();

  const buildings = ['Science Block', 'Arts Block', 'Engineering Block', 'Library', 'Admin Block'];

  const filteredRooms = mockRooms.filter(room => {
    const matchesBuilding = selectedBuilding === 'all' || room.building === selectedBuilding;
    const matchesStatus = selectedStatus === 'all' || room.status === selectedStatus;
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.building.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBuilding && matchesStatus && matchesSearch;
  });

  const stats = {
    total: mockRooms.length,
    available: mockRooms.filter(r => r.status === 'available').length,
    occupied: mockRooms.filter(r => r.status === 'occupied').length,
    maintenance: mockRooms.filter(r => r.status === 'maintenance').length,
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Spaces & Facilities</h1>
              <p className="text-gray-600">Browse and manage university spaces</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Spaces', value: stats.total, color: 'bg-blue-600' },
                { label: 'Available', value: stats.available, color: 'bg-green-600' },
                { label: 'Occupied', value: stats.occupied, color: 'bg-red-600' },
                { label: 'Maintenance', value: stats.maintenance, color: 'bg-yellow-600' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg border p-4">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color.replace('bg-', 'text-')}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search spaces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedBuilding}
                    onChange={(e) => setSelectedBuilding(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="all">All Buildings</option>
                    {buildings.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="cleaning">Cleaning</option>
                  </select>
                  <div className="flex border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                    >
                      <Grid3X3 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Spaces Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
              {filteredRooms.map((room) => {
                const status = STATUS_CONFIG[room.status];
                const StatusIcon = status.icon;
                const occupancyPercent = Math.round((room.currentOccupancy / room.capacity) * 100);
                
                return (
                  <div key={room.id} className="bg-white rounded-lg border hover:shadow-md transition-shadow p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{room.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-3 w-3" />
                          {room.building} • Floor {room.floor}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <Users className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                        <p className="text-xs text-gray-500">Capacity</p>
                        <p className="font-semibold text-sm">{room.capacity}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <StatusIcon className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                        <p className="text-xs text-gray-500">Occupied</p>
                        <p className="font-semibold text-sm">{room.currentOccupancy}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <Thermometer className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                        <p className="text-xs text-gray-500">Temp</p>
                        <p className="font-semibold text-sm">{room.temperature || '-'}°C</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Occupancy</span>
                        <span className="font-medium">{occupancyPercent}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            occupancyPercent > 80 ? 'bg-red-500' : occupancyPercent > 50 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${occupancyPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        disabled={room.status !== 'available'}
                      >
                        Book Now
                      </Button>
                      <Button variant="outline" className="px-3">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredRooms.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border">
                <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No spaces found</h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
