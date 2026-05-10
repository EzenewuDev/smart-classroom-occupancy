'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { AuthGuard } from '@/components/auth-guard';
import { 
  History, 
  Building2, 
  User, 
  Clock,
  AlertCircle,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const ACTIVITY_DATA = [
  {
    id: 1,
    type: 'booking',
    user: 'Dr. Sarah Johnson',
    action: 'booked',
    target: 'Lecture Hall A',
    time: '2 minutes ago',
    status: 'success',
  },
  {
    id: 2,
    type: 'checkin',
    user: 'Prof. Michael Chen',
    action: 'checked in to',
    target: 'Lab 1',
    time: '15 minutes ago',
    status: 'success',
  },
  {
    id: 3,
    type: 'checkout',
    user: 'Student Group B',
    action: 'checked out of',
    target: 'Study Room 2',
    time: '32 minutes ago',
    status: 'success',
  },
  {
    id: 4,
    type: 'maintenance',
    user: 'Facilities Team',
    action: 'started maintenance on',
    target: 'Lab 2',
    time: '1 hour ago',
    status: 'warning',
  },
  {
    id: 5,
    type: 'booking',
    user: 'Dr. Emily Davis',
    action: 'cancelled booking for',
    target: 'Seminar Room B',
    time: '2 hours ago',
    status: 'error',
  },
  {
    id: 6,
    type: 'alert',
    user: 'System',
    action: 'detected high occupancy in',
    target: 'Lecture Hall A (95%)',
    time: '3 hours ago',
    status: 'warning',
  },
  {
    id: 7,
    type: 'booking',
    user: 'John Student',
    action: 'booked',
    target: 'Study Room 1',
    time: '4 hours ago',
    status: 'success',
  },
  {
    id: 8,
    type: 'cleaning',
    user: 'Cleaning Staff',
    action: 'completed cleaning of',
    target: 'Conference Room',
    time: '5 hours ago',
    status: 'success',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'booking': return Building2;
    case 'checkin':
    case 'checkout': return User;
    case 'maintenance':
    case 'cleaning': return AlertCircle;
    case 'alert': return AlertCircle;
    default: return History;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success': return 'bg-green-100 text-green-600';
    case 'warning': return 'bg-yellow-100 text-yellow-600';
    case 'error': return 'bg-red-100 text-red-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

export default function ActivityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const filteredActivity = filter === 'all' 
    ? ACTIVITY_DATA 
    : ACTIVITY_DATA.filter(a => a.type === filter);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
                <p className="text-gray-600">Real-time space usage activity</p>
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-2 border rounded-lg">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Total Activities</p>
                <p className="text-2xl font-bold text-blue-600">156</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Bookings</p>
                <p className="text-2xl font-bold text-green-600">48</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Check-ins</p>
                <p className="text-2xl font-bold text-orange-600">72</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Alerts</p>
                <p className="text-2xl font-bold text-red-600">5</p>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {['all', 'booking', 'checkin', 'checkout', 'maintenance', 'alert'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                    filter === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {type === 'all' ? 'All Activity' : type}
                </button>
              ))}
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-lg border">
              <div className="divide-y">
                {filteredActivity.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  
                  return (
                    <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(activity.status)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900">
                            <span className="font-medium">{activity.user}</span>
                            {' '}{activity.action}{' '}
                            <span className="font-medium">{activity.target}</span>
                          </p>
                          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {activity.time}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(activity.status)}`}>
                          {activity.type}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center mt-6">
              <Button variant="outline">Load More Activity</Button>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
