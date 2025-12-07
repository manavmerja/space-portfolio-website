import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("❌ API Key Missing in .env.local");
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // ✅ FIX: Switching to 'gemini-flash-latest' 
    // Ye '1.5-flash' ko point karta hai jiska Free Quota bohot high hai.
    // 'gemini-2.0-flash' abhi naya hai isliye limit kam hai.
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const systemPrompt = `
      You are Nebula, an AI assistant for Manav Merja's Portfolio.
      Your Creator is Manav Merja (Full Stack & ML Engineer).
      Projects: Waste Warrior (SIH Project), Niti.ai, Next Event.
      Tone: Friendly Space Commander. Short answers only (max 2 sentences).
      If asked for resume, say "Here is the file!" and add [RESUME_LINK] at the end.
    `;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `System Instruction: ${systemPrompt}` }],
        },
        {
          role: "model",
          parts: [{ text: "System Online. Ready to assist." }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("❌ Gemini API Error:", error.message || error);
    
    // Friendly fallback
    return NextResponse.json({ 
      reply: "My energy levels are low (Rate Limit Reached). Please wait a moment commander! 🔋" 
    }, { status: 500 });
  }
}