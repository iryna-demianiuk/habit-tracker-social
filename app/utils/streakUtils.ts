import { Habit } from '@/app/types/Habit';

export const getPeriodString = (date: Date, period: string) => {
  switch (period) {
    case 'daily':
      return date.toISOString().split('T')[0]; // "2025-10-15"
    case 'weekly':
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      return weekStart.toISOString().split('T')[0]; // "2025-10-13" (Monday)
    case 'monthly':
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // "2025-10"
    case 'yearly':
      return date.getFullYear().toString(); // "2025"
    default:
      return date.toISOString().split('T')[0];
  }
};

export const hasCompletionInPeriod = (dates: string[], periodStr: string, period: string) => {
  return dates.some(date => {
    const completionDate = new Date(date);
    const completionPeriod = getPeriodString(completionDate, period);
    return completionPeriod === periodStr;
  });
};

export const getPreviousPeriod = (date: Date, period: string) => {
  const newDate = new Date(date);
  switch (period) {
    case 'daily':
      newDate.setDate(date.getDate() - 1);
      break;
    case 'weekly':
      newDate.setDate(date.getDate() - 7);
      break;
    case 'monthly':
      newDate.setMonth(date.getMonth() - 1);
      break;
    case 'yearly':
      newDate.setFullYear(date.getFullYear() - 1);
      break;
  }
  return newDate;
};

export const getCurrentStreak = (habit: Habit) => {
  if (habit.completionDates.length === 0) return 0;

  const sortedDates = [...habit.completionDates].sort();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentPeriod = new Date(today);

  while (true) {
    const periodStr = getPeriodString(currentPeriod, habit.period);
    
    if (hasCompletionInPeriod(sortedDates, periodStr, habit.period)) {
      streak++;
      currentPeriod = getPreviousPeriod(currentPeriod, habit.period);
    } else {
      break;
    }
  }

  return streak;
};

export const getBestStreak = (habit: Habit) => {
  if (habit.completionDates.length === 0) return 0;

  const sortedDates = [...habit.completionDates].sort();
  let bestStreak = 0;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currDate = new Date(sortedDates[i]);
    
    // Check if dates are in consecutive periods
    if (areConsecutivePeriods(prevDate, currDate, habit.period)) {
      // Consecutive period
      currentStreak++;
    } else {
      // Streak broken, check if this was the best
      bestStreak = Math.max(bestStreak, currentStreak);
      currentStreak = 1;
    }
  }
  
  // Check the last streak
  bestStreak = Math.max(bestStreak, currentStreak);
  
  return bestStreak;
};

const areConsecutivePeriods = (date1: Date, date2: Date, period: string) => {
  switch (period) {
    case 'daily':
      const daysDiff = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff === 1;
    
    case 'weekly':
      // Check if dates are in consecutive weeks
      const week1Start = new Date(date1);
      week1Start.setDate(date1.getDate() - date1.getDay());
      const week2Start = new Date(date2);
      week2Start.setDate(date2.getDate() - date2.getDay());
      const weeksDiff = (week2Start.getTime() - week1Start.getTime()) / (1000 * 60 * 60 * 24 * 7);
      return weeksDiff === 1;
    
    case 'monthly':
      // Check if dates are in consecutive months
      const monthsDiff = (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth());
      return monthsDiff === 1;
    
    case 'yearly':
      // Check if dates are in consecutive years
      const yearsDiff = date2.getFullYear() - date1.getFullYear();
      return yearsDiff === 1;
    
    default:
      return false;
  }
};

export const getTotalCompletions = (habit: Habit) => {
  return habit.completionDates.length;
};

export const getCompletionsThisWeek = (habit: Habit) => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);
  
  return habit.completionDates.filter(date => 
    new Date(date) >= startOfWeek
  ).length;
};

export const getCompletionsThisMonth = (habit: Habit) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  return habit.completionDates.filter(date => 
    new Date(date) >= startOfMonth
  ).length;
};

export const getLastCompletionDate = (habit: Habit) => {
  if (habit.completionDates.length === 0) return null;
  
  const sortedDates = [...habit.completionDates].sort();
  return sortedDates[sortedDates.length - 1]; // Most recent
};

export const getDaysSinceLastCompletion = (habit: Habit) => {
  const lastDate = getLastCompletionDate(habit);
  if (!lastDate) return null;
  
  const lastCompletion = new Date(lastDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - lastCompletion.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};
