'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OccupancyData {
  hour: string;
  occupancy: number;
  capacity: number;
}

const mockHourlyData: OccupancyData[] = [
  { hour: '08:00', occupancy: 45, capacity: 100 },
  { hour: '09:00', occupancy: 78, capacity: 100 },
  { hour: '10:00', occupancy: 92, capacity: 100 },
  { hour: '11:00', occupancy: 85, capacity: 100 },
  { hour: '12:00', occupancy: 65, capacity: 100 },
  { hour: '13:00', occupancy: 45, capacity: 100 },
  { hour: '14:00', occupancy: 88, capacity: 100 },
  { hour: '15:00', occupancy: 95, capacity: 100 },
  { hour: '16:00', occupancy: 72, capacity: 100 },
  { hour: '17:00', occupancy: 35, capacity: 100 },
];

export function OccupancyChart() {
  const maxValue = Math.max(...mockHourlyData.map(d => d.occupancy));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Hourly Occupancy Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-between gap-2">
          {mockHourlyData.map((data, index) => {
            const height = (data.occupancy / maxValue) * 100;
            const isPeak = data.occupancy > 90;
            const isHigh = data.occupancy > 70;

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div className="relative w-full flex justify-center">
                  {/* Tooltip */}
                  <div className="absolute -top-8 opacity-0 hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                    {data.occupancy}%
                  </div>
                  
                  {/* Bar */}
                  <div
                    className={`w-full max-w-[40px] rounded-t transition-all duration-500 hover:opacity-80 ${
                      isPeak ? 'bg-red-500' : isHigh ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  />
                </div>
                
                {/* X-axis label */}
                <span className="text-xs text-gray-500 mt-1">{data.hour}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded" />
            <span className="text-gray-600">Normal (&lt;70%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded" />
            <span className="text-gray-600">High (70-90%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded" />
            <span className="text-gray-600">Peak (&gt;90%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
