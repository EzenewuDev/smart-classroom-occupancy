'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Room, Booking } from '@/types';
import { 
  Users, 
  DoorOpen, 
  DoorClosed, 
  Wrench, 
  Sparkles,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface StatisticsPanelProps {
  rooms: Room[];
  bookings: Booking[];
}

export function StatisticsPanel({ rooms, bookings }: StatisticsPanelProps) {
  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
    cleaning: rooms.filter(r => r.status === 'cleaning').length,
    totalOccupancy: rooms.reduce((sum, r) => sum + r.currentOccupancy, 0),
    totalCapacity: rooms.reduce((sum, r) => sum + r.capacity, 0),
    upcomingBookings: bookings.filter(b => b.status === 'confirmed' && new Date(b.startTime) > new Date()).length,
  };

  const utilizationRate = Math.round((stats.totalOccupancy / stats.totalCapacity) * 100);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
          <CardTitle className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Available</CardTitle>
          <DoorOpen className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.available}</div>
          <p className="text-[9px] sm:text-xs text-muted-foreground truncate">
            of {stats.total} rooms
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
          <CardTitle className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Occupied</CardTitle>
          <DoorClosed className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="text-lg sm:text-2xl font-bold text-red-600">{stats.occupied}</div>
          <p className="text-[9px] sm:text-xs text-muted-foreground truncate">
            {stats.totalOccupancy} people
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
          <CardTitle className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Utilization</CardTitle>
          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="text-lg sm:text-2xl font-bold text-blue-600">{utilizationRate}%</div>
          <p className="text-[9px] sm:text-xs text-muted-foreground truncate">
            {stats.totalOccupancy}/{stats.totalCapacity} cap.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
          <CardTitle className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Bookings</CardTitle>
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="text-lg sm:text-2xl font-bold text-purple-600">{stats.upcomingBookings}</div>
          <p className="text-[9px] sm:text-xs text-muted-foreground truncate">
            confirmed
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
          <CardTitle className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Maint.</CardTitle>
          <Wrench className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.maintenance}</div>
          <p className="text-[9px] sm:text-xs text-muted-foreground truncate">
            under maintenance
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
          <CardTitle className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Cleaning</CardTitle>
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="text-lg sm:text-2xl font-bold text-blue-400">{stats.cleaning}</div>
          <p className="text-[9px] sm:text-xs text-muted-foreground truncate">
            being cleaned
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
