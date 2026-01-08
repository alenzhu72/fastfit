
import React from 'react';
import { Clock, Droplet, Utensils, Moon } from 'lucide-react';

interface TimelineProps {
  currentTime: Date;
}

const Timeline: React.FC<TimelineProps> = ({ currentTime }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentPosition = ((currentHour + currentMinute / 60) / 24) * 100;

  const isEatingWindow = (h: number) => h >= 15 && h < 21;

  return (
    <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 backdrop-blur-sm shadow-xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Clock className="text-blue-400 w-5 h-5" />
          Daily Fasting Journey
        </h3>
        <span className="text-sm font-medium px-3 py-1 bg-slate-700 rounded-full">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <div className="relative h-20 w-full mb-8">
        {/* Background Bar */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-8 bg-slate-700 rounded-full flex overflow-hidden">
          {hours.map((h) => (
            <div
              key={h}
              className={`flex-1 ${isEatingWindow(h) ? 'bg-emerald-500/40' : 'bg-blue-500/20'}`}
            />
          ))}
        </div>

        {/* Labels & Icons */}
        <div className="absolute top-0 w-full h-full flex justify-between px-2 pointer-events-none">
          <div className="absolute left-[0%] -top-2 flex flex-col items-center">
            <Moon className="w-4 h-4 text-slate-500 mb-1" />
            <span className="text-[10px] text-slate-500">00:00</span>
          </div>
          <div className="absolute left-[35.4%] -top-2 flex flex-col items-center">
            <Droplet className="w-4 h-4 text-blue-400 mb-1" />
            <span className="text-[10px] text-blue-400 font-bold">08:30</span>
          </div>
          <div className="absolute left-[62.5%] -top-2 flex flex-col items-center">
            <Utensils className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-[10px] text-emerald-400 font-bold">15:00</span>
          </div>
          <div className="absolute left-[87.5%] -top-2 flex flex-col items-center">
            <Droplet className="w-4 h-4 text-blue-400 mb-1" />
            <span className="text-[10px] text-blue-400 font-bold">21:00</span>
          </div>
        </div>

        {/* Indicator */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-1000 z-10"
          style={{ left: `${currentPosition}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-slate-900" />
        </div>
      </div>

      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-blue-500/40 rounded-sm" />
          <span className="text-slate-400">Fasting</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
          <span className="text-slate-400">Eating (15-21)</span>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
