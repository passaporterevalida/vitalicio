import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function logStep(step: string, data?: any) {
  console.log(`[test-stripe] ${step}`, data ? JSON.stringify(data) : '');
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // 1. Verificar variáveis de ambiente
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");

    logStep("Environment variables check", {
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseKey: !!supabaseKey,
      hasStripeKey: !!stripeKey,
      stripeKeyLength: stripeKey ? stripeKey.length : 0
    });

    if (!supabaseUrl || !supabaseKey || !stripeKey) {
      throw new Error("Missing environment variables");
    }

    // 2. Testar conexão com Supabase
    const supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    });

    logStep("Supabase client created");

    // 3. Testar conexão com Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    logStep("Stripe client created");

    // 4. Testar API do Stripe
    try {
      const account = await stripe.accounts.retrieve();
      logStep("Stripe account retrieved", { 
        id: account.id, 
        business_type: account.business_type 
      });
    } catch (stripeError) {
      logStep("Error retrieving Stripe account", { error: stripeError });
      throw new Error(`Stripe API error: ${stripeError instanceof Error ? stripeError.message : 'Unknown'}`);
    }

    // 5. Testar busca de customer específico
    const testCustomerId = "cus_ShrB4v0DLU7t1z"; // Customer ID do usuário
    try {
      const customer = await stripe.customers.retrieve(testCustomerId);
      logStep("Test customer retrieved", { 
        id: customer.id, 
        email: customer.email,
        created: customer.created 
      });
    } catch (customerError) {
      logStep("Error retrieving test customer", { error: customerError });
      throw new Error(`Customer retrieval error: ${customerError instanceof Error ? customerError.message : 'Unknown'}`);
    }

    // 6. Testar criação de portal session
    try {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: testCustomerId,
        return_url: "http://localhost:3000/profile",
      });
      
      logStep("Portal session created successfully", { 
        sessionId: portalSession.id, 
        url: portalSession.url 
      });

      return new Response(JSON.stringify({ 
        success: true,
        message: "All tests passed",
        portalUrl: portalSession.url,
        customerId: testCustomerId
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });

    } catch (portalError) {
      logStep("Error creating portal session", { error: portalError });
      throw new Error(`Portal creation error: ${portalError instanceof Error ? portalError.message : 'Unknown'}`);
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in test-stripe", { message: errorMessage });
    console.error('[test-stripe] Error:', errorMessage);
    
    return new Response(JSON.stringify({ 
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  } finally {
    console.log('[test-stripe] Function completed');
  }
}); 