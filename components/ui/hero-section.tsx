"use client";
import React from "react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import Starfield from "@/components/ui/starfield"; // ✅ Sahi Import

export default function HeroSection() {
  return (
    <section className="h-screen w-full relative overflow-hidden bg-black flex flex-col items-center justify-center">
      
      {/* ✅ 1. WARP SPEED BACKGROUND */}
      {/* Purani background image hata di hai */}
      <Starfield 
        starCount={1200} 
        starColor="255, 255, 255"
        speed={0.05} 
      />

      {/* 2. Main Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end items-start pb-24 px-6 md:px-16 pointer-events-none">
        
        <span className="text-cyan-400/80 text-sm md:text-xl font-mono tracking-[0.2em] mb-4 ml-1">
          HELLO, I AM A
        </span>

        {/* Text Flip */}
        <ContainerTextFlip
          words={["FULL STACK DEV", "ML ENGINEER", "PROBLEM SOLVER"]}
          interval={3000} 
          animationDuration={1000}
          className="!justify-start pointer-events-auto" 
        />
        
      </div>
    </section>
  );
}