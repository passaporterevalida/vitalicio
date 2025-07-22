
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    console.log('[check-subscription] Início da execução');
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");
    
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Buscar dados de assinatura diretamente do banco
    const { data: subscriberData, error: subscriberError } = await supabaseClient
      .from("subscribers")
      .select("*")
      .eq("email", user.email)
      .single();

    if (subscriberError && subscriberError.code !== 'PGRST116') {
      throw new Error(`Database error: ${subscriberError.message}`);
    }

    logStep("Subscriber data retrieved", { 
      found: !!subscriberData,
      subscribed: subscriberData?.subscribed,
      tier: subscriberData?.subscription_tier
    });

    // Se não encontrou dados ou não está inscrito
    if (!subscriberData || !subscriberData.subscribed) {
      logStep("No active subscription found");
      return new Response(JSON.stringify({ 
        subscribed: false,
        subscription_tier: null,
        subscription_end: null
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Verificar se a assinatura não expirou
    const now = new Date();
    const subscriptionEnd = subscriberData.subscription_end ? new Date(subscriberData.subscription_end) : null;
    
    if (subscriptionEnd && subscriptionEnd < now) {
      logStep("Subscription expired", { 
        subscriptionEnd: subscriptionEnd.toISOString(),
        now: now.toISOString()
      });
      
      // Atualizar status para expirado
      await supabaseClient.from("subscribers").update({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
        updated_at: now.toISOString()
      }).eq("email", user.email);
      
      return new Response(JSON.stringify({ 
        subscribed: false,
        subscription_tier: null,
        subscription_end: null
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    logStep("Active subscription found", {
      tier: subscriberData.subscription_tier,
      endDate: subscriberData.subscription_end,
      subscribed: subscriberData.subscribed
    });

    return new Response(JSON.stringify({
      subscribed: subscriberData.subscribed,
      subscription_tier: subscriberData.subscription_tier,
      subscription_end: subscriberData.subscription_end
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    console.error('[check-subscription] Error:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  } finally {
    console.log('[check-subscription] Fim da execução');
  }
});
