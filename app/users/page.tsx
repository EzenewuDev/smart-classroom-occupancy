'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { AuthGuard } from '@/components/auth-guard';
import { useAuth } from '@/context/auth-context';
import { 
  Users, 
  Search, 
  Filter,
  Plus,
  MoreVertical,
  Mail,
  Shield,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_USERS = [
  { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.j@lcu.edu.ng', role: 'faculty', department: 'College of Medicine', status: 'active', lastActive: '2 min ago' },
  { id: 2, name: 'John Student', email: 'john.s@lcu.edu.ng', role: 'student', department: 'College of Engineering', status: 'active', lastActive: '5 min ago' },
  { id: 3, name: 'Prof. Michael Chen', email: 'michael.c@lcu.edu.ng', role: 'faculty', department: 'College of Engineering', status: 'active', lastActive: '1 hour ago' },
  { id: 4, name: 'Admin User', email: 'admin@lcu.edu.ng', role: 'admin', department: '-', status: 'active', lastActive: 'Just now' },
  { id: 5, name: 'Dr. Emily Davis', email: 'emily.d@lcu.edu.ng', role: 'faculty', department: 'College of Science', status: 'inactive', lastActive: '3 days ago' },
  { id: 6, name: 'Alice Williams', email: 'alice.w@lcu.edu.ng', role: 'student', department: 'College of Business', status: 'active', lastActive: '30 min ago' },
  { id: 7, name: 'Robert Taylor', email: 'robert.t@lcu.edu.ng', role: 'faculty', department: 'College of Law', status: 'active', lastActive: '2 hours ago' },
  { id: 8, name: 'Grace Mensah', email: 'grace.m@lcu.edu.ng', role: 'student', department: 'College of Nursing', status: 'active', lastActive: '1 hour ago' },
];

const ROLE_COLORS = {
  admin: 'bg-purple-100 text-purple-700',
  faculty: 'bg-blue-100 text-blue-700',
  student: 'bg-green-100 text-green-700',
};

export default function UsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const { user } = useAuth();

  const filteredUsers = MOCK_USERS.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: MOCK_USERS.length,
    students: MOCK_USERS.filter(u => u.role === 'student').length,
    faculty: MOCK_USERS.filter(u => u.role === 'faculty').length,
    admin: MOCK_USERS.filter(u => u.role === 'admin').length,
  };

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
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">Manage system users and permissions</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Students</p>
                <p className="text-2xl font-bold text-green-600">{stats.students}</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Faculty</p>
                <p className="text-2xl font-bold text-blue-600">{stats.faculty}</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Admins</p>
                <p className="text-2xl font-bold text-purple-600">{stats.admin}</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Students</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admins</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg border">
              <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-500">
                <div className="col-span-3">User</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-3">Department</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              
              <div className="divide-y">
                {filteredUsers.map((u) => (
                  <div key={u.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50">
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">{u.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{u.name}</p>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${ROLE_COLORS[u.role as keyof typeof ROLE_COLORS]}`}>
                        {u.role}
                      </span>
                    </div>
                    <div className="col-span-3 text-sm text-gray-600">
                      {u.department}
                    </div>
                    <div className="col-span-2">
                      {u.status === 'active' ? (
                        <span className="flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle2 className="h-4 w-4" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-500 text-sm">
                          <XCircle className="h-4 w-4" />
                          Inactive
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
