"use client";
import React from "react";
import { Meteors } from "@/components/ui/meteors";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export default function HeroSection() {
  return (
    <section 
      className="h-screen w-full relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/space-bg.png')" }} 
    >
      
      {/* 1. Darker Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* 2. Meteors Effect */}
      <div className="absolute inset-0 h-full w-full z-10 overflow-hidden pointer-events-none">
        <Meteors number={25} /> 
      </div>

      {/* 3. Main Content (Responsive Alignment) */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end items-start pb-24 px-6 md:px-16">
        
        {/* Chhota Text */}
        <span className="text-cyan-400/80 text-sm md:text-xl font-mono tracking-[0.2em] mb-4 ml-1">
          HELLO, I AM A
        </span>

        {/* 🔄 ANIMATED FLIP TEXT - Syntax Fixed ✅ */}
        <ContainerTextFlip
          words={["FULL STACK DEV", "ML ENGINEER", "PROBLEM SOLVER"]}
          interval={4000} // Slow Speed
          animationDuration={1500} // Smooth Flip
          className="!justify-start" // Force Left align
        />
        
      </div>
    </section>
  );
}