'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { LEAD_CITY_DEPARTMENTS } from '@/lib/data';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Building2,
  Save,
  ChevronRight,
  Mail,
  Phone,
  Key
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const departments = LEAD_CITY_DEPARTMENTS;
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Guest User',
    email: 'guest@lcu.edu.ng',
    department: 'Administration',
    phone: '',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    theme: 'light',
  });

  const handleSave = () => {
    console.log('Settings saved:', formData);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'department', label: 'Department', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border overflow-hidden">
                <nav className="flex flex-col">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{tab.label}</span>
                        <ChevronRight className={`h-4 w-4 ml-auto ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg border p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <Button variant="outline" size="sm">Change Avatar</Button>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <div className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-gray-50">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <input
                              type="email"
                              value={formData.email}
                              disabled
                              className="flex-1 bg-transparent outline-none text-gray-600"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <div className="flex items-center gap-2 px-3 py-2 border rounded-lg">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+234 ..."
                              className="flex-1 outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                          <input
                            type="text"
                            value="Administrator"
                            disabled
                            className="w-full px-3 py-2 border rounded-lg bg-gray-50 capitalize"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
                    <div className="space-y-4">
                      {[
                        { key: 'email', label: 'Email Notifications', desc: 'Receive updates about room bookings and system alerts' },
                        { key: 'push', label: 'Push Notifications', desc: 'Browser notifications for real-time updates' },
                        { key: 'sms', label: 'SMS Notifications', desc: 'Text messages for urgent alerts' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-4 border-b last:border-0">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.label}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.notifications[item.key as keyof typeof formData.notifications]}
                              onChange={(e) => setFormData({
                                ...formData,
                                notifications: {
                                  ...formData.notifications,
                                  [item.key]: e.target.checked,
                                },
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Security Settings</h2>
                    <div className="space-y-6">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-blue-900 mb-2">Change Password</h3>
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <div className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white">
                              <Key className="h-4 w-4 text-gray-400" />
                              <input type="password" placeholder="Enter current password" className="flex-1 outline-none" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <input type="password" placeholder="Enter new password" className="w-full px-3 py-2 border rounded-lg" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <input type="password" placeholder="Confirm new password" className="w-full px-3 py-2 border rounded-lg" />
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>

                      <div className="p-4 border rounded-lg border-red-200">
                        <h3 className="font-medium text-red-600 mb-2">Delete Account</h3>
                        <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all data</p>
                        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">Delete Account</Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === 'appearance' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Appearance</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-4 border-b">
                        <div>
                          <h3 className="font-medium text-gray-900">Theme</h3>
                          <p className="text-sm text-gray-500">Choose your preferred theme</p>
                        </div>
                        <select
                          value={formData.theme}
                          onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                          className="px-3 py-2 border rounded-lg"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="system">System</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Department Tab */}
                {activeTab === 'department' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Lead City University Departments</h2>
                    <p className="text-gray-600 mb-6">
                      Select your department from the 10 colleges available at Lead City University.
                    </p>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Department</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {departments.map((dept, index) => (
                        <div
                          key={dept}
                          onClick={() => setFormData({ ...formData, department: dept })}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            formData.department === dept
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              formData.department === dept ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {index + 1}
                            </div>
                            <span className={`font-medium ${
                              formData.department === dept ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {dept}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="mt-8 pt-6 border-t flex justify-end">
                  <Button 
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}
