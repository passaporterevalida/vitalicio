
-- Create subscribers table to track subscription information
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT,
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create usage_limits table to track user quotas
CREATE TABLE public.usage_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_questions_used INTEGER DEFAULT 0,
  monthly_simulados_used INTEGER DEFAULT 0,
  last_reset_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_limits ENABLE ROW LEVEL SECURITY;

-- Create policies for subscribers table
CREATE POLICY "select_own_subscription" ON public.subscribers
FOR SELECT
USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "update_own_subscription" ON public.subscribers
FOR UPDATE
USING (true);

CREATE POLICY "insert_subscription" ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Create policies for usage_limits table
CREATE POLICY "select_own_usage" ON public.usage_limits
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "update_own_usage" ON public.usage_limits
FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "insert_usage" ON public.usage_limits
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Function to reset daily limits
CREATE OR REPLACE FUNCTION public.reset_daily_limits()
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public.usage_limits 
  SET daily_questions_used = 0,
      last_reset_date = CURRENT_DATE,
      updated_at = now()
  WHERE last_reset_date < CURRENT_DATE;
END;
$function$;

-- Function to reset monthly limits
CREATE OR REPLACE FUNCTION public.reset_monthly_limits()
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public.usage_limits 
  SET monthly_simulados_used = 0,
      updated_at = now()
  WHERE EXTRACT(day FROM now()) = 1; -- First day of month
END;
$function$;

-- Tabela para registrar tentativas de missões por usuário
CREATE TABLE public.mission_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mission_id TEXT NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.mission_attempts ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para mission_attempts
CREATE POLICY "select_own_mission_attempts" ON public.mission_attempts
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "insert_own_mission_attempts" ON public.mission_attempts
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Função para contar tentativas de missão do usuário no mês atual
CREATE OR REPLACE FUNCTION public.count_mission_attempts_this_month(user_id_input UUID, mission_id_input TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  attempts_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO attempts_count
  FROM public.mission_attempts
  WHERE user_id = user_id_input
    AND mission_id = mission_id_input
    AND attempted_at >= date_trunc('month', now());
  RETURN attempts_count;
END;
$$;

-- Função para registrar nova tentativa de missão
CREATE OR REPLACE FUNCTION public.register_mission_attempt(user_id_input UUID, mission_id_input TEXT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.mission_attempts (user_id, mission_id, attempted_at)
  VALUES (user_id_input, mission_id_input, now());
END;
$$;

-- Função para reset mensal de tentativas de missão (opcional, se quiser limpar ou auditar)
-- CREATE OR REPLACE FUNCTION public.reset_monthly_mission_attempts()
-- RETURNS void
-- LANGUAGE plpgsql
-- AS $function$
-- BEGIN
--   DELETE FROM public.mission_attempts
--   WHERE attempted_at < date_trunc('month', now());
-- END;
-- $function$;
