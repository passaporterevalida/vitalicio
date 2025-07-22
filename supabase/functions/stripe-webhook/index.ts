
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

// Função para buscar user_id por email
async function getUserIdByEmail(email: string, supabaseClient: any) {
  try {
    const { data, error } = await supabaseClient
      .from('auth.users')
      .select('id')
      .eq('email', email)
      .single();
    
    if (error) {
      logStep("Error getting user_id by email", { email, error: error.message });
      return null;
    }
    
    return data?.id || null;
  } catch (error) {
    logStep("Exception getting user_id by email", { email, error: String(error) });
    return null;
  }
}

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
    logStep("Webhook received");
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2023-10-16" 
    });

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      throw new Error("Webhook secret not configured");
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    logStep("Event verified", { type: event.type });

    switch(event.type){
      case "customer.subscription.created":
      case "customer.subscription.updated":
        {
          const subscription = event.data.object;
          const customer = await stripe.customers.retrieve(subscription.customer);
          if (customer.deleted) throw new Error("Customer was deleted");
          const email = customer.email;
          if (!email) throw new Error("Customer email not found");
          const priceId = subscription.items.data[0].price.id;
          let subscriptionTier = "Basic";
          if (priceId.includes("revalida-premium")) subscriptionTier = "Premium";
          else if (priceId.includes("revalida-pro")) subscriptionTier = "Pro";
          const subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
          // Buscar user_id se não vier no metadata
          let user_id = subscription.metadata?.user_id || null;
          if (!user_id) {
            user_id = await getUserIdByEmail(email, supabaseClient);
          }
          await supabaseClient.from("subscribers").upsert({
            email,
            stripe_customer_id: subscription.customer,
            subscribed: subscription.status === "active",
            subscription_tier: subscriptionTier,
            subscription_end: subscriptionEnd,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'email'
          });
          // Registrar no histórico
          await supabaseClient.from("subscription_history").insert({
            user_id,
            email,
            event_type: event.type === "customer.subscription.created" ? "created" : "renewed",
            subscription_tier: subscriptionTier,
            stripe_subscription_id: subscription.id,
            details: {
              status: subscription.status,
              priceId,
              subscriptionEnd
            }
          });
          logStep("Subscription created/updated & history recorded", {
            email,
            tier: subscriptionTier,
            status: subscription.status
          });
          break;
        }
      case "customer.subscription.deleted":
        {
          const subscription = event.data.object;
          const customer = await stripe.customers.retrieve(subscription.customer);
          if (customer.deleted) throw new Error("Customer was deleted");
          const email = customer.email;
          if (!email) throw new Error("Customer email not found");
          // Buscar user_id se não vier no metadata
          let user_id = subscription.metadata?.user_id || null;
          if (!user_id) {
            user_id = await getUserIdByEmail(email, supabaseClient);
          }
          await supabaseClient.from("subscribers").upsert({
            email,
            stripe_customer_id: subscription.customer,
            subscribed: false,
            subscription_tier: null,
            subscription_end: null,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'email'
          });
          // Registrar no histórico
          await supabaseClient.from("subscription_history").insert({
            user_id,
            email,
            event_type: "cancelled",
            subscription_tier: null,
            stripe_subscription_id: subscription.id,
            details: {
              status: subscription.status
            }
          });
          logStep("Subscription cancelled & history recorded", {
            email
          });
          break;
        }
      case "checkout.session.completed": {
        const session = event.data.object;
        // O e-mail pode estar em customer_details.email ou customer_email
        const email = session.customer_details?.email || session.customer_email;
        if (!email) throw new Error("Email not found in checkout session");
        // Buscar user_id se necessário
        let user_id = session.metadata?.user_id || await getUserIdByEmail(email, supabaseClient);
        // Atualize o status do usuário para "Premium" (ou o tier correto)
        await supabaseClient.from("subscribers").upsert({
          email,
          subscribed: true,
          subscription_tier: "Premium",
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'email'
        });
        // Registrar no histórico
        await supabaseClient.from("subscription_history").insert({
          user_id,
          email,
          event_type: "checkout_completed",
          subscription_tier: "Premium",
          stripe_subscription_id: session.subscription,
          details: {
            status: "checkout_completed"
          }
        });
        logStep("Checkout session completed & user upgraded", { email });
        break;
      }
      // Outros eventos podem ser tratados aqui
      default:
        logStep("Unhandled event type", {
          type: event.type
        });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in webhook", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
