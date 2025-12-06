"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button";

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      
      {/* 1. CHAT WINDOW (Opens when clicked) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] rounded-2xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-cyan-900/50 to-purple-900/50 p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-400/50">
                  <Bot size={18} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">MM Assistant</h3>
                  <p className="text-[10px] text-cyan-300 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> 
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body (Placeholder Messages) */}
            <div className="h-64 p-4 overflow-y-auto space-y-4">
              {/* Bot Message */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center">
                  <Bot size={14} />
                </div>
                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none text-sm text-gray-200 border border-white/5">
                  Hello! I'm Manav's AI Assistant. How can I help you navigate this portfolio? 🚀
                </div>
              </div>

              {/* User Message (Demo) */}
              <div className="flex gap-3 flex-row-reverse">
                <div className="bg-cyan-600/20 p-3 rounded-2xl rounded-tr-none text-sm text-cyan-100 border border-cyan-500/30">
                  Show me his projects!
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-black/40 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask something..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <Button size="icon" className="rounded-full bg-cyan-600 hover:bg-cyan-500 h-9 w-9">
                <Send size={16} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FLOATING TRIGGER BUTTON */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="group relative h-14 w-14 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(8,_145,_178,_0.5)] border border-white/20"
      >
        {/* Glow Ring Animation */}
        <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-0 group-hover:animate-ping duration-1000" />
        
        {isOpen ? (
          <X className="text-white relative z-10" />
        ) : (
          <MessageSquare className="text-white relative z-10" />
        )}
      </motion.button>

    </div>
  );
}