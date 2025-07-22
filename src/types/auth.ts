
export interface User {
  id: string;
  email: string;
  display_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url?: string;
  level: number;
  total_xp: number;
  weekly_xp: number;
  total_questions: number;
  correct_answers: number;
  streak_dias: number;
  last_activity_date?: string;
  achievements: any[];
  area_stats: Record<string, { correct: number; total: number }>;
  created_at: string;
  updated_at: string;
}
