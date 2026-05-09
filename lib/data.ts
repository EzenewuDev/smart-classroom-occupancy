import { Room, FloorPlan, Booking, Sensor } from '@/types';

export const mockSensors: Sensor[] = [
  { id: 'motion-001', type: 'motion', status: 'active', lastReading: new Date() },
  { id: 'door-001', type: 'door', status: 'active', lastReading: new Date() },
  { id: 'temp-001', type: 'temperature', status: 'active', value: 22.5, lastReading: new Date() },
  { id: 'hum-001', type: 'humidity', status: 'active', value: 45, lastReading: new Date() },
];

export const mockRooms: Room[] = [
  {
    id: 'room-101',
    name: 'Lecture Hall A',
    building: 'Science Block',
    floor: 1,
    capacity: 120,
    currentOccupancy: 85,
    status: 'occupied',
    coordinates: { x: 50, y: 50, width: 200, height: 120 },
    sensors: mockSensors,
    lastUpdated: new Date(),
    temperature: 22.5,
    humidity: 45,
  },
  {
    id: 'room-102',
    name: 'Seminar Room B',
    building: 'Science Block',
    floor: 1,
    capacity: 40,
    currentOccupancy: 0,
    status: 'available',
    coordinates: { x: 280, y: 50, width: 150, height: 100 },
    sensors: mockSensors.map(s => ({ ...s, id: s.id.replace('001', '002') })),
    lastUpdated: new Date(),
    temperature: 21.0,
    humidity: 42,
  },
  {
    id: 'room-103',
    name: 'Lab 1',
    building: 'Science Block',
    floor: 1,
    capacity: 30,
    currentOccupancy: 25,
    status: 'occupied',
    coordinates: { x: 50, y: 200, width: 180, height: 100 },
    sensors: mockSensors.map(s => ({ ...s, id: s.id.replace('001', '003') })),
    lastUpdated: new Date(),
    temperature: 23.0,
    humidity: 50,
  },
  {
    id: 'room-104',
    name: 'Lab 2',
    building: 'Science Block',
    floor: 1,
    capacity: 30,
    currentOccupancy: 0,
    status: 'maintenance',
    coordinates: { x: 250, y: 200, width: 180, height: 100 },
    sensors: mockSensors.map(s => ({ ...s, id: s.id.replace('001', '004'), status: 'inactive' as const })),
    lastUpdated: new Date(),
  },
  {
    id: 'room-105',
    name: 'Study Room 1',
    building: 'Science Block',
    floor: 1,
    capacity: 12,
    currentOccupancy: 8,
    status: 'occupied',
    coordinates: { x: 440, y: 50, width: 90, height: 70 },
    sensors: mockSensors.map(s => ({ ...s, id: s.id.replace('001', '005') })),
    lastUpdated: new Date(),
    temperature: 21.5,
    humidity: 40,
  },
  {
    id: 'room-106',
    name: 'Study Room 2',
    building: 'Science Block',
    floor: 1,
    capacity: 12,
    currentOccupancy: 0,
    status: 'available',
    coordinates: { x: 440, y: 130, width: 90, height: 70 },
    sensors: mockSensors.map(s => ({ ...s, id: s.id.replace('001', '006') })),
    lastUpdated: new Date(),
    temperature: 21.0,
    humidity: 38,
  },
  {
    id: 'room-107',
    name: 'Conference Room',
    building: 'Science Block',
    floor: 1,
    capacity: 20,
    currentOccupancy: 0,
    status: 'cleaning',
    coordinates: { x: 440, y: 210, width: 100, height: 90 },
    sensors: mockSensors.map(s => ({ ...s, id: s.id.replace('001', '007') })),
    lastUpdated: new Date(),
  },
];

export const floorPlans: FloorPlan[] = [
  {
    id: 'fp-1-1',
    building: 'Science Block',
    floor: 1,
    rooms: mockRooms,
    svgPath: '',
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'book-001',
    roomId: 'room-102',
    userId: 'user-001',
    userName: 'Dr. Sarah Johnson',
    startTime: new Date(Date.now() + 3600000),
    endTime: new Date(Date.now() + 7200000),
    purpose: 'Department Meeting',
    status: 'confirmed',
  },
  {
    id: 'book-002',
    roomId: 'room-106',
    userId: 'user-002',
    userName: 'Prof. Michael Chen',
    startTime: new Date(Date.now() + 1800000),
    endTime: new Date(Date.now() + 5400000),
    purpose: 'Student Consultation',
    status: 'confirmed',
  },
];

export function getRoomById(id: string): Room | undefined {
  return mockRooms.find(room => room.id === id);
}

export function getRoomsByStatus(status: Room['status']): Room[] {
  return mockRooms.filter(room => room.status === status);
}

export function getTotalOccupancy(): number {
  return mockRooms.reduce((sum, room) => sum + room.currentOccupancy, 0);
}

export function getTotalCapacity(): number {
  return mockRooms.reduce((sum, room) => sum + room.capacity, 0);
}

export function getUtilizationRate(): number {
  return Math.round((getTotalOccupancy() / getTotalCapacity()) * 100);
}
