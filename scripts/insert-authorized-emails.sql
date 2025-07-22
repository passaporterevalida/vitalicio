-- Script para inserir e-mails autorizados
-- Execute este script no SQL Editor do Supabase Dashboard

-- Limpar dados existentes (opcional)
-- DELETE FROM public.authorized_emails;

-- Inserir e-mails específicos autorizados
INSERT INTO public.authorized_emails (email, notes) VALUES 
  ('admin@revalidaquest.com', 'Administrador principal do sistema'),
  ('gabrielbzerra1998@gmail.com', 'Desenvolvedor do sistema'),
  ('teste@hospital.com', 'Usuário de teste hospital'),
  ('medico@clinica.com', 'Médico da clínica'),
  ('residente@universidade.edu.br', 'Residente médico');

-- Inserir domínios autorizados (todos os e-mails destes domínios serão autorizados)
INSERT INTO public.authorized_emails (domain, notes) VALUES 
  ('hospital.com', 'Domínio autorizado para hospitais'),
  ('clinica.com', 'Domínio autorizado para clínicas'),
  ('universidade.edu.br', 'Domínio autorizado para universidades'),
  ('usp.br', 'Universidade de São Paulo'),
  ('unifesp.edu.br', 'Universidade Federal de São Paulo'),
  ('ufmg.br', 'Universidade Federal de Minas Gerais'),
  ('ufrj.br', 'Universidade Federal do Rio de Janeiro'),
  ('ufc.br', 'Universidade Federal do Ceará'),
  ('ufpr.br', 'Universidade Federal do Paraná'),
  ('ufsc.br', 'Universidade Federal de Santa Catarina');

-- Verificar e-mails inseridos
SELECT 
  id,
  email,
  domain,
  is_active,
  added_at,
  notes
FROM public.authorized_emails 
ORDER BY added_at DESC;

-- Verificar função de validação
SELECT public.is_email_authorized('admin@revalidaquest.com') as admin_authorized;
SELECT public.is_email_authorized('medico@hospital.com') as hospital_authorized;
SELECT public.is_email_authorized('usuario@naoautorizado.com') as unauthorized; 