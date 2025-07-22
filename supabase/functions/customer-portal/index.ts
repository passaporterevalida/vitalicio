
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function logStep(step: string, data?: any) {
  console.log(`[customer-portal] ${step}`, data ? JSON.stringify(data) : '');
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

    // Buscar dados de assinatura para obter customer_id
    logStep("Fetching subscriber data", { email: user.email });
    
    const { data: subscriberData, error: subscriberError } = await supabaseClient
      .from("subscribers")
      .select("stripe_customer_id, subscribed, subscription_tier")
      .eq("email", user.email)
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
      logStep("No subscriber data found", { email: user.email });
      throw new Error("No subscription data found for this user");
    }

    if (!subscriberData.stripe_customer_id) {
      logStep("No stripe_customer_id found", { email: user.email, subscribed: subscriberData.subscribed });
      throw new Error("No Stripe customer ID found for this user");
    }

    if (subscriberData.stripe_customer_id.trim() === '') {
      logStep("Empty stripe_customer_id", { email: user.email });
      throw new Error("Stripe customer ID is empty");
    }

    logStep("Stripe customer ID found", { customerId: subscriberData.stripe_customer_id });

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      logStep("ERROR: STRIPE_SECRET_KEY not found");
      throw new Error("Stripe configuration error");
    }
    
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
    logStep("Stripe client created");

    const origin = req.headers.get("origin") || "http://localhost:3000";
    logStep("Creating portal session", { origin, customerId: subscriberData.stripe_customer_id });
    
    try {
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: subscriberData.stripe_customer_id,
        return_url: `${origin}/profile`,
    });
      
      logStep("Portal session created successfully", { sessionId: portalSession.id, url: portalSession.url });

    return new Response(JSON.stringify({ url: portalSession.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    } catch (stripeError) {
      logStep("Error creating portal session", { error: stripeError });
      throw new Error(`Stripe error: ${stripeError instanceof Error ? stripeError.message : 'Unknown error'}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in customer-portal", { message: errorMessage });
    console.error('[customer-portal] Error:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  } finally {
    console.log('[customer-portal] Fim da execução');
  }
});
