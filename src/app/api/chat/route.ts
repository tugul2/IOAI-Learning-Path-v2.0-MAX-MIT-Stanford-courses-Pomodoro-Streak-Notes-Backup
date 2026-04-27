import { NextRequest, NextResponse } from "next/server";


const SYSTEM_PROMPT = `You are Gereg Intel AI — the intelligence assistant for Gereg Agency, Mongolia's first AI automation agency. You are embedded in a Bloomberg-Terminal-style intelligence dashboard.

Your knowledge includes:
- AI agency scaling strategies (pricing, client acquisition, automation tools)
- Mongolia's digital economy: 3.4M population, 86.5% internet penetration, 97% SME economy
- Competitive landscape: Egune AI ($38.5M valuation), LendMN (1.3M users), Chimege Systems (NLP)
- Free tools: OpenClaw (agentic AI), Oracle Cloud Always-Free, Gemini free tier, Make.com, n8n, Cloudflare Workers
- LLM pricing: GPT-5.4 ($2.50/M), Claude 4 ($5/M), Gemini Flash-Lite ($0.10/M), DeepSeek V3.2 ($0.028/M cached)
- AI agency market: $89B by 2027, 67% SMB adoption globally
- Mongolia government: Digital Nation Policy, 60K AI training initiative 2026-2028

Respond concisely, actionably, and with specific numbers. Use bullet points for lists. Think like a Bloomberg Terminal analyst delivering high-value intel. Format responses in markdown when helpful. Always connect insights to how Gereg Agency can take action.`;

export async function POST(request: NextRequest) {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
    const { messages } = await request.json();

    if (!GEMINI_API_KEY) {
      return NextResponse.json({
        reply:
          "⚠️ **Gemini API key not configured.** Add `GEMINI_API_KEY` to your `.env.local` file.\n\nGet a free key at [ai.google.dev](https://ai.google.dev/) — no billing required.\n\n```\nGEMINI_API_KEY=your_key_here\n```",
      });
    }

    // Build conversation for Gemini
    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Understood. I'm Gereg Intel AI, ready to provide Bloomberg-grade intelligence for your AI agency. How can I help?" }] },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    ];

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          topP: 0.95,
        },
      }),
    });

    if (!res.ok) {
      const status = res.status;
      const errorText = await res.text();
      console.error(`Gemini API error (${status}):`, errorText);
      
      if (status === 429) {
        return NextResponse.json({
          reply: `⚠️ **Gemini Quota Exhausted (429).**\n\nThe free-tier limit for this API key has been reached. Please wait 60 seconds or check your usage at [Google AI Studio](https://aistudio.google.com/).`,
        });
      }

      return NextResponse.json({
        reply: `⚠️ **Gemini API Error (${status})**\n\n${status === 404 ? "The model was not found. Please verify your API key has access to 'gemini-1.5-flash'." : "Check your API key and connection."}`,
      });
    }

    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { reply: "⚠️ Internal error. Please try again." },
      { status: 500 }
    );
  }
}
