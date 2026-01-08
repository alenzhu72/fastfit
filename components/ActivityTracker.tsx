
import React from 'react';
import { Activity as ActivityType } from '../types';
import { MapPin, CheckCircle, Circle, PlayCircle } from 'lucide-react';

interface ActivityTrackerProps {
  activities: ActivityType[];
  overCalorieCount: number;
}

const ActivityTracker: React.FC<ActivityTrackerProps> = ({ activities, overCalorieCount }) => {
  const extraWalkingTime = Math.ceil(overCalorieCount / 6); // Simple heuristic: 6kcal/min walk

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="font-bold text-slate-200 flex items-center gap-2">
          <PlayCircle className="text-emerald-400 w-5 h-5" />
          Today's Movement
        </h3>
        {overCalorieCount > 0 && (
          <span className="text-[10px] font-bold text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full animate-pulse">
            {overCalorieCount} kcal Over Target
          </span>
        )}
      </div>

      {activities.map((act) => (
        <div key={act.id} className="bg-slate-800/40 border border-slate-700 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${act.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">{act.type}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${act.intensity === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                  {act.intensity}
                </span>
              </div>
              <h4 className="font-semibold text-slate-300">{act.title}</h4>
              <p className="text-xs text-slate-500">{act.duration} minutes target</p>
            </div>
          </div>
          <button className={`p-2 rounded-full transition-colors ${act.completed ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'}`}>
            {act.completed ? <CheckCircle className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
          </button>
        </div>
      ))}

      {overCalorieCount > 0 && (
        <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 p-4 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-orange-300">Walk-It-Off Required</h4>
              <p className="text-sm text-orange-200/80 mb-3">
                You've exceeded your daily target. Complete an extra {extraWalkingTime} min walk tonight.
              </p>
              <div className="flex gap-2">
                <button className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-full font-bold transition-all">
                  Start Walking
                </button>
                <button className="text-xs bg-slate-800/50 hover:bg-slate-800 text-slate-300 px-4 py-1.5 rounded-full font-bold border border-orange-500/20">
                  Alternative: 25 min Cycle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default ActivityTracker;
