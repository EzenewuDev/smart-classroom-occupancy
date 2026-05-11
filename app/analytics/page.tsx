'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { 
  BarChart3, 
  TrendingUp, 
  Building2, 
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const ANALYTICS_DATA = {
  occupancyTrend: [
    { day: 'Mon', rate: 65 },
    { day: 'Tue', rate: 72 },
    { day: 'Wed', rate: 68 },
    { day: 'Thu', rate: 85 },
    { day: 'Fri', rate: 78 },
    { day: 'Sat', rate: 45 },
    { day: 'Sun', rate: 30 },
  ],
  departmentUsage: [
    { dept: 'Engineering', usage: 85, color: 'bg-orange-600' },
    { dept: 'Medicine', usage: 92, color: 'bg-red-600' },
    { dept: 'Business', usage: 78, color: 'bg-green-600' },
    { dept: 'Law', usage: 65, color: 'bg-blue-800' },
    { dept: 'Science', usage: 88, color: 'bg-teal-600' },
  ],
  peakHours: [
    { time: '8AM', occupancy: 40 },
    { time: '10AM', occupancy: 75 },
    { time: '12PM', occupancy: 60 },
    { time: '2PM', occupancy: 90 },
    { time: '4PM', occupancy: 70 },
    { time: '6PM', occupancy: 45 },
  ],
};

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="min-h-screen bg-gray-50">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Space Analytics</h1>
                <p className="text-gray-600">Occupancy insights and usage trends</p>
              </div>
              <div className="flex gap-2">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="semester">This Semester</option>
                </select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Avg Occupancy', value: '68%', change: '+5%', up: true, icon: BarChart3 },
                { label: 'Peak Usage', value: '92%', change: '+12%', up: true, icon: TrendingUp },
                { label: 'Total Bookings', value: '1,248', change: '+18%', up: true, icon: Calendar },
                { label: 'Active Spaces', value: '45/52', change: '-2', up: false, icon: Building2 },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="h-5 w-5 text-gray-400" />
                    <span className={`flex items-center text-xs ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.up ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Weekly Occupancy Trend */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Weekly Occupancy Trend</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {ANALYTICS_DATA.occupancyTrend.map((item) => (
                    <div key={item.day} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden" style={{ height: '200px' }}>
                        <div 
                          className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg transition-all"
                          style={{ height: `${item.rate * 2}px` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{item.day}</span>
                      <span className="text-xs font-medium text-gray-900">{item.rate}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Usage */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Usage by Department</h3>
                <div className="space-y-4">
                  {ANALYTICS_DATA.departmentUsage.map((dept) => (
                    <div key={dept.dept}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{dept.dept}</span>
                        <span className="text-gray-500">{dept.usage}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${dept.color}`}
                          style={{ width: `${dept.usage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peak Hours */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Peak Hours Analysis</h3>
                <div className="flex items-end justify-between gap-3 h-48">
                  {ANALYTICS_DATA.peakHours.map((hour) => (
                    <div key={hour.time} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-gray-100 rounded-lg relative overflow-hidden" style={{ height: '150px' }}>
                        <div 
                          className={`absolute bottom-0 w-full rounded-lg transition-all ${
                            hour.occupancy > 80 ? 'bg-red-500' : hour.occupancy > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ height: `${hour.occupancy * 1.5}px` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{hour.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Space Utilization Summary */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Space Utilization</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">85%</p>
                    <p className="text-sm text-gray-600 mt-1">Lecture Halls</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">62%</p>
                    <p className="text-sm text-gray-600 mt-1">Labs</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-3xl font-bold text-orange-600">78%</p>
                    <p className="text-sm text-gray-600 mt-1">Seminar Rooms</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">45%</p>
                    <p className="text-sm text-gray-600 mt-1">Study Rooms</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
              <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Peak usage occurs between 2PM - 4PM on weekdays</li>
                <li>• Engineering and Medicine departments show highest demand</li>
                <li>• Weekend utilization is 40% lower than weekdays</li>
                <li>• Consider adding 3 more study rooms in Science Block</li>
              </ul>
            </div>
          </main>
        </div>
      </div>
  );
}
