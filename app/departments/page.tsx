'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { AuthGuard } from '@/components/auth-guard';
import { useAuth } from '@/context/auth-context';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Building2,
  ChevronRight,
  Search,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEPARTMENT_DETAILS = [
  {
    name: 'College of Medicine',
    code: 'COM',
    dean: 'Prof. Adeyemi Johnson',
    students: 850,
    faculty: 120,
    courses: 45,
    buildings: ['Medical Sciences Block', 'Teaching Hospital', 'Anatomy Lab'],
    contact: { phone: '+234 123 456 7890', email: 'medicine@lcu.edu.ng' },
    description: 'Training future healthcare professionals with world-class medical education and research facilities.',
    color: 'bg-red-600',
  },
  {
    name: 'College of Law',
    code: 'LAW',
    dean: 'Dr. Sarah Williams',
    students: 620,
    faculty: 45,
    courses: 32,
    buildings: ['Law Block', 'Moot Court', 'Law Library'],
    contact: { phone: '+234 123 456 7891', email: 'law@lcu.edu.ng' },
    description: 'Preparing legal professionals with rigorous academic training and practical courtroom experience.',
    color: 'bg-blue-800',
  },
  {
    name: 'College of Engineering',
    code: 'ENG',
    dean: 'Prof. Michael Chen',
    students: 1200,
    faculty: 85,
    courses: 56,
    buildings: ['Engineering Block', 'Workshop Complex', 'Innovation Hub'],
    contact: { phone: '+234 123 456 7892', email: 'engineering@lcu.edu.ng' },
    description: 'Developing innovative engineers through hands-on training and cutting-edge research programs.',
    color: 'bg-orange-600',
  },
  {
    name: 'College of Business Administration',
    code: 'BSA',
    dean: 'Dr. Patricia Adeleke',
    students: 1500,
    faculty: 95,
    courses: 48,
    buildings: ['Business Block', 'MBA Center', 'Entrepreneurship Lab'],
    contact: { phone: '+234 123 456 7893', email: 'business@lcu.edu.ng' },
    description: 'Cultivating business leaders and entrepreneurs for the global marketplace.',
    color: 'bg-green-600',
  },
  {
    name: 'College of Arts and Humanities',
    code: 'ART',
    dean: 'Prof. James Okafor',
    students: 780,
    faculty: 65,
    courses: 42,
    buildings: ['Arts Block', 'Theatre', 'Language Lab'],
    contact: { phone: '+234 123 456 7894', email: 'arts@lcu.edu.ng' },
    description: 'Fostering creativity and critical thinking through diverse arts and humanities programs.',
    color: 'bg-purple-600',
  },
  {
    name: 'College of Science and Technology',
    code: 'CST',
    dean: 'Dr. Emily Rodriguez',
    students: 1100,
    faculty: 110,
    courses: 52,
    buildings: ['Science Block', 'Research Center', 'Computer Labs'],
    contact: { phone: '+234 123 456 7895', email: 'science@lcu.edu.ng' },
    description: 'Advancing scientific knowledge and technological innovation through research and education.',
    color: 'bg-teal-600',
  },
  {
    name: 'College of Social Sciences',
    code: 'CSS',
    dean: 'Prof. Grace Mensah',
    students: 920,
    faculty: 70,
    courses: 38,
    buildings: ['Social Sciences Block', 'Psychology Lab', 'Research Wing'],
    contact: { phone: '+234 123 456 7896', email: 'socialsci@lcu.edu.ng' },
    description: 'Understanding human society and behavior through interdisciplinary social science programs.',
    color: 'bg-pink-600',
  },
  {
    name: 'College of Education',
    code: 'EDU',
    dean: 'Dr. Ibrahim Hassan',
    students: 680,
    faculty: 55,
    courses: 35,
    buildings: ['Education Block', 'Demonstration School', 'Teaching Practice Center'],
    contact: { phone: '+234 123 456 7897', email: 'education@lcu.edu.ng' },
    description: 'Preparing educators who will shape the future of learning in Nigeria and beyond.',
    color: 'bg-indigo-600',
  },
  {
    name: 'College of Nursing',
    code: 'NUR',
    dean: 'Prof. Florence Nwosu',
    students: 450,
    faculty: 40,
    courses: 28,
    buildings: ['Nursing Block', 'Clinical Skills Lab', 'Community Health Center'],
    contact: { phone: '+234 123 456 7898', email: 'nursing@lcu.edu.ng' },
    description: 'Training compassionate and skilled nursing professionals for healthcare delivery.',
    color: 'bg-cyan-600',
  },
  {
    name: 'College of Pharmacy',
    code: 'PHA',
    dean: 'Dr. Samuel Okonkwo',
    students: 380,
    faculty: 35,
    courses: 25,
    buildings: ['Pharmacy Block', 'Pharmaceutics Lab', 'Dispensary'],
    contact: { phone: '+234 123 456 7899', email: 'pharmacy@lcu.edu.ng' },
    description: 'Developing pharmaceutical scientists and practitioners for better healthcare outcomes.',
    color: 'bg-emerald-600',
  },
];

