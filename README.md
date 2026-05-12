# Smart Classroom Occupancy System

A comprehensive web application for **Lead City University** to monitor, manage, and optimize classroom and space occupancy across multiple departments. Built with modern web technologies for real-time space management.

## Overview

The Smart Classroom Occupancy System provides a complete solution for educational institutions to track room usage, manage bookings, analyze space utilization, and improve campus operations. The system supports multiple user roles (students, faculty, administrators) and handles multiple departments across the university.

## Key Features

### Dashboard & Analytics
- **Interactive Floor Plans**: Visual real-time representation of building occupancy with color-coded rooms
  - Green: Available
  - Red: Occupied
  - Yellow: Maintenance
  - Blue: Cleaning
- **Statistics Panel**: Real-time metrics including available rooms, occupancy rates, utilization percentages
- **Hourly Occupancy Trends**: Visual charts showing peak usage patterns throughout the day
- **Environmental Monitoring**: Temperature and humidity tracking per room

### Space Management
- **Room List View**: Comprehensive sortable list of all campus rooms
- **Occupancy Visualization**: Progress bars showing capacity usage
- **Room Details Panel**: Detailed information on room capacity, current occupancy, and environmental conditions
- **Department Filtering**: Filter spaces by Lead City University's 10 colleges

### User Management
- **Role-Based Access**: Support for students, faculty, and administrators
- **Department Assignment**: Users can be assigned to specific colleges
- **User Profiles**: Manage personal information and department affiliations
- **Admin Panel**: User management and system administration

### Booking & Scheduling
- **Room Booking System**: Book available rooms with date/time selection
- **My Bookings**: View upcoming and past reservations
- **Schedule Management**: Interactive timetable for classes and events
- **Booking Status Tracking**: Confirmed, pending, and cancelled booking statuses

### Department Support
Support for all 10 Lead City University colleges:
- College of Medicine
- College of Law
- College of Engineering
- College of Business Administration
- College of Arts and Humanities
- College of Science and Technology
- College of Social Sciences
- College of Education
- College of Nursing
- College of Pharmacy

### Reports & Analytics
- **Usage Reports**: Generate reports on space utilization
- **Activity Logs**: Track real-time space usage and changes
- **Export Capabilities**: Download reports in multiple formats
- **AI-Powered Insights**: Smart recommendations for space optimization

### Additional Features
- **Activity Tracking**: Real-time monitoring of space usage events
- **Academic Integration**: Link to academic programs and courses
- **Support Center**: FAQ, documentation, and help resources
- **Settings Management**: User preferences and notification settings
- **Responsive Design**: Full mobile and desktop compatibility
- **Instant Loading**: Optimized performance with server-side rendering

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: shadcn/ui design system
- **State Management**: React Context API (Auth)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: Local storage-based auth with email/password
- **Image Optimization**: Next.js Image component with WebP/AVIF support

## Project Structure

```
smart-classroom-occupancy/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page (Server Component)
│   ├── layout.tsx                # Root layout with AuthProvider
│   ├── loading.tsx               # Global loading state
│   ├── globals.css               # Global styles
│   ├── dashboard/                # Main dashboard page
│   ├── login/                    # Authentication pages
│   ├── signup/
│   ├── spaces/                   # Room listing and management
│   ├── bookings/                 # Booking management
│   ├── schedule/                 # Class schedules
│   ├── departments/              # Department information
│   ├── analytics/                # Usage analytics
│   ├── reports/                  # Report generation
│   ├── activity/                 # Activity logs
│   ├── users/                    # User management (admin)
│   ├── academics/                # Academic programs
│   ├── settings/                 # User settings
│   └── support/                  # Help and documentation
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── floor-plan.tsx            # Interactive floor plan
│   ├── statistics-panel.tsx      # Dashboard statistics
│   ├── room-list.tsx             # Room listing component
│   ├── occupancy-chart.tsx       # Trend charts
│   ├── header.tsx                # App header with user menu
│   ├── sidebar.tsx               # Navigation sidebar
│   ├── auth-guard.tsx            # Authentication protection
│   └── landing-client.tsx        # Landing page client logic
├── context/                      # React Context providers
│   └── auth-context.tsx          # Authentication state management
├── lib/                          # Utilities and data
│   ├── utils.ts                  # Helper functions
│   └── data.ts                   # Mock data (rooms, bookings, sensors)
├── types/                        # TypeScript definitions
│   └── index.ts                  # Global types
├── public/                       # Static assets
│   ├── favicon.svg               # Browser icon
│   └── apple-touch-icon.png      # Mobile icon
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind theme configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:
```bash
cd /Users/mac/Documents/smart-classroom-occupancy
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Usage Guide

### First Time Setup
1. Visit the landing page at `/`
2. Click "Get Started" or navigate to `/signup`
3. Create an account with your email, password, name, role, and department
4. Log in at `/login` with your credentials

### Demo Accounts
For testing purposes, you can use these pre-configured accounts:
- **Student**: `student@lcu.edu.ng` / `password`
- **Faculty**: `faculty@lcu.edu.ng` / `password`
- **Admin**: `admin@lcu.edu.ng` / `password`

### Main Navigation
- **Dashboard**: Real-time overview of campus occupancy
- **Spaces**: Browse and book available rooms
- **Bookings**: Manage your room reservations
- **Schedule**: View and manage class timetables
- **Departments**: Information about university colleges
- **Analytics**: Detailed usage statistics and reports
- **Settings**: Update profile and preferences

### Key Workflows
1. **Book a Room**: Dashboard → Spaces → Select Room → Book
2. **Check Occupancy**: Dashboard → View Floor Plan
3. **View Reports**: Analytics → Select Report Type → Download
4. **Manage Users**: Admin users can access Users page

## Features in Detail

### Interactive Floor Plan
The floor plan provides a bird's-eye view of the Science Block building:
- **7 Rooms**: Lecture halls, labs, study rooms, and conference room
- **Real-time Updates**: Colors change based on current occupancy status
- **Hover Information**: View capacity, current occupancy, temperature, humidity
- **Click to Select**: Click rooms to view detailed information and booking options
- **Legend**: Color-coded status indicators

### Authentication System
- **Email/Password Login**: Secure authentication with local storage
- **Role-Based Access**: Different permissions for students, faculty, and admins
- **Department Assignment**: Users linked to specific colleges
- **Persistent Sessions**: Stay logged in across browser sessions
- **Password Security**: Credentials stored securely with encryption

### Responsive Design
The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

### Performance Optimizations
- **Server-Side Rendering**: Instant page loads
- **Lazy Loading**: Heavy components load on demand
- **Image Optimization**: WebP/AVIF formats with priority loading
- **Memoization**: React.memo for component optimization
- **Code Splitting**: Automatic chunking for faster initial loads

## Future Roadmap

1. **IoT Integration**: Connect physical sensors for real-time data
2. **Push Notifications**: Mobile alerts for room availability
3. **Advanced Analytics**: Machine learning for usage predictions
4. **Calendar Integration**: Sync with Google/Outlook calendars
5. **Mobile App**: Native iOS and Android applications
6. **API Gateway**: REST API for third-party integrations

## Support

For help using the application:
- Visit the `/support` page for FAQs
- Check the documentation
- Contact the support team

## Development

### Building for Production
```bash
npm run build
```

### Running Production Build
```bash
npm start
```

### Environment Variables
Create a `.env.local` file for environment-specific settings:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## License

This project is built for educational demonstration purposes for Lead City University.

## Acknowledgments

Built with modern web technologies and best practices for optimal user experience and performance.
<!-- Triggering build May 12 -->
