'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { LEAD_CITY_DEPARTMENTS } from '@/lib/data';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar,
  Clock,
  ChevronRight,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const ACADEMIC_PROGRAMS = [
  {
    code: 'BSC-CS',
    name: 'B.Sc. Computer Science',
    department: 'College of Engineering',
    duration: '4 years',
    students: 320,
    level: 'Undergraduate',
  },
  {
    code: 'BSC-MED',
    name: 'MBBS Medicine',
    department: 'College of Medicine',
    duration: '6 years',
    students: 180,
    level: 'Undergraduate',
  },
  {
    code: 'MBA',
    name: 'Master of Business Administration',
    department: 'College of Business Administration',
    duration: '2 years',
    students: 85,
    level: 'Postgraduate',
  },
  {
    code: 'LLB',
    name: 'Bachelor of Laws',
    department: 'College of Law',
    duration: '5 years',
    students: 240,
    level: 'Undergraduate',
  },
  {
    code: 'BSC-NUR',
    name: 'B.NSc. Nursing Science',
    department: 'College of Nursing',
    duration: '5 years',
    students: 150,
    level: 'Undergraduate',
  },
  {
    code: 'PHD-ENG',
    name: 'Ph.D. Engineering',
    department: 'College of Engineering',
    duration: '3-5 years',
    students: 25,
    level: 'Doctorate',
  },
];

const UPCOMING_EVENTS = [
  { title: 'Registration Deadline', date: 'May 15, 2026', type: 'deadline' },
  { title: 'Mid-Semester Exams', date: 'May 20-30, 2026', type: 'exam' },
  { title: 'Faculty Meeting', date: 'May 18, 2026', type: 'meeting' },
  { title: 'Career Fair', date: 'June 5, 2026', type: 'event' },
];

export default function AcademicsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const departments = LEAD_CITY_DEPARTMENTS;

  const filteredPrograms = ACADEMIC_PROGRAMS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Academic Management</h1>
                <p className="text-gray-600">Programs, courses, and academic calendar</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Program
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Total Programs</p>
                <p className="text-2xl font-bold text-blue-600">42</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Departments</p>
                <p className="text-2xl font-bold text-green-600">{departments.length}</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Active Courses</p>
                <p className="text-2xl font-bold text-orange-600">156</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Enrolled Students</p>
                <p className="text-2xl font-bold text-purple-600">8,420</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Programs List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search programs..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>

                  <div className="divide-y">
                    {filteredPrograms.map((program) => (
                      <div key={program.code} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">{program.name}</h3>
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                                {program.code}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{program.department}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {program.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {program.students} students
                              </span>
                              <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                                {program.level}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Events */}
                <div className="bg-white rounded-lg border p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Academic Calendar
                  </h3>
                  <div className="space-y-3">
                    {UPCOMING_EVENTS.map((event, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          event.type === 'exam' ? 'bg-red-500' : 
                          event.type === 'deadline' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <p className="font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-500">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Full Calendar
                  </Button>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-lg border p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    {['Course Catalog', 'Student Portal', 'Faculty Directory', 'Academic Policies'].map((link) => (
                      <button 
                        key={link}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 flex items-center justify-between"
                      >
                        {link}
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
}
