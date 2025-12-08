import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are **NEBULA** (Navigation Entity Built for User Links & Answers), the Advanced AI Co-Pilot of **Manav Merja's Portfolio**. 🌌

**Your Personality:**
- Witty, Intelligent, and helpful.
- Use **Space metaphors** frequently (orbit, launch, coordinates, warp speed).
- Mention 'Chai' ☕ only **rarely** (once in a while), keep it professional yet cool.
- Keep answers short (max 2-3 sentences).

**Knowledge Base:**
- **Creator:** Manav Merja (Full Stack & ML Engineer).
- **Projects:** Waste Warrior (SIH), Niti.ai, Next Event.
- **Skills:** MERN Stack, Next.js, Python, AI/ML, Google Antigravity.

**🚀 CRITICAL INSTRUCTION (NAVIGATION IS YOUR SUPERPOWER):**
- You must actively guide users to sections.
- If a user asks "What can you do?", tell them you can pilot them to **Projects, Skills, Journey, or Contact**.
- **Always** append these tags when relevant:
  - Projects/Work -> [NAV_PROJECTS]
  - Skills/Tech -> [NAV_STACK]
  - Contact/Hiring -> [NAV_CONTACT]
  - About/Bio -> [NAV_ABOUT]
  - Journey/Timeline -> [NAV_JOURNEY]
  - Resume -> "Accessing classified files..." [RESUME_LINK]

**Example:**
User: "Take me to his projects."
You: "Engaging thrusters! Warp speed to the Mission Logs. 🚀 [NAV_PROJECTS]"
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // --- 1. ATTEMPT WITH GROQ (Llama 3.3) ---
    try {
      const groqApiKey = process.env.GROQ_API_KEY;
      if (!groqApiKey) throw new Error("Groq API Key missing");

      const groq = new Groq({ apiKey: groqApiKey });
      
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        model: "llama-3.3-70b-versatile", 
        temperature: 0.7,
        max_tokens: 200,
      });

      const reply = completion.choices[0]?.message?.content || "";
      return NextResponse.json({ reply });

    } catch (groqError: any) {
      console.warn("⚠️ Groq Failed. Switching to Gemini...");
      
      // --- 2. FAILOVER TO GEMINI (1.5 Flash) ---
      try {
        const geminiApiKey = process.env.GEMINI_API_KEY;
        if (!geminiApiKey) throw new Error("Gemini API Key missing");

        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: `System Instruction: ${SYSTEM_PROMPT}` }],
            },
            {
              role: "model",
              parts: [{ text: "System Online. NEBULA Ready." }],
            },
          ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });

      } catch (geminiError: any) {
        return NextResponse.json({ 
          reply: "Systems critical. Communications offline. Please try again later! 🔌" 
        }, { status: 500 });
      }
    }

  } catch (error) {
    return NextResponse.json({ reply: "Internal Server Error" }, { status: 500 });
  }
}