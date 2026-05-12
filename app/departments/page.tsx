'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
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
  X,
  BookMarked,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingModal } from '@/components/booking-modal';

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
    lightColor: 'bg-red-50',
    textColor: 'text-red-600',
    programs: ['MBBS', 'Medical Biochemistry', 'Anatomy', 'Physiology', 'Pathology'],
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
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    programs: ['LLB', 'BL (Bar at Law)', 'Criminology', 'International Law'],
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
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    programs: ['Civil Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Computer Engineering', 'Petroleum Engineering'],
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
    lightColor: 'bg-green-50',
    textColor: 'text-green-600',
    programs: ['Business Administration', 'Accounting', 'Banking & Finance', 'Marketing', 'MBA'],
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
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    programs: ['English Language', 'History & International Studies', 'Philosophy', 'Religious Studies', 'Performing Arts'],
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
    lightColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    programs: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Microbiology', 'Biochemistry'],
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
    lightColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    programs: ['Sociology', 'Psychology', 'Political Science', 'Economics', 'Geography', 'Social Work'],
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
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    programs: ['Educational Management', 'Guidance & Counselling', 'Early Childhood Education', 'Special Education'],
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
    lightColor: 'bg-cyan-50',
    textColor: 'text-cyan-600',
    programs: ['Nursing Science', 'Community Health Nursing', 'Midwifery', 'Psychiatric Nursing'],
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
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    programs: ['Pharmacy (Pharm.D)', 'Pharmaceutical Chemistry', 'Clinical Pharmacy', 'Pharmacognosy'],
  },
  {
    name: 'College of Communication and Media Studies',
    code: 'CMS',
    dean: 'Dr. Tunde Fashola',
    students: 510,
    faculty: 42,
    courses: 30,
    buildings: ['Media Block', 'TV Studio', 'Radio Lab', 'Press Room'],
    contact: { phone: '+234 123 456 7900', email: 'media@lcu.edu.ng' },
    description: 'Empowering the next generation of media professionals with digital storytelling and journalism skills.',
    color: 'bg-rose-600',
    lightColor: 'bg-rose-50',
    textColor: 'text-rose-600',
    programs: ['Mass Communication', 'Journalism', 'Broadcasting', 'Public Relations', 'Advertising'],
  },
  {
    name: 'College of Environmental Sciences',
    code: 'ENV',
    dean: 'Prof. Ngozi Awele',
    students: 420,
    faculty: 38,
    courses: 26,
    buildings: ['Environmental Block', 'GIS Lab', 'Ecology Field Station'],
    contact: { phone: '+234 123 456 7901', email: 'environment@lcu.edu.ng' },
    description: 'Equipping environmental stewards through interdisciplinary study of ecosystems and urban systems.',
    color: 'bg-lime-600',
    lightColor: 'bg-lime-50',
    textColor: 'text-lime-600',
    programs: ['Environmental Management', 'Urban & Regional Planning', 'Estate Management', 'Surveying & Geoinformatics'],
  },
  {
    name: 'College of Information Technology',
    code: 'CIT',
    dean: 'Dr. Chidi Ezenwachi',
    students: 890,
    faculty: 72,
    courses: 40,
    buildings: ['IT Block', 'Data Center', 'Software Lab', 'Cybersecurity Lab'],
    contact: { phone: '+234 123 456 7902', email: 'it@lcu.edu.ng' },
    description: 'Producing world-class technology innovators through cutting-edge IT education and research.',
    color: 'bg-sky-600',
    lightColor: 'bg-sky-50',
    textColor: 'text-sky-600',
    programs: ['Information Technology', 'Software Engineering', 'Cybersecurity', 'Data Science', 'AI & Machine Learning'],
  },
  {
    name: 'College of Agriculture',
    code: 'AGR',
    dean: 'Prof. Bisi Adeniyi',
    students: 340,
    faculty: 30,
    courses: 22,
    buildings: ['Agriculture Block', 'Greenhouse', 'Animal Science Unit', 'Agro-processing Lab'],
    contact: { phone: '+234 123 456 7903', email: 'agriculture@lcu.edu.ng' },
    description: 'Driving agricultural innovation and food security through applied sciences and agribusiness education.',
    color: 'bg-yellow-600',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    programs: ['Agriculture', 'Food Science & Technology', 'Animal Science', 'Crop Science', 'Agribusiness'],
  },
];

