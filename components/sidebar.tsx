'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Building2, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings,
  BookOpen,
  GraduationCap,
  History,
  FileText,
  HelpCircle,
  Search
} from 'lucide-react';
import { LEAD_CITY_DEPARTMENTS } from '@/lib/data';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  
  // Static mock values since auth is removed
  const user = { name: 'Guest User', department: 'Administration', role: 'admin' };
  const departments = LEAD_CITY_DEPARTMENTS;

  const mainNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/spaces', label: 'Spaces', icon: Building2 },
    { href: '/bookings', label: 'Bookings', icon: Calendar },
    { href: '/schedule', label: 'Schedule', icon: BookOpen },
  ];

  const analyticsNavItems = [
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/reports', label: 'Reports', icon: FileText },
    { href: '/activity', label: 'Activity', icon: History },
  ];

  const adminNavItems = [
    { href: '/users', label: 'Users', icon: Users },
    { href: '/academics', label: 'Academics', icon: GraduationCap },
  ];

  const bottomNavItems = [
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/support', label: 'Support', icon: HelpCircle },
  ];

  const NavItem = ({ href, label, icon: Icon }: { href: string; label: string; icon: typeof LayoutDashboard }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={onClose}
        className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
          isActive
            ? 'bg-blue-50 text-blue-600 font-semibold'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
        <span className="font-medium text-sm tracking-tight">{label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 
        bg-white border-r overflow-y-auto z-50
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search rooms, bookings..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Department Badge */}
          {user?.department && (
            <div className="px-4 py-2 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-500">Department</p>
              <p className="text-sm font-medium text-blue-900 truncate">{user.department}</p>
            </div>
          )}

          {/* Main Navigation */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Main Menu
            </h3>
            <nav className="space-y-1">
              {mainNavItems.map((item) => (
                <NavItem key={item.href} {...item} />
              ))}
            </nav>
          </div>

          {/* Analytics Navigation */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Analytics
            </h3>
            <nav className="space-y-1">
              {analyticsNavItems.map((item) => (
                <NavItem key={item.href} {...item} />
              ))}
            </nav>
          </div>

          {/* Admin Navigation */}
          {user?.role === 'admin' && (
            <div>
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Administration
              </h3>
              <nav className="space-y-1">
                {adminNavItems.map((item) => (
                  <NavItem key={item.href} {...item} />
                ))}
              </nav>
            </div>
          )}

          {/* Departments Quick Access */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Departments ({departments.length})
            </h3>
            <div className="px-4 py-2 space-y-1">
              {departments.slice(0, 5).map((dept, idx) => (
                <div 
                  key={dept} 
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="truncate">{dept}</span>
                </div>
              ))}
              {departments.length > 5 && (
                <Link 
                  href="/departments"
                  className="text-xs text-blue-600 hover:underline"
                >
                  +{departments.length - 5} more departments
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <nav className="space-y-1">
            {bottomNavItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
