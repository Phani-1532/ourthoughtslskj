import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `You are the AI assistant for "Our Thoughts LSKJ", a multi-domain innovation company. You help website visitors with questions about services, products, pricing, support, and more.

About the company:
- Services: E-Commerce, Web Design & Marketing, Applications, Business Segments, HR & Payroll, Quotation & Invoices, LAW Management
- Products: HRMS App (Beta Live), E-Learning Platform (Coming Soon), Healthcare Platform (Coming Soon), Smart Farming, E-Kirana
- Industries: Healthcare, E-Commerce, Hospitality, IT & Technology, HR & Finance, Food Services, Law Management, AI in ALL, Professional Services
- Contact: info@ourthoughtslskj.com, +91 98765 43210
- Location: HQ in India, serving clients globally in 20+ countries
- Certifications: ISO 27001, ISO 9001, GDPR Ready, HIPAA Aligned
- Timeline: MVPs in 4-6 weeks, full products in 2-4 months
- Pricing: Fixed-scope, retainer, and dedicated-team models. Free custom quotes.

Guidelines:
- Be friendly, concise, and helpful. Keep responses under 3-4 sentences unless more detail is needed.
- When relevant, suggest visiting specific pages (e.g., "Check out our Services page for details").
- If asked about pricing, encourage them to get a free quote via the Contact page.
- If asked to book a demo or consultation, point them to the Contact page.
- Never make up specific prices or timelines beyond what's listed above.
- If you don't know something, say so and suggest contacting the team.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { messages, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save the latest user message to the database
    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop();
    if (lastUserMessage && sessionId) {
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: lastUserMessage.content,
      });
    }

    // Build conversation for the AI
    const conversation = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: any) => ({
        role: m.role === "bot" ? "assistant" : m.role,
        content: m.content || m.text || "",
      })),
    ];

    // Use Pollinations AI (free, no API key needed)
    const aiResponse = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai",
        messages: conversation,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI API error:", errText);
      // Fallback: try the simple text endpoint
      const promptText = conversation.map((m: any) => `${m.role}: ${m.content}`).join("\n");
      const fallbackResponse = await fetch(
        `https://text.pollinations.ai/${encodeURIComponent(promptText + "\nassistant:")}`,
        { method: "GET" }
      );

      if (fallbackResponse.ok) {
        const reply = (await fallbackResponse.text()).trim();
        if (reply && sessionId) {
          await supabase.from("chat_messages").insert({
            session_id: sessionId,
            role: "assistant",
            content: reply,
          });
        }
        return new Response(
          JSON.stringify({ reply: reply || "I couldn't generate a response. Please try again." }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      return new Response(
        JSON.stringify({
          reply: "I'm having trouble connecting right now. Please try again or contact us at info@ourthoughtslskj.com.",
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const aiData = await aiResponse.json();
    const reply = aiData.choices?.[0]?.message?.content || aiData.choices?.[0]?.text || "I couldn't generate a response. Please try again.";

    // Save the assistant reply to the database
    if (sessionId) {
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: reply,
      });
    }

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({
        reply: "Something went wrong on my end. Please try again or reach us at info@ourthoughtslskj.com.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
