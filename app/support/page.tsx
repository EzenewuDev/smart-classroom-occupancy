'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { AuthGuard } from '@/components/auth-guard';
import { 
  HelpCircle, 
  Search, 
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Video,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const FAQS = [
  {
    question: 'How do I book a room or space?',
    answer: 'Navigate to the Spaces page, find an available room, and click "Book Now". You can also use the "Book Room" button from the dashboard. Select your preferred time slot and confirm your booking.',
  },
  {
    question: 'Can I cancel or modify my booking?',
    answer: 'Yes, go to your Bookings page, find the booking you want to modify, and click on the options menu. You can cancel up to 1 hour before your scheduled time without penalty.',
  },
  {
    question: 'How do I check room availability in real-time?',
    answer: 'The dashboard shows real-time occupancy data for all spaces. Green indicates available, red means occupied, yellow shows maintenance, and blue indicates cleaning in progress.',
  },
  {
    question: 'What if a room shows occupied but is empty?',
    answer: 'Sometimes sensors may have a slight delay. If you notice a discrepancy, please report it via the feedback form or contact facilities management directly.',
  },
  {
    question: 'How do I report a maintenance issue?',
    answer: 'Click on "Support" in the sidebar, then select "Report Issue". Fill out the form with details about the problem and the room location. Our team will respond within 24 hours.',
  },
  {
    question: 'Can I book spaces for external events?',
    answer: 'External bookings require special approval. Please contact the Administration office at admin@lcu.edu.ng or call +234 123 456 7890 for assistance.',
  },
];

const SUPPORT_CHANNELS = [
  {
    title: 'Live Chat',
    description: 'Chat with our support team',
    icon: MessageCircle,
    action: 'Start Chat',
    available: '9AM - 5PM WAT',
  },
  {
    title: 'Email Support',
    description: 'Get help via email',
    icon: Mail,
    action: 'Send Email',
    available: '24/7 Response',
    link: 'mailto:support@lcu.edu.ng',
  },
  {
    title: 'Phone Support',
    description: 'Call our helpline',
    icon: Phone,
    action: 'Call Now',
    available: 'Mon-Fri, 8AM-6PM',
    link: 'tel:+2341234567890',
  },
];

const RESOURCES = [
  { title: 'User Guide', icon: FileText, desc: 'Complete system documentation' },
  { title: 'Video Tutorials', icon: Video, desc: 'Step-by-step video guides' },
  { title: 'System Status', icon: CheckCircle2, desc: 'Check service availability' },
];

export default function SupportPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Help & Support</h1>
              <p className="text-gray-600">Find answers or get in touch with our support team</p>
            </div>

            {/* Search */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>

            {/* Support Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {SUPPORT_CHANNELS.map((channel) => (
                <div key={channel.title} className="bg-white rounded-lg border p-5 text-center hover:shadow-md transition-shadow">
                  <channel.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">{channel.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{channel.description}</p>
                  <p className="text-xs text-gray-400 mb-3 flex items-center justify-center gap-1">
                    <Clock className="h-3 w-3" />
                    {channel.available}
                  </p>
                  {channel.link ? (
                    <a href={channel.link}>
                      <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                        {channel.action}
                      </Button>
                    </a>
                  ) : (
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                      {channel.action}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* FAQ Section */}
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {filteredFaqs.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-lg border overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        {openFaq === idx ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      {openFaq === idx && (
                        <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8 bg-white rounded-lg border">
                    <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No results found. Try a different search term.</p>
                  </div>
                )}
              </div>

              {/* Resources */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
                <div className="space-y-3">
                  {RESOURCES.map((resource) => (
                    <div 
                      key={resource.title}
                      className="bg-white rounded-lg border p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <resource.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{resource.title}</h3>
                        <p className="text-sm text-gray-500">{resource.desc}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>

                {/* Contact Card */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-5 mt-6 text-white">
                  <h3 className="font-semibold mb-2">Still need help?</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Our support team is available to assist you with any issues.
                  </p>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 w-full">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