export default function DepartmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [showPrograms, setShowPrograms] = useState(false);

  const filteredDepts = DEPARTMENT_DETAILS.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.programs.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedDepartment = DEPARTMENT_DETAILS.find(d => d.name === selectedDept);

  const totalStats = {
    students: DEPARTMENT_DETAILS.reduce((sum, d) => sum + d.students, 0),
    faculty: DEPARTMENT_DETAILS.reduce((sum, d) => sum + d.faculty, 0),
    courses: DEPARTMENT_DETAILS.reduce((sum, d) => sum + d.courses, 0),
    departments: DEPARTMENT_DETAILS.length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Academic Departments</h1>
            <p className="text-gray-600 text-sm">Lead City University · Colleges & Academic Units</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            <div className="bg-white rounded-xl border p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-500">Departments</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{totalStats.departments}</p>
            </div>
            <div className="bg-white rounded-xl border p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-500">Total Students</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{totalStats.students.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl border p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-500">Faculty</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{totalStats.faculty}</p>
            </div>
            <div className="bg-white rounded-xl border p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-500">Programs</p>
              <p className="text-xl sm:text-2xl font-bold text-orange-600">{totalStats.courses}</p>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl border p-3 mb-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search departments, codes, or programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Department List */}
            <div className="lg:col-span-2 space-y-3">
              {filteredDepts.map((dept) => (
                <div
                  key={dept.code}
                  onClick={() => setSelectedDept(selectedDept === dept.name ? null : dept.name)}
                  className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedDept === dept.name ? 'ring-2 ring-blue-500 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3 flex-1 min-w-0">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 ${dept.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{dept.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${dept.lightColor} ${dept.textColor}`}>{dept.code}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{dept.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                            <Users className="h-3 w-3" />
                            {dept.students.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                            <BookOpen className="h-3 w-3" />
                            {dept.courses} programs
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                            <Building2 className="h-3 w-3" />
                            {dept.buildings.length} buildings
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${selectedDept === dept.name ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              ))}

              {filteredDepts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border">
                  <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No departments found</h3>
                  <p className="text-gray-500">Try adjusting your search</p>
                </div>
              )}
            </div>

            {/* Department Detail Panel */}
            <div className="lg:col-span-1">
              {selectedDepartment ? (
                <div className="bg-white rounded-xl border p-5 sticky top-20">
                  <div className={`w-16 h-16 ${selectedDepartment.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 mb-1">{selectedDepartment.name}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full font-mono ${selectedDepartment.lightColor} ${selectedDepartment.textColor}`}>
                    {selectedDepartment.code}
                  </span>
                  <p className="text-sm text-gray-600 mt-3 mb-4">{selectedDepartment.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-gray-500">Dean</span>
                      <span className="font-medium text-gray-900 text-right max-w-[60%]">{selectedDepartment.dean}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-gray-500">Students</span>
                      <span className="font-medium text-gray-900">{selectedDepartment.students.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-gray-500">Faculty</span>
                      <span className="font-medium text-gray-900">{selectedDepartment.faculty}</span>
                    </div>
                  </div>

                  {/* Buildings */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Buildings</h4>
                    <div className="space-y-1.5">
                      {selectedDepartment.buildings.map((building) => (
                        <div key={building} className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                          {building}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Programs */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Programs Offered ({selectedDepartment.programs.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDepartment.programs.map((program) => (
                        <span key={program} className={`text-xs px-2 py-1 rounded-lg ${selectedDepartment.lightColor} ${selectedDepartment.textColor} font-medium`}>
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Contact</h4>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        {selectedDepartment.contact.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-3.5 w-3.5 text-gray-400" />
                        {selectedDepartment.contact.email}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setBookingModalOpen(true)}
                    className={`w-full ${selectedDepartment.color} hover:opacity-90 text-white`}
                  >
                    <BookMarked className="h-4 w-4 mr-2" />
                    Book a Room
                  </Button>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center sticky top-20">
                  <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">Select a department to view details</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
