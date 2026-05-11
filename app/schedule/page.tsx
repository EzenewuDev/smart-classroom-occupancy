'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Search,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const TIME_SLOTS = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

const MOCK_SCHEDULE = [
  {
    id: 'sched-001',
    day: 0,
    startTime: '9:00 AM',
    endTime: '11:00 AM',
    course: 'Introduction to Computer Science',
    code: 'CSC 101',
    room: 'Lecture Hall A',
    building: 'Science Block',
    lecturer: 'Dr. Sarah Johnson',
    type: 'Lecture',
    department: 'College of Engineering',
  },
  {
    id: 'sched-002',
    day: 0,
    startTime: '2:00 PM',
    endTime: '4:00 PM',
    course: 'Data Structures',
    code: 'CSC 201',
    room: 'Lab 1',
    building: 'Science Block',
    lecturer: 'Prof. Michael Chen',
    type: 'Lab',
    department: 'College of Engineering',
  },
  {
    id: 'sched-003',
    day: 1,
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    course: 'Database Management',
    code: 'CSC 301',
    room: 'Seminar Room B',
    building: 'Science Block',
    lecturer: 'Dr. Emily Davis',
    type: 'Lecture',
    department: 'College of Engineering',
  },
  {
    id: 'sched-004',
    day: 2,
    startTime: '9:00 AM',
    endTime: '11:00 AM',
    course: 'Software Engineering',
    code: 'CSC 401',
    room: 'Lecture Hall A',
    building: 'Science Block',
    lecturer: 'Prof. James Wilson',
    type: 'Lecture',
    department: 'College of Engineering',
  },
  {
    id: 'sched-005',
    day: 3,
    startTime: '1:00 PM',
    endTime: '3:00 PM',
    course: 'Artificial Intelligence',
    code: 'CSC 501',
    room: 'Lab 2',
    building: 'Science Block',
    lecturer: 'Dr. Lisa Anderson',
    type: 'Lab',
    department: 'College of Engineering',
  },
  {
    id: 'sched-006',
    day: 4,
    startTime: '11:00 AM',
    endTime: '1:00 PM',
    course: 'Cybersecurity',
    code: 'CSC 450',
    room: 'Conference Room',
    building: 'Science Block',
    lecturer: 'Prof. Robert Taylor',
    type: 'Seminar',
    department: 'College of Engineering',
  },
];

export default function SchedulePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'week' | 'list'>('week');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const upcomingClasses = MOCK_SCHEDULE.filter(s => s.day >= 0).slice(0, 3);
  
  const todayClasses = MOCK_SCHEDULE.filter(s => s.day === 0);

  return (
    <div className="min-h-screen bg-gray-50">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Class Schedule</h1>
                <p className="text-gray-600">CampusFlow • Academic Session 2025/2026</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="hidden sm:flex">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Class
                </Button>
              </div>
            </div>

            {/* View Toggle */}
            <div className="bg-white rounded-lg border p-1 mb-6 inline-flex">
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'week' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Week View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                List View
              </button>
            </div>

            {/* Week View */}
            {viewMode === 'week' && (
              <div className="bg-white rounded-lg border overflow-hidden mb-6">
                <div className="grid grid-cols-6 border-b">
                  <div className="p-4 border-r bg-gray-50">
                    <span className="text-sm font-medium text-gray-500">Time</span>
                  </div>
                  {WEEK_DAYS.map((day, idx) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(selectedDay === idx ? null : idx)}
                      className={`p-4 text-center transition-colors ${
                        selectedDay === idx ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-semibold text-gray-900">{day}</p>
                      <p className="text-xs text-gray-500">
                        {idx === 0 ? 'Today' : `May ${10 + idx}`}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="divide-y">
                  {TIME_SLOTS.map((time) => (
                    <div key={time} className="grid grid-cols-6 min-h-[80px]">
                      <div className="p-3 border-r bg-gray-50 text-sm text-gray-500">
                        {time}
                      </div>
                      {WEEK_DAYS.map((_, dayIdx) => {
                        const classItem = MOCK_SCHEDULE.find(
                          s => s.day === dayIdx && s.startTime === time
                        );
                        
                        return (
                          <div key={dayIdx} className="p-2 border-r last:border-r-0 relative">
                            {classItem && (
                              <div className="bg-blue-100 border-l-4 border-blue-500 rounded-r p-2 h-full cursor-pointer hover:bg-blue-200 transition-colors">
                                <p className="text-xs font-semibold text-blue-900 truncate">{classItem.code}</p>
                                <p className="text-xs text-blue-700 truncate">{classItem.course}</p>
                                <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {classItem.room}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="bg-white rounded-lg border divide-y mb-6">
                {MOCK_SCHEDULE.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-lg flex flex-col items-center justify-center">
                        <span className="text-xs text-blue-600 font-medium">{WEEK_DAYS[item.day]}</span>
                        <span className="text-sm font-bold text-blue-900">{10 + item.day}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.course}</h3>
                            <p className="text-sm text-gray-500">{item.code} • {item.type}</p>
                          </div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {item.startTime} - {item.endTime}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {item.room}, {item.building}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {item.lecturer}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Today's Classes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Today's Classes
                </h3>
                {todayClasses.length > 0 ? (
                  <div className="space-y-3">
                    {todayClasses.map((cls) => (
                      <div key={cls.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{cls.code}</p>
                          <p className="text-sm text-gray-500">{cls.startTime} • {cls.room}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No classes scheduled for today</p>
                )}
              </div>

              {/* Upcoming */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Upcoming This Week
                </h3>
                <div className="space-y-3">
                  {upcomingClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{cls.course}</p>
                        <p className="text-sm text-gray-500">{WEEK_DAYS[cls.day]} • {cls.startTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
}
