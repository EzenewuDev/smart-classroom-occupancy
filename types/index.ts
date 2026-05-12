export interface Room {
  id: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  currentOccupancy: number;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  department?: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  sensors: Sensor[];
  lastUpdated: Date;
  temperature?: number;
  humidity?: number;
  nextBooking?: Booking;
}

export interface Sensor {
  id: string;
  type: 'motion' | 'door' | 'camera' | 'temperature' | 'humidity';
  status: 'active' | 'inactive' | 'error';
  lastReading?: Date;
  value?: number;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  startTime: Date;
  endTime: Date;
  purpose: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface OccupancyData {
  timestamp: Date;
  roomId: string;
  occupancyCount: number;
  confidence: number;
}

export interface FloorPlan {
  id: string;
  building: string;
  floor: number;
  rooms: Room[];
  svgPath: string;
}

export type OccupancyStatus = 'available' | 'occupied' | 'maintenance' | 'cleaning';

export const STATUS_COLORS: Record<OccupancyStatus, { bg: string; border: string; text: string }> = {
  available: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800' },
  occupied: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-800' },
  maintenance: { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-800' },
  cleaning: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800' },
};
