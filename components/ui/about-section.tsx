"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Cpu, Code, GraduationCap, Globe, Trophy, Github, Linkedin, Twitter } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams"; // ✅ Updated component

export default function AboutSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <section id="about" className="w-full py-32 relative flex items-center justify-center overflow-hidden bg-neutral-950">
      
      {/* 1. ACETERNITY BEAMS (Moving Light Rays) */}
      <BackgroundBeams className="opacity-100" />

      {/* 2. SPOTLIGHTS (Subtle Glows for Depth) */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* 3. HOLOGRAPHIC CARD */}
      <motion.div
        animate={isUnlocked ? "hover" : "rest"}
        onMouseEnter={() => setIsUnlocked(true)}
        onMouseLeave={() => setIsUnlocked(false)}
        onClick={() => setIsUnlocked(!isUnlocked)}
        className="relative h-[550px] w-[90%] max-w-[800px] rounded-3xl bg-neutral-950/60 backdrop-blur-md border border-neutral-800 shadow-2xl overflow-hidden group cursor-pointer z-20"
      >
        
        {/* === LOCKED STATE === */}
        <motion.div
          variants={{
            rest: { opacity: 1, filter: "blur(0px)", zIndex: 10 },
            hover: { opacity: 0, filter: "blur(10px)", zIndex: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <div className="h-24 w-24 rounded-full border-2 border-cyan-900/50 flex items-center justify-center mb-6 relative bg-neutral-900/50">
            <Lock className="text-cyan-500/50 h-10 w-10" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 tracking-[0.1em] uppercase text-center">
            User Profile
          </h2>
          <p className="text-cyan-500/70 mt-4 text-xs md:text-sm font-mono animate-pulse tracking-widest">
            [ SYSTEM LOCKED: AUTHENTICATE ]
          </p>
        </motion.div>


        {/* === UNLOCKED STATE (REVEAL) === */}
        <motion.div
          variants={{
            rest: { opacity: 0, scale: 0.95, zIndex: 0 },
            hover: { opacity: 1, scale: 1, zIndex: 20 },
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 p-6 md:p-10 flex flex-col bg-gradient-to-br from-neutral-900 to-neutral-950"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
            <div>
              <h3 className="text-3xl font-bold text-white tracking-wide">MANAV MERJA</h3>
              <p className="text-cyan-400 font-mono text-sm flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Status: Online & Coding
              </p>
            </div>
            <Unlock className="text-purple-400 h-6 w-6" />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar">
            
            {/* Education */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors">
              <div className="p-2.5 bg-purple-500/20 rounded-lg"><GraduationCap className="text-purple-400 h-5 w-5" /></div>
              <div>
                <h4 className="text-gray-200 font-bold text-sm">Education</h4>
                <p className="text-gray-500 text-xs">DEPSTAR, CHARUSAT (CE'28)</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="p-2.5 bg-cyan-500/20 rounded-lg"><Code className="text-cyan-400 h-5 w-5" /></div>
              <div>
                <h4 className="text-gray-200 font-bold text-sm">Role</h4>
                <p className="text-gray-500 text-xs">Full Stack Web Developer</p>
              </div>
            </div>

            {/* Specialization */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-pink-500/30 transition-colors">
              <div className="p-2.5 bg-pink-500/20 rounded-lg"><Cpu className="text-pink-400 h-5 w-5" /></div>
              <div>
                <h4 className="text-gray-200 font-bold text-sm">Specialized In</h4>
                <p className="text-gray-500 text-xs">AI - ML</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-yellow-500/30 transition-colors">
              <div className="p-2.5 bg-yellow-500/20 rounded-lg"><Trophy className="text-yellow-400 h-5 w-5" /></div>
              <div>
                <h4 className="text-gray-200 font-bold text-sm">Achievement</h4>
                <p className="text-gray-500 text-xs">Heisenberg Team (Top 10 @ AIT)</p>
              </div>
            </div>

            {/* Target */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors">
              <div className="p-2.5 bg-green-500/20 rounded-lg"><Globe className="text-green-400 h-5 w-5" /></div>
              <div>
                <h4 className="text-gray-200 font-bold text-sm">Target</h4>
                <p className="text-gray-500 text-xs">Innovating with Code & AI</p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
               <span className="text-gray-400 text-sm font-bold ml-1">Connect:</span>
               <div className="flex gap-2">
                 <a href="https://github.com/manavmerja" target="_blank" className="p-2 bg-black rounded-lg hover:text-white text-gray-400 transition-colors border border-white/10"><Github size={16} /></a>
                 <a href="#" className="p-2 bg-blue-900/30 rounded-lg hover:text-blue-400 text-gray-400 transition-colors border border-white/10"><Linkedin size={16} /></a>
                 <a href="#" className="p-2 bg-black rounded-lg hover:text-white text-gray-400 transition-colors border border-white/10"><Twitter size={16} /></a>
               </div>
            </div>

          </div>
          
        </motion.div>

        {/* 3. NEON BORDER GLOW (Hover Only) */}
        <motion.div
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          className="absolute inset-0 border border-cyan-500/30 rounded-3xl pointer-events-none shadow-[0_0_20px_rgba(6,182,212,0.15)_inset]"
        />

      </motion.div>
    </section>
  );
}