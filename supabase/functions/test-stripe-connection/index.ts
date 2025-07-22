import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function logStep(step: string, data?: any) {
  console.log(`[test-stripe-connection] ${step}`, data ? JSON.stringify(data) : '');
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // 1. Verificar se a variável de ambiente existe
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      logStep("ERROR: STRIPE_SECRET_KEY not found");
      return new Response(JSON.stringify({ 
        error: "STRIPE_SECRET_KEY not configured",
        step: "environment_variable"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    logStep("STRIPE_SECRET_KEY found", { 
      length: stripeSecretKey.length,
      startsWith: stripeSecretKey.substring(0, 3)
    });

    // 2. Criar cliente Stripe
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
    logStep("Stripe client created");

    // 3. Testar conectividade com Stripe
    logStep("Testing Stripe connectivity");
    const account = await stripe.accounts.retrieve();
    logStep("Stripe account retrieved", { 
      id: account.id,
      business_type: account.business_type,
      charges_enabled: account.charges_enabled
    });

    // 4. Testar customer específico
    const customerId = "cus_ShrB4v0DLU7t1z";
    logStep("Testing customer retrieval", { customerId });
    
    try {
      const customer = await stripe.customers.retrieve(customerId);
      logStep("Customer retrieved successfully", { 
        id: customer.id,
        email: customer.email,
        created: customer.created
      });

      // 5. Testar criação de portal session
      logStep("Testing portal session creation");
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: "https://revalidaquest.com/profile",
      });

      logStep("Portal session created successfully", { 
        sessionId: portalSession.id,
        url: portalSession.url
      });

      return new Response(JSON.stringify({
        success: true,
        message: "All tests passed",
        data: {
          account: {
            id: account.id,
            charges_enabled: account.charges_enabled
          },
          customer: {
            id: customer.id,
            email: customer.email
          },
          portal: {
            sessionId: portalSession.id,
            url: portalSession.url
          }
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });

    } catch (customerError) {
      logStep("Error with customer", { error: customerError });
      return new Response(JSON.stringify({
        success: false,
        error: `Customer error: ${customerError instanceof Error ? customerError.message : 'Unknown error'}`,
        step: "customer_retrieval",
        data: {
          account: {
            id: account.id,
            charges_enabled: account.charges_enabled
          }
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in test-stripe-connection", { message: errorMessage });
    console.error('[test-stripe-connection] Error:', errorMessage);
    
    return new Response(JSON.stringify({ 
      success: false,
      error: errorMessage,
      step: "general_error"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  } finally {
    console.log('[test-stripe-connection] Fim da execução');
  }
}); 