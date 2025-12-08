"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Send, X, User, Sparkles, Download, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "ai";
  text: string;
  hasResume?: boolean;
}

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  
  // ✅ UPDATED: Initial Message shows Full Name & Navigation Powers
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "ai", 
      text: "System Online. 🌌 I am N.E.B.U.L.A. (Navigation Entity Built for User Links & Answers). \n\nI can pilot you to Manav's Projects, Skills, or Contact. Where shall we fly? 🚀" 
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Scroll Detection
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.95) {
      setIsAtBottom(true);
      setIsOpen(false);
    } else {
      setIsAtBottom(false);
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (tag: string) => {
    const sections: { [key: string]: string } = {
        "[NAV_PROJECTS]": "projects",
        "[NAV_STACK]": "stack",
        "[NAV_ABOUT]": "about",
        "[NAV_CONTACT]": "contact",
        "[NAV_JOURNEY]": "journey",
    };

    const sectionId = sections[tag];
    if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: "smooth" });
                if (window.innerWidth < 768) setIsOpen(false);
            }, 800);
        }
    }
  };

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

      const navTags = ["[NAV_PROJECTS]", "[NAV_STACK]", "[NAV_ABOUT]", "[NAV_CONTACT]", "[NAV_JOURNEY]"];
      navTags.forEach(tag => {
          if (reply.includes(tag)) {
              handleNavigation(tag);
              reply = reply.replace(tag, "");
          }
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: reply, hasResume: showResume },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Signal lost... Realigning antenna. 📡" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ UPDATED SUGGESTIONS: Direct Navigation Commands
  const suggestions = ["Take me to Projects", "Show Skills", "Who is Manav?", "Tell a Joke"];

  return (
    <>
      <AnimatePresence>
        {!isOpen && showTooltip && !isAtBottom && (
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
            System Online. Need a Co-Pilot?
            <button onClick={() => setShowTooltip(false)} className="ml-2 text-gray-400 hover:text-red-500">
                <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isOpen && isAtBottom ? (
            <motion.button
                key="scroll-top"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-[9990] w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.6)] border-2 border-black"
            >
                <ArrowUp size={24} className="animate-bounce" />
            </motion.button>
        ) : 
        !isOpen && (
            <motion.button
                key="chat-trigger"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => { setIsOpen(true); setShowTooltip(false); }}
                className="fixed bottom-6 right-6 z-[9990] w-16 h-16 flex items-center justify-center group"
            >
                <div className="relative w-full h-full">
                    <Image 
                        src="/ai-robot.png"
                        alt="AI Assistant"
                        fill
                        priority
                        sizes="64px"
                        className="object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] group-hover:scale-110 transition-transform duration-300"
                    />
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1 -right-1 z-10"
                    >
                        <Sparkles size={12} className="text-yellow-300 filter drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
                    </motion.div>
                </div>
                <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping opacity-30 duration-1000 z-0" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-bold z-20">1</span>
            </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
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
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-cyan-900/40 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg overflow-hidden relative">
                    <Image src="/ai-robot.png" alt="Nebula" fill className="object-cover" sizes="40px" />
                </div>
                <div>
                    <h3 className="font-bold text-white tracking-wider font-space-grotesk text-lg">N.E.B.U.L.A</h3>
                    <p className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> ONLINE
                    </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

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
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg overflow-hidden relative",
                    msg.role === "ai" ? "bg-cyan-900/50 border border-cyan-500/30" : "bg-white/10 text-white"
                  )}>
                    {msg.role === "ai" ? (
                        <Image src="/ai-robot.png" alt="AI" fill className="object-cover" sizes="32px" />
                    ) : (
                        <User size={14} />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                      <div className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
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
                            target="_blank"
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
                   Calculating trajectory...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

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
                    placeholder="Command Nebula..." 
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