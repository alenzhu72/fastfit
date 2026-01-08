
import React from 'react';
import { Compass, Calendar, Map, Check } from 'lucide-react';
import { WEEKEND_SUGGESTIONS } from '../constants';

const WeekendPlanner: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-bold text-slate-200 flex items-center gap-2">
          <Compass className="text-blue-400 w-5 h-5" />
          Singapore Outdoors
        </h3>
        <button className="text-xs text-blue-400 font-bold hover:underline">View All</button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
        {WEEKEND_SUGGESTIONS.map((item) => (
          <div 
            key={item.id} 
            className="min-w-[280px] snap-center bg-slate-800/40 border border-slate-700 rounded-3xl overflow-hidden flex flex-col"
          >
            <div className="h-32 relative">
              <img 
                src={`https://picsum.photos/seed/${item.id}travel/400/200`} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">{item.difficulty}</p>
              </div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <h4 className="font-bold text-slate-200 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                <Map className="w-3 h-3" /> {item.location}
              </p>
              
              <div className="bg-slate-900/40 rounded-2xl p-3 border border-slate-800 mb-4 flex-1">
                 <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Essential Pack List</p>
                 <ul className="space-y-1">
                   {item.packList.map((pack, idx) => (
                     <li key={idx} className="text-[10px] text-slate-400 flex items-center gap-1.5">
                       <Check className="w-3 h-3 text-emerald-400" /> {pack}
                     </li>
                   ))}
                 </ul>
              </div>

              <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2">
                <Calendar className="w-3 h-3" /> Add to Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekendPlanner;
