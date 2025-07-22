import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function logStep(step: string, data?: any) {
  console.log(`[test-customer-portal-simple] ${step}`, data ? JSON.stringify(data) : '');
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Buscar dados do usuário específico diretamente (sem autenticação)
    const email = "scalperline@gmail.com";
    logStep("Fetching subscriber data", { email });
    
    const { data: subscriberData, error: subscriberError } = await supabaseClient
      .from("subscribers")
      .select("stripe_customer_id, subscribed, subscription_tier")
      .eq("email", email)
      .single();

    if (subscriberError) {
      logStep("Error fetching subscriber data", { error: subscriberError.message, code: subscriberError.code });
      throw new Error(`Database error: ${subscriberError.message}`);
    }

    logStep("Subscriber data retrieved", { 
      hasData: !!subscriberData, 
      stripeCustomerId: subscriberData?.stripe_customer_id,
      subscribed: subscriberData?.subscribed,
      tier: subscriberData?.subscription_tier
    });

    if (!subscriberData) {
      logStep("No subscriber data found", { email });
      throw new Error("No subscription data found for this user");
    }

    if (!subscriberData.stripe_customer_id) {
      logStep("No stripe_customer_id found", { email, subscribed: subscriberData.subscribed });
      throw new Error("No Stripe customer ID found for this user");
    }

    logStep("Stripe customer ID found", { customerId: subscriberData.stripe_customer_id });

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      logStep("ERROR: STRIPE_SECRET_KEY not found");
      throw new Error("Stripe configuration error");
    }
    
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
    logStep("Stripe client created");

    const origin = req.headers.get("origin") || "https://revalidaquest.com";
    logStep("Creating portal session", { origin, customerId: subscriberData.stripe_customer_id });
    
    try {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: subscriberData.stripe_customer_id,
        return_url: `${origin}/profile`,
      });
      
      logStep("Portal session created successfully", { sessionId: portalSession.id, url: portalSession.url });

      return new Response(JSON.stringify({ 
        success: true,
        url: portalSession.url,
        data: {
          customerId: subscriberData.stripe_customer_id,
          email: email,
          tier: subscriberData.subscription_tier
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } catch (stripeError) {
      logStep("Error creating portal session", { error: stripeError });
      throw new Error(`Stripe error: ${stripeError instanceof Error ? stripeError.message : 'Unknown error'}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in test-customer-portal-simple", { message: errorMessage });
    console.error('[test-customer-portal-simple] Error:', errorMessage);
    return new Response(JSON.stringify({ 
      success: false,
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  } finally {
    console.log('[test-customer-portal-simple] Fim da execução');
  }
}); 