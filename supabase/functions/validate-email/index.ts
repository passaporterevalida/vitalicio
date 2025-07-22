import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { email } = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email é obrigatório" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    console.log(`[VALIDATE-EMAIL] Verificando autorização para: ${email}`);

    // Verificar se o e-mail está autorizado
    const { data: isAuthorized, error: checkError } = await supabaseClient
      .rpc('is_email_authorized', { email_to_check: email });

    if (checkError) {
      console.error('[VALIDATE-EMAIL] Erro ao verificar autorização:', checkError);
      return new Response(
        JSON.stringify({ error: "Erro interno ao verificar autorização" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Registrar tentativa de acesso
    const userAgent = req.headers.get("user-agent") || "unknown";
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    
                    await supabaseClient.rpc('log_access_attempt', {
                  email_address: email,
                  authorized: isAuthorized,
                  ip_addr: clientIP,
                  user_agent_text: userAgent,
                  notes_text: isAuthorized ? "Acesso autorizado" : "Acesso negado - email não autorizado"
                });

    if (!isAuthorized) {
      console.log(`[VALIDATE-EMAIL] Acesso negado para: ${email}`);
      return new Response(
        JSON.stringify({ 
          authorized: false,
          error: "Este e-mail não está autorizado para acessar o Revalida Quest. Entre em contato com o administrador para solicitar acesso."
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 }
      );
    }

    console.log(`[VALIDATE-EMAIL] Acesso autorizado para: ${email}`);
    return new Response(
      JSON.stringify({ authorized: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );

  } catch (error) {
    console.error('[VALIDATE-EMAIL] Erro inesperado:', error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
}); 