export default function DepartmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, departments } = useAuth();

  const filteredDepts = DEPARTMENT_DETAILS.filter(dept => 
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedDepartment = DEPARTMENT_DETAILS.find(d => d.name === selectedDept);

  const totalStats = {
    students: DEPARTMENT_DETAILS.reduce((sum, d) => sum + d.students, 0),
    faculty: DEPARTMENT_DETAILS.reduce((sum, d) => sum + d.faculty, 0),
    courses: DEPARTMENT_DETAILS.reduce((sum, d) => sum + d.courses, 0),
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Academic Departments</h1>
              <p className="text-gray-600">Lead City University Colleges and Academic Units</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Total Departments</p>
                <p className="text-2xl font-bold text-blue-600">{departments.length}</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.students.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Faculty Members</p>
                <p className="text-2xl font-bold text-purple-600">{totalStats.faculty}</p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-gray-500">Programs</p>
                <p className="text-2xl font-bold text-orange-600">{totalStats.courses}</p>
              </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg border p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search departments by name or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Department List */}
              <div className="lg:col-span-2 space-y-4">
                {filteredDepts.map((dept) => (
                  <div 
                    key={dept.code}
                    onClick={() => setSelectedDept(dept.name)}
                    className={`bg-white rounded-lg border p-5 cursor-pointer transition-all hover:shadow-md ${
                      selectedDept === dept.name ? 'ring-2 ring-blue-500 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className={`w-14 h-14 ${dept.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <GraduationCap className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{dept.name}</h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{dept.description}</p>
                          
                          <div className="flex flex-wrap gap-3 mt-3">
                            <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              <Users className="h-3 w-3" />
                              {dept.students.toLocaleString()} Students
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              <BookOpen className="h-3 w-3" />
                              {dept.courses} Programs
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              <Building2 className="h-3 w-3" />
                              {dept.buildings.length} Buildings
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                ))}

                {filteredDepts.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg border">
                    <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No departments found</h3>
                    <p className="text-gray-500">Try adjusting your search</p>
                  </div>
                )}
              </div>

              {/* Department Details Sidebar */}
              <div className="lg:col-span-1">
                {selectedDepartment ? (
                  <div className="bg-white rounded-lg border p-6 sticky top-4">
                    <div className={`w-16 h-16 ${selectedDepartment.color} rounded-xl flex items-center justify-center mb-4`}>
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedDepartment.name}</h2>
                    <p className="text-sm text-gray-500 mb-4">Code: {selectedDepartment.code}</p>
                    <p className="text-gray-600 mb-6">{selectedDepartment.description}</p>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-500">Dean</span>
                        <span className="font-medium text-gray-900">{selectedDepartment.dean}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-500">Students</span>
                        <span className="font-medium text-gray-900">{selectedDepartment.students.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-500">Faculty</span>
                        <span className="font-medium text-gray-900">{selectedDepartment.faculty}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-500">Programs</span>
                        <span className="font-medium text-gray-900">{selectedDepartment.courses}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-2">Buildings</h4>
                      <div className="space-y-2">
                        {selectedDepartment.buildings.map((building) => (
                          <div key={building} className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {building}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {selectedDepartment.contact.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {selectedDepartment.contact.email}
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Programs
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                    <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Select a department to view details</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
