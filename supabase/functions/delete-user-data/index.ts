
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

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    console.log(`[DELETE-USER-DATA] Processing deletion request for user: ${user.id}`);

    // Create data deletion request record
    const { error: insertError } = await supabaseClient
      .from('data_deletion_requests')
      .insert({
        user_id: user.id,
        user_email: user.email,
        requested_at: new Date().toISOString(),
        status: 'pending',
        confirmation_token: crypto.randomUUID()
      });

    if (insertError) {
      console.error('Error creating deletion request:', insertError);
      throw new Error('Failed to create deletion request');
    }

    // Send confirmation email (in a real implementation)
    console.log(`[DELETE-USER-DATA] Deletion request created for ${user.email}`);
    
    // In production, you would send an email here with:
    // - Confirmation that request was received
    // - Timeline for data deletion (72h)
    // - Contact information for questions
    // - Reference number for the request

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Data deletion request submitted successfully" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in delete-user-data function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
