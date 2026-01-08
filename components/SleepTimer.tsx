
import React, { useState, useEffect } from 'react';
import { Moon, Bell, BellRing, Wind } from 'lucide-react';

const SleepTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const [hasWarned, setHasWarned] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date();
      target.setHours(23, 30, 0);

      const diff = target.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft('BED TIME');
        return;
      }

      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);

      // 23:25 Chime Warning
      if (now.getHours() === 23 && now.getMinutes() === 25 && !hasWarned) {
        playWindChime();
        setHasWarned(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hasWarned]);

  const playWindChime = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 2);
  };

  return (
    <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-3xl p-6 relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
        <Moon className="w-32 h-32" />
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-indigo-200 flex items-center gap-2 mb-1">
            <Moon className="w-4 h-4" />
            Sleep Protection
          </h3>
          <p className="text-3xl font-black text-white tracking-tighter">
            {timeLeft}
          </p>
          <p className="text-xs text-indigo-300/70 mt-1 uppercase tracking-widest font-bold">
            Until 23:30 Cut-off
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-2">
           <div className={`p-3 rounded-full ${hasWarned ? 'bg-indigo-500 animate-pulse' : 'bg-slate-800'}`}>
              {hasWarned ? <BellRing className="text-white" /> : <Bell className="text-slate-500" />}
           </div>
           <button 
             onClick={playWindChime}
             className="text-[10px] text-indigo-400 font-bold flex items-center gap-1 hover:text-indigo-300 transition-colors"
           >
             <Wind className="w-3 h-3" /> Test Chime
           </button>
        </div>
      </div>
      
      <div className="mt-6 flex gap-3">
        <div className="flex-1 bg-indigo-950/40 rounded-xl p-2 border border-indigo-500/10 text-center">
          <p className="text-[10px] text-indigo-400 font-bold uppercase">Target</p>
          <p className="text-sm font-bold text-white">23:30</p>
        </div>
        <div className="flex-1 bg-indigo-950/40 rounded-xl p-2 border border-indigo-500/10 text-center">
          <p className="text-[10px] text-indigo-400 font-bold uppercase">Warning</p>
          <p className="text-sm font-bold text-white">23:25</p>
        </div>
        <div className="flex-1 bg-indigo-950/40 rounded-xl p-2 border border-indigo-500/10 text-center">
          <p className="text-[10px] text-indigo-400 font-bold uppercase">Wake Up</p>
          <p className="text-sm font-bold text-white">07:30</p>
        </div>
      </div>
    </div>
  );
};

export default SleepTimer;
