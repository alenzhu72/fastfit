
import React, { useState } from 'react';
import { Camera, ChevronDown, ChevronUp, Zap, Sparkles, Scale } from 'lucide-react';
import { Meal } from '../types';
import { gemini } from '../services/geminiService';

interface MealCardProps {
  meal: Meal;
  onUpdate: (updatedMeal: Meal) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onUpdate }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleExpand = () => {
    onUpdate({ ...meal, expanded: !meal.expanded });
  };

  const handleCameraClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // Simulate camera capture
    setIsAnalyzing(true);
    
    // In a real app, we'd get a base64 from a file input or camera stream
    // Using a placeholder base64 for simulation
    const mockBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
    
    const analysis = await gemini.analyzeMealImage(mockBase64, `Analyze this typical Singaporean meal at ${meal.time}. Estimate portions.`);
    
    if (analysis) {
      onUpdate({
        ...meal,
        name: analysis.name,
        calories: analysis.calories,
        protein: analysis.protein,
        carbs: analysis.carbs,
        fat: analysis.fat,
        expanded: true,
        photoUrl: `https://picsum.photos/seed/${meal.id}/400/300`
      });
    }
    setIsAnalyzing(false);
  };

  return (
    <div 
      className={`bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 ${meal.expanded ? 'ring-2 ring-emerald-500/50 mb-4' : 'hover:bg-slate-800/60 cursor-pointer'}`}
      onClick={toggleExpand}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${meal.calories > 0 ? 'bg-emerald-500' : 'bg-slate-700 text-slate-400'}`}>
            {meal.photoUrl ? (
              <img src={meal.photoUrl} alt="Meal" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <UtensilsIcon />
            )}
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{meal.time}</p>
            <h4 className="font-semibold text-slate-200">{meal.name || 'Log Your Meal'}</h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {meal.calories > 0 && (
            <div className="text-right">
              <span className="text-emerald-400 font-bold text-lg">{meal.calories}</span>
              <span className="text-[10px] text-slate-500 block">kcal</span>
            </div>
          )}
          <button 
            onClick={handleCameraClick}
            disabled={isAnalyzing}
            className={`p-2 rounded-full transition-colors ${isAnalyzing ? 'bg-slate-700 animate-pulse' : 'bg-slate-700 hover:bg-slate-600'}`}
          >
            <Camera className="w-5 h-5 text-slate-300" />
          </button>
          {meal.expanded ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
        </div>
      </div>

      {meal.expanded && (
        <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <MacroStat label="Protein" value={meal.protein} unit="g" color="bg-blue-500" />
            <MacroStat label="Carbs" value={meal.carbs} unit="g" color="bg-orange-500" />
            <MacroStat label="Fat" value={meal.fat} unit="g" color="bg-yellow-500" />
          </div>

          <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700">
            <p className="text-xs text-slate-400 flex items-center gap-2 mb-2">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Preparation Tips
            </p>
            <p className="text-sm text-slate-300 italic">
              "To lower the calorie count, try swapping the sugary side drink for plain water or black coffee. Focus on high protein to stay satiated during your fast."
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-semibold">
              Edit Details
            </button>
            <button className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-semibold">
              Confirm Meal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MacroStat = ({ label, value, unit, color }: { label: string, value: number, unit: string, color: string }) => (
  <div className="bg-slate-900/40 rounded-xl p-2 text-center border border-slate-800">
    <div className={`w-1.5 h-1.5 rounded-full ${color} mx-auto mb-1`} />
    <p className="text-[10px] text-slate-500 uppercase">{label}</p>
    <p className="text-sm font-bold text-slate-200">{value}{unit}</p>
  </div>
);

const UtensilsIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m12 4a2 2 0 100-4m0 4a2 2 0 110-4" />
  </svg>
);

export default MealCard;
