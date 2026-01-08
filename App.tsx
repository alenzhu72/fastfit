
import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingDown, User, Settings, Bell, FastForward, Info } from 'lucide-react';
import Timeline from './components/Timeline';
import MealCard from './components/MealCard';
import ActivityTracker from './components/ActivityTracker';
import SleepTimer from './components/SleepTimer';
import WeekendPlanner from './components/WeekendPlanner';
import { Meal, Activity, UserStats } from './types';

const mockWeightData = [
  { day: 'W1', weight: 92 },
  { day: 'W2', weight: 91.2 },
  { day: 'W3', weight: 90.5 },
  { day: 'W4', weight: 90.1 },
  { day: 'W5', weight: 89.4 },
  { day: 'W6', weight: 88.8 },
];

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState<UserStats>({
    currentWeight: 88.8,
    targetWeight: 80.0,
    dailyCalorieTarget: 1800,
    streakDays: 42
  });

  const [meals, setMeals] = useState<Meal[]>([
    { id: 'm1', name: '', time: '15:00', calories: 0, protein: 0, carbs: 0, fat: 0 },
    { id: 'm2', name: '', time: '18:00', calories: 0, protein: 0, carbs: 0, fat: 0 },
    { id: 'm3', name: '', time: '20:30', calories: 0, protein: 0, carbs: 0, fat: 0 },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { id: 'a1', type: 'Morning', title: 'Brisk Walk + Stretch', duration: 25, completed: true, intensity: 'Moderate' },
    { id: 'a2', type: 'Evening', title: 'Neighborhood Brisk Walk', duration: 30, completed: false, intensity: 'Moderate' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const overCalorieCount = Math.max(0, totalCalories - stats.dailyCalorieTarget);

  const handleMealUpdate = (updatedMeal: Meal) => {
    setMeals(prev => prev.map(m => m.id === updatedMeal.id ? updatedMeal : m));
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-slate-950 pb-24 shadow-2xl relative">
      {/* Header with Safe Area support */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl px-6 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <FastForward className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-white">FASTFIT</h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950" />
          </button>
          <button className="p-2 text-slate-400 hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-6 space-y-8">
        {/* Progress Card */}
        <section className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-[2.5rem] border border-slate-700 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingDown className="w-24 h-24" />
          </div>
          
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Progress</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">{stats.currentWeight}</span>
                <span className="text-lg font-medium text-slate-500">kg</span>
                <span className="text-xs text-emerald-400 font-bold ml-2">-{92 - stats.currentWeight}kg lost</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Target 80kg</p>
              <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full" 
                  style={{ width: `${((92 - stats.currentWeight) / 12) * 100}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockWeightData}>
                <XAxis dataKey="day" hide />
                <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#1e293b' }} 
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Timeline */}
        <Timeline currentTime={currentTime} />

        {/* Fasting Info */}
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl flex items-center gap-4">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-blue-300">Fast Ends in 4h 22m</h4>
            <p className="text-xs text-blue-300/60">Wait for the 15:00 window to open. Keep hydrated!</p>
          </div>
        </div>

        {/* Meals */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-slate-200">Today's Nutrition</h3>
            <span className="text-xs text-slate-400">{totalCalories} / {stats.dailyCalorieTarget} kcal</span>
          </div>
          {meals.map(meal => (
            <MealCard key={meal.id} meal={meal} onUpdate={handleMealUpdate} />
          ))}
        </section>

        {/* Activity */}
        <ActivityTracker activities={activities} overCalorieCount={overCalorieCount} />

        {/* Sleep Timer */}
        <SleepTimer />

        {/* Weekend Planner */}
        <WeekendPlanner />

      </main>

      {/* Bottom Nav with Safe Area support */}
      <nav className="fixed bottom-0 w-full max-w-md bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-8 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 flex justify-between items-center z-40">
        <NavIcon icon={<HomeIcon />} active label="Home" />
        <NavIcon icon={<StatIcon />} label="Insights" />
        <button className="bg-emerald-500 -mt-12 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] border-4 border-slate-950 hover:scale-105 transition-transform active:scale-95">
          <span className="text-2xl text-white">+</span>
        </button>
        <NavIcon icon={<CommunityIcon />} label="Discover" />
        <NavIcon icon={<SettingsIcon />} label="Plan" />
      </nav>
    </div>
  );
};

const NavIcon = ({ icon, active = false, label }: { icon: React.ReactNode, active?: boolean, label: string }) => (
  <div className={`flex flex-col items-center gap-1 ${active ? 'text-emerald-400' : 'text-slate-500'} active:scale-90 transition-transform`}>
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </div>
);

const HomeIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>;
const StatIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg>;
const CommunityIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
const SettingsIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>;

export default App;
