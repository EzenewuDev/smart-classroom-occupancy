'use client';

import React, { useState, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Room, STATUS_COLORS } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Thermometer, Droplets, DoorOpen, DoorClosed } from 'lucide-react';

interface FloorPlanProps {
  rooms: Room[];
  onRoomClick?: (room: Room) => void;
  selectedRoomId?: string;
}

const RoomRectangle = memo(function RoomRectangle({
  room,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  room: Room;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const getStatusColor = (status: Room['status']) => {
    const colors = {
      available: '#22c55e',
      occupied: '#ef4444',
      maintenance: '#eab308',
      cleaning: '#3b82f6',
    };
    return colors[status];
  };

  const getStatusOpacity = (status: Room['status']) => {
    const opacities = {
      available: 0.3,
      occupied: 0.5,
      maintenance: 0.4,
      cleaning: 0.4,
    };
    return opacities[status];
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: room.coordinates.x,
        top: room.coordinates.y,
        width: room.coordinates.width,
        height: room.coordinates.height,
      }}
      initial={false}
      animate={{
        scale: isSelected || isHovered ? 1.02 : 1,
      }}
      transition={{ duration: 0.15 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div
        className={`w-full h-full rounded-lg border-2 transition-all duration-150 ${
          isSelected ? 'ring-2 ring-offset-2 ring-primary' : ''
        }`}
        style={{
          backgroundColor: getStatusColor(room.status),
          opacity: getStatusOpacity(room.status),
          borderColor: getStatusColor(room.status),
        }}
      >
        {/* Room label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
          <span className="text-xs font-semibold text-gray-800 text-center leading-tight">
            {room.name}
          </span>
          <span className="text-xs text-gray-600 mt-0.5">
            {room.currentOccupancy}/{room.capacity}
          </span>
        </div>

        {/* Status indicator */}
        <div
          className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: getStatusColor(room.status) }}
        />
      </div>
    </motion.div>
  );
});

export const FloorPlan = memo(function FloorPlan({ rooms, onRoomClick, selectedRoomId }: FloorPlanProps) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const getStatusColor = (status: Room['status']) => {
    const colors = {
      available: '#22c55e',
      occupied: '#ef4444',
      maintenance: '#eab308',
      cleaning: '#3b82f6',
    };
    return colors[status];
  };

  const getStatusOpacity = (status: Room['status']) => {
    const opacities = {
      available: 0.3,
      occupied: 0.5,
      maintenance: 0.4,
      cleaning: 0.4,
    };
    return opacities[status];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
          Interactive Floor Plan - Science Block (Floor 1)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[500px] bg-gray-50 rounded-lg border overflow-hidden">
          {/* Grid background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, #000 1px, transparent 1px),
                linear-gradient(to bottom, #000 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Walls and corridors */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Outer walls */}
            <rect x="40" y="40" width="520" height="320" fill="none" stroke="#374151" strokeWidth="3" />
            
            {/* Main corridor */}
            <line x1="40" y1="180" x2="560" y2="180" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" />
            
            {/* Side corridor */}
            <line x1="240" y1="40" x2="240" y2="360" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" />
          </svg>

          {/* Room rectangles */}
          {rooms.map((room) => (
            <RoomRectangle
              key={room.id}
              room={room}
              isSelected={selectedRoomId === room.id}
              isHovered={hoveredRoom === room.id}
              onClick={() => onRoomClick?.(room)}
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
            />
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
            <div className="text-xs font-semibold mb-2 text-gray-700">Status Legend</div>
            <div className="space-y-1">
              {Object.entries(STATUS_COLORS).map(([status, colors]) => (
                <div key={status} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colors.bg.replace('100', '500')}`} />
                  <span className="text-xs capitalize text-gray-700">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Room details panel */}
        <AnimatePresence>
          {hoveredRoom && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 p-4 bg-gray-50 rounded-lg"
            >
              {(() => {
                const room = rooms.find(r => r.id === hoveredRoom);
                if (!room) return null;
                
                return (
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{room.name}</h4>
                      <p className="text-sm text-gray-600">{room.building} - Floor {room.floor}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {room.currentOccupancy} / {room.capacity} occupants
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
                    </div>
                    <Badge 
                      variant={room.status === 'available' ? 'default' : 'secondary'}
                      className={STATUS_COLORS[room.status].text}
                    >
                      {room.status === 'available' ? (
                        <DoorOpen className="w-3 h-3 mr-1" />
                      ) : (
                        <DoorClosed className="w-3 h-3 mr-1" />
                      )}
                      {room.status}
                    </Badge>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
});
