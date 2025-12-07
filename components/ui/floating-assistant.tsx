"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image"; // ✅ Import Image
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, User, Sparkles, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "ai";
  text: string;
  hasResume?: boolean;
}

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "System Online. 🌌 I am Nebula. How can I assist you in navigating Manav's universe?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false); 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Show tooltip after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user", text } as Message];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      let reply = data.reply;
      let showResume = false;

      if (reply.includes("[RESUME_LINK]")) {
        showResume = true;
        reply = reply.replace("[RESUME_LINK]", "");
      }

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: reply, hasResume: showResume },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Signal Interrupted. Try again. 📡" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = ["Who is Manav?", "Show Projects", "Download Resume", "Contact"];

  return (
    <>
      {/* --- 1. ATTENTION TOOLTIP (Pop-up) --- */}
      <AnimatePresence>
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-[9989] bg-white text-black px-4 py-2 rounded-xl shadow-xl border border-cyan-500/50 font-bold text-xs flex items-center gap-2 after:content-[''] after:absolute after:top-full after:right-6 after:border-8 after:border-transparent after:border-t-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Online. Need help?
            <button onClick={() => setShowTooltip(false)} className="ml-2 text-gray-400 hover:text-red-500">
                <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 2. FLOATING ORB (TRIGGER) --- */}
      <AnimatePresence>
        {!isOpen && (
            <motion.button
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setIsOpen(true); setShowTooltip(false); }}
            // ✅ REMOVED GRADIENT BACKGROUND & BORDER
            className="fixed bottom-6 right-6 z-[9990] w-16 h-16 flex items-center justify-center group"
            >
            
            {/* ✅ NEW ROBOT IMAGE ICON */}
            <div className="relative w-full h-full">
                 <Image 
                    src="/ai-robot.png" // Ensure image is in public folder
                    alt="AI Assistant"
                    fill
                    // ✅ FIX 1: Sizes bataya (taaki browser heavy image load na kare)
                    sizes="64px"
                    // ✅ FIX 2: Priority add kiya (taaki ye turant load ho)
                    priority
                    className="object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] group-hover:scale-110 transition-transform duration-300"
                 />
                 
                 {/* Chhota Sparkle jo orbit karega */}
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute -top-1 -right-1 z-10"
                 >
                    <Sparkles size={12} className="text-yellow-300 filter drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
                 </motion.div>
            </div>
            
            {/* Pulsing Outer Ring (Thoda sa glow rakha hai) */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping opacity-30 duration-1000 z-0" />
            
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-bold z-20">1</span>
            </motion.button>
        )}
      </AnimatePresence>

      {/* --- 3. CHAT INTERFACE (Glassmorphism) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // ... (Chat interface code remains same as before) ...
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed z-[10000] bg-black/80 backdrop-blur-xl border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col",
              "inset-0 md:inset-auto md:bottom-24 md:right-6 md:w-[400px] md:h-[600px] md:rounded-3xl",
              "shadow-[0_0_50px_rgba(8,145,178,0.3)]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-cyan-900/40 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg overflow-hidden relative">
                    {/* ✅ Header mein bhi chhota image laga diya */}
                    <Image src="/ai-robot.png" alt="Nebula" fill className="object-cover" sizes="40px" />
                </div>
                <div>
                    <h3 className="font-bold text-white tracking-wider font-space-grotesk text-lg">NEBULA</h3>
                    <p className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> ONLINE
                    </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area (Same as before) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-900/50 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  {/* Chat bubble icon (User/AI) */}
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg overflow-hidden relative",
                    msg.role === "ai" ? "bg-cyan-900/50 border border-cyan-500/30" : "bg-white/10 text-white"
                  )}>
                    {msg.role === "ai" ? (
                         // ✅ Chat ke andar bhi chhota image
                        <Image src="/ai-robot.png" alt="AI" fill className="object-cover" sizes="32px" />
                    ) : ( 
                        <User size={14} />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                      <div className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                        msg.role === "user" 
                          ? "bg-white text-black rounded-tr-none font-medium" 
                          : "bg-black/40 text-gray-100 border border-white/10 rounded-tl-none backdrop-blur-sm"
                      )}>
                        {msg.text}
                      </div>

                      {msg.hasResume && (
                          <motion.a 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            href="/resume.pdf" 
                            download="Manav_Merja_Resume.pdf"
                            className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 px-4 py-2 rounded-lg text-xs font-bold hover:bg-yellow-500/20 transition-all cursor-pointer w-fit shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                          >
                             <Download size={14} /> DOWNLOAD RESUME
                          </motion.a>
                      )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex gap-2 items-center text-cyan-500 text-xs ml-12 font-mono animate-pulse">
                   NEBULA IS THINKING...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area (Same as before) */}
            <div className="p-4 border-t border-white/10 bg-black/60 backdrop-blur-md">
               <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mask-image-gradient">
                  {suggestions.map((s) => (
                    <button 
                      key={s} 
                      onClick={() => handleSend(s)}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs text-cyan-200 whitespace-nowrap hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
                    >
                      {s}
                    </button>
                  ))}
               </div>

               <div className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-full px-2 py-2 focus-within:border-cyan-500/50 focus-within:bg-white/10 transition-all">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Message Nebula..." 
                    className="flex-1 bg-transparent px-3 text-white text-sm focus:outline-none placeholder:text-gray-500"
                  />
                  <button 
                    onClick={() => handleSend(input)}
                    disabled={isLoading}
                    className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95"
                  >
                    <Send size={16} />
                  </button>
               </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}