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

    const payload = await req.json();
    
    console.log('[KIWIFY-WEBHOOK] Evento recebido:', payload.event);
    console.log('[KIWIFY-WEBHOOK] Produto:', payload.product?.name);
    console.log('[KIWIFY-WEBHOOK] Cliente:', payload.customer?.email);

    // Verificar se é uma compra do Passaporte Revalida
    if (payload.event === 'purchase.completed' && 
        payload.product?.name?.toLowerCase().includes('passaporte revalida')) {
      
      const customerEmail = payload.customer?.email;
      
      if (customerEmail) {
        console.log(`[KIWIFY-WEBHOOK] Processando autorização para: ${customerEmail}`);
        
        // Verificar se o e-mail já está autorizado
        const { data: isAlreadyAuthorized, error: checkError } = await supabaseClient
          .rpc('is_email_authorized', { email_to_check: customerEmail });

        if (checkError) {
          console.error('[KIWIFY-WEBHOOK] Erro ao verificar autorização existente:', checkError);
        }

        if (isAlreadyAuthorized) {
          console.log(`[KIWIFY-WEBHOOK] E-mail já autorizado: ${customerEmail}`);
          return new Response(
            JSON.stringify({ 
              success: true, 
              message: "E-mail já estava autorizado",
              email: customerEmail 
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
          );
        }

        // Adicionar e-mail automaticamente como autorizado
        const { data, error } = await supabaseClient.rpc('add_authorized_email', {
          email_address: customerEmail,
          notes_text: `Compra automática - Passaporte Revalida - ${new Date().toISOString()} - Order: ${payload.order?.id || 'N/A'}`
        });

        if (error) {
          console.error('[KIWIFY-WEBHOOK] Erro ao autorizar e-mail:', error);
          return new Response(
            JSON.stringify({ error: "Erro ao processar autorização" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
          );
        }

        console.log(`[KIWIFY-WEBHOOK] E-mail autorizado automaticamente: ${customerEmail}`);
        
        // Registrar tentativa de acesso como autorizada
        await supabaseClient.rpc('log_access_attempt', {
          email_address: customerEmail,
          authorized: true,
          ip_addr: null,
          user_agent_text: null,
          notes_text: 'Autorização automática via webhook Kiwify'
        });

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "E-mail autorizado com sucesso",
            email: customerEmail,
            order_id: payload.order?.id
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
        );
      } else {
        console.error('[KIWIFY-WEBHOOK] E-mail do cliente não encontrado no payload');
        return new Response(
          JSON.stringify({ error: "E-mail do cliente não encontrado" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
    } else {
      console.log('[KIWIFY-WEBHOOK] Evento não relacionado ao Passaporte Revalida:', payload.event);
    }

    return new Response(
      JSON.stringify({ message: "Evento processado" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );

  } catch (error) {
    console.error('[KIWIFY-WEBHOOK] Erro inesperado:', error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
}); 