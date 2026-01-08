
export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  photoUrl?: string;
  isCustom?: boolean;
  expanded?: boolean;
}

export interface Activity {
  id: string;
  type: 'Morning' | 'Evening' | 'Extra';
  title: string;
  duration: number; // minutes
  completed: boolean;
  intensity: 'Low' | 'Moderate' | 'High';
}

export interface WeekendPlan {
  id: string;
  title: string;
  location: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  duration: string;
  description: string;
  packList: string[];
}

export interface UserStats {
  currentWeight: number;
  targetWeight: number;
  dailyCalorieTarget: number;
  streakDays: number;
}
