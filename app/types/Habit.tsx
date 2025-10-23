export interface Habit {
    id: string;
    name: string;
    completionDates: string[];
    createdAt: string;
    period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}
