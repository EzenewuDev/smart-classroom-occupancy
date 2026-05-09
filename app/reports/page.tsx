'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { AuthGuard } from '@/components/auth-guard';
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const REPORTS_DATA = [
  {
    id: 'RPT-2025-001',
    title: 'Monthly Space Utilization Report',
    type: 'Occupancy',
    date: 'May 2025',
    status: 'ready',
    size: '2.4 MB',
    format: 'PDF',
  },
  {
    id: 'RPT-2025-002',
    title: 'Department Usage Analysis',
    type: 'Analytics',
    date: 'May 2025',
    status: 'ready',
    size: '1.8 MB',
    format: 'XLSX',
  },
  {
    id: 'RPT-2025-003',
    title: 'Maintenance Schedule Report',
    type: 'Operations',
    date: 'May 2025',
    status: 'ready',
    size: '890 KB',
    format: 'PDF',
  },
  {
    id: 'RPT-2025-004',
    title: 'Student Booking Patterns',
    type: 'Behavioral',
    date: 'Apr 2025',
    status: 'ready',
    size: '3.2 MB',
    format: 'PDF',
  },
  {
    id: 'RPT-2025-005',
    title: 'Energy Consumption Analysis',
    type: 'Facilities',
    date: 'Apr 2025',
    status: 'generating',
    size: '-',
    format: 'PDF',
  },
  {
    id: 'RPT-2025-006',
    title: 'Semester Peak Usage Report',
    type: 'Occupancy',
    date: 'Q1 2025',
    status: 'ready',
    size: '4.1 MB',
    format: 'PDF',
  },
];

const REPORT_TEMPLATES = [
  { name: 'Daily Occupancy Summary', icon: Building2, desc: 'Quick daily overview of space usage' },
  { name: 'Weekly Utilization Report', icon: Clock, desc: 'Comprehensive weekly analytics' },
  { name: 'Department Performance', icon: Users, desc: 'Usage stats by department' },
  { name: 'Custom Report Builder', icon: FileText, desc: 'Build your own custom report' },
];

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const filteredReports = filterType === 'all' 
    ? REPORTS_DATA 
    : REPORTS_DATA.filter(r => r.type.toLowerCase() === filterType);

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
                <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                <p className="text-gray-600">Generate and download usage reports</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                Generate New Report
              </Button>
            </div>

            {/* Report Templates */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {REPORT_TEMPLATES.map((template) => (
                <div 
                  key={template.name}
                  className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <template.icon className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{template.desc}</p>
                </div>
              ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-lg border p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Filter by:</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['all', 'occupancy', 'analytics', 'operations', 'behavioral', 'facilities'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                        filterType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reports List */}
            <div className="bg-white rounded-lg border">
              <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-500">
                <div className="col-span-4">Report Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Period</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              
              <div className="divide-y">
                {filteredReports.map((report) => (
                  <div key={report.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50">
                    <div className="col-span-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{report.title}</p>
                          <p className="text-xs text-gray-500">{report.id} • {report.size}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {report.type}
                      </span>
                    </div>
                    <div className="col-span-2 text-sm text-gray-600">
                      {report.date}
                    </div>
                    <div className="col-span-2">
                      {report.status === 'ready' ? (
                        <span className="flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle2 className="h-4 w-4" />
                          Ready
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-600 text-sm">
                          <Clock className="h-4 w-4" />
                          Generating...
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <Button variant="ghost" size="sm" disabled={report.status !== 'ready'}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={report.status !== 'ready'}
                        className={report.status === 'ready' ? 'text-blue-600 border-blue-600 hover:bg-blue-50' : ''}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {report.format}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border mt-4">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No reports found</h3>
                <p className="text-gray-500">Try adjusting your filter</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
