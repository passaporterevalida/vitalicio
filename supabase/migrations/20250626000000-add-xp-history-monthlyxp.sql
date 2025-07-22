-- Migration: Adiciona campos de histórico de XP e XP mensal ao perfil do usuário
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS xp_history JSONB DEFAULT '[]'::jsonb;

ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS monthly_xp INTEGER DEFAULT 0; 