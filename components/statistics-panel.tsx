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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
          <DoorOpen className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.available}</div>
          <p className="text-xs text-muted-foreground">
            of {stats.total} total rooms
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupied Rooms</CardTitle>
          <DoorClosed className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.occupied}</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalOccupancy} people currently
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{utilizationRate}%</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalOccupancy} / {stats.totalCapacity} capacity
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{stats.upcomingBookings}</div>
          <p className="text-xs text-muted-foreground">
            confirmed reservations
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
          <Wrench className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{stats.maintenance}</div>
          <p className="text-xs text-muted-foreground">
            rooms under maintenance
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cleaning</CardTitle>
          <Sparkles className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.cleaning}</div>
          <p className="text-xs text-muted-foreground">
            rooms being cleaned
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Campus Occupancy</CardTitle>
          <Users className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalOccupancy}</div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${utilizationRate}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.totalOccupancy} / {stats.totalCapacity} total capacity ({utilizationRate}%)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
