"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconCloud } from "@/components/ui/icon-cloud";
import { LampContainer } from "@/components/ui/lamp";

// ✅ UPDATED BIGGER LIST (Web + AI/ML)
const slugs = [
  // Web Dev
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "nextdotjs",
  "prisma",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "tailwindcss",
  "figma",
  
  // DevOps
  "docker",
  "git",
  "github",
  "linux",
  
  // AI / ML (New Additions)
  "python",
  "tensorflow",
  "pytorch",
  "scikitlearn",
  "pandas",
  "numpy",
  "jupyter",
  "openai",
  "googlecloudplatform"
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="w-full bg-black relative z-10 overflow-hidden">
      
      {/* LAMP CONTAINER */}
      <LampContainer className="min-h-screen w-full"> 
        
        {/* ✅ YOUR FIX: 'md:mt-100' add kar diya desktop positioning ke liye */}
        <div className="flex flex-col items-center justify-center relative z-50 w-full md:mt-100">
          
          {/* 1. HEADING */}
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 mb-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 font-space-grotesk tracking-tight text-center">
              MY ARSENAL
            </h2>
            <p className="text-cyan-400 text-sm font-mono tracking-[0.3em] uppercase text-center">
              [ CORE SYSTEM ONLINE ]
            </p>
          </motion.div>

          {/* 2. 3D CLOUD & LOGO CONTAINER */}
          <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center mt-4 scale-75 md:scale-100">
            
            {/* CENTER STATIC LOGO */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-24 w-24 rounded-full flex items-center justify-center bg-black border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.6)]"
            >
               <div className="relative h-14 w-14 opacity-100">
                 <Image 
                   src="/logo.png" 
                   alt="MM Core" 
                   fill 
                   className="object-contain invert"
                   sizes="56px"
                 />
               </div>
            </div>

            {/* 3D ICON CLOUD */}
            <IconCloud iconSlugs={slugs} />
            
          </div>

        </div>

      </LampContainer>

    </section>
  );
}