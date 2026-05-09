'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Room, STATUS_COLORS } from '@/types';
import { 
  Users, 
  Thermometer, 
  Droplets, 
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface RoomListProps {
  rooms: Room[];
  onRoomClick?: (room: Room) => void;
  selectedRoomId?: string;
}

export function RoomList({ rooms, onRoomClick, selectedRoomId }: RoomListProps) {
  const sortedRooms = [...rooms].sort((a, b) => {
    // Sort by status priority: available > occupied > cleaning > maintenance
    const priority = { available: 0, occupied: 1, cleaning: 2, maintenance: 3 };
    return priority[a.status] - priority[b.status];
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Room Status</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
          {sortedRooms.map((room) => {
            const isSelected = selectedRoomId === room.id;
            const statusColors = STATUS_COLORS[room.status];
            const occupancyPercent = Math.round((room.currentOccupancy / room.capacity) * 100);

            return (
              <div
                key={room.id}
                className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                  isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => onRoomClick?.(room)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {room.name}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${statusColors.bg} ${statusColors.text} ${statusColors.border}`}
                      >
                        {room.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1">
                      <MapPin className="inline w-3 h-3 mr-1" />
                      {room.building} - Floor {room.floor}
                    </p>

                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {room.currentOccupancy}/{room.capacity}
                        <span className="text-xs text-gray-400">({occupancyPercent}%)</span>
                      </span>
                      
                      {room.temperature && (
                        <span className="flex items-center gap-1">
                          <Thermometer className="w-4 h-4" />
                          {room.temperature}°C
                        </span>
                      )}
                      
                      {room.humidity && (
                        <span className="flex items-center gap-1">
                          <Droplets className="w-4 h-4" />
                          {room.humidity}%
                        </span>
                      )}
                    </div>

                    {/* Occupancy bar */}
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            occupancyPercent > 80 ? 'bg-red-500' : 
                            occupancyPercent > 50 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(occupancyPercent, 100)}%` }}
                        />
                      </div>
                    </div>

                    {room.nextBooking && (
                      <p className="text-xs text-gray-500 mt-2">
                        <Clock className="inline w-3 h-3 mr-1" />
                        Next booking: {new Date(room.nextBooking.startTime).toLocaleTimeString()}
                      </p>
                    )}
                  </div>

                  <Button variant="ghost" size="sm" className="ml-2">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
