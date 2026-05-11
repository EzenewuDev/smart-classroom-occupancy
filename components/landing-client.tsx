'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Map, 
  Users, 
  BarChart3, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight,
  Clock,
  Thermometer,
  Wifi,
  Menu,
  X
} from 'lucide-react';

const features = [
  {
    icon: Map,
    title: 'Interactive Floor Plans',
    description: 'Visualize real-time occupancy with color-coded interactive maps of your campus buildings.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track utilization rates, peak hours, and space efficiency with comprehensive analytics.',
  },
  {
    icon: Clock,
    title: 'Smart Scheduling',
    description: 'Book rooms instantly and manage reservations with our intelligent scheduling system.',
  },
  {
    icon: Thermometer,
    title: 'Environmental Monitoring',
    description: 'Monitor temperature, humidity, and air quality for optimal learning environments.',
  },
  {
    icon: Shield,
    title: 'Secure Access',
    description: 'Role-based authentication for students, faculty, and administrators.',
  },
  {
    icon: Wifi,
    title: 'IoT Integration',
    description: 'Connect with sensors and devices for automated occupancy detection.',
  },
];

const stats = [
  { value: '50+', label: 'Buildings Monitored' },
  { value: '500+', label: 'Rooms Tracked' },
  { value: '10K+', label: 'Daily Users' },
  { value: '99.9%', label: 'Uptime' },
];

export default function LandingClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 truncate max-w-[180px] sm:max-w-none">CampusFlow</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Sign In
              </Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b absolute top-16 left-0 right-0 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <Link 
                href="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                <Button variant="outline" className="w-full justify-center">
                  Sign In
                </Button>
              </Link>
              <Link 
                href="/signup" 
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-center">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Now with AI-powered predictions
              </div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Smart Space Management for{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Modern Campuses
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Optimize your educational spaces with real-time occupancy tracking, 
                intelligent scheduling, and data-driven insights. Transform how your 
                campus operates.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white" />
                  ))}
                </div>
                <span>Trusted by 100+ universities worldwide</span>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-4 border">
                <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop"
                    alt="University Campus"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Occupancy</p>
                      <p className="text-xl font-bold text-gray-900">85%</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Available Rooms</p>
                      <p className="text-xl font-bold text-gray-900">12</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to manage your campus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools helps you optimize space utilization, 
              improve student experience, and make data-driven decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your campus?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the community at Lead City University to optimize our educational spaces.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Lead City University</span>
              </div>
              <p className="text-sm">
                Optimizing educational spaces through intelligent technology at Lead City University.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            © 2026 CampusFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
