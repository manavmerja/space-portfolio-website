"use client";
import React from "react";
import Image from "next/image"; 
import { PinContainer } from "@/components/ui/3d-pin";
import { ExternalLink, Github } from "lucide-react";
import RetroGrid from "@/components/ui/retro-grid";

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-20 bg-black overflow-hidden relative">
      
      {/* 1. RETRO GRID BACKGROUND (Opacity badha di 0.2 se default/high) */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <RetroGrid className="opacity-100" /> 
      </div>

      {/* 2. HEADER */}
      <div className="text-center mb-16 relative z-20 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-space-grotesk">
          THE MISSIONS
        </h2>
        <p className="text-cyan-500/80 mt-2 text-sm font-mono tracking-widest uppercase">
          [ DEPLOYED PROJECTS ]
        </p>
      </div>

      {/* 3. PROJECTS GRID */}
      <div className="flex flex-wrap items-center justify-center gap-20 px-4 relative z-20">
        
        {/* --- PROJECT 1: NEXT EVENT --- */}
        <PinContainer title="/next-event.com">
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-[24rem] w-[80vw] sm:w-[26rem] h-[26rem]">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-slate-100">
              Next Event
            </h3>
            <div className="text-sm !m-0 !p-0 font-normal leading-relaxed text-slate-400 line-clamp-2">
              Full-Stack event aggregator platform with real-time updates and seamless ticket booking.
            </div>
            <div className="relative flex flex-1 w-full rounded-lg mt-4 overflow-hidden bg-black/50 border border-white/10">
                <Image 
                    src="/project-next-event.png" 
                    alt="Next Event Project"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="flex gap-3 mt-4 w-full">
                <a href="https://v0-event-aggregator-web-app.vercel.app/" target="_blank" rel="noopener noreferrer" 
                   className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white text-black py-2.5 rounded-lg hover:bg-gray-200 transition pointer-events-auto z-50">
                   <ExternalLink size={14} /> Live Demo
                </a>
                <a href="https://github.com/manavmerja" target="_blank" rel="noopener noreferrer" 
                   className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white/10 text-white py-2.5 rounded-lg hover:bg-white/20 transition border border-white/10 pointer-events-auto z-50">
                   <Github size={14} /> Code
                </a>
            </div>
          </div>
        </PinContainer>

        {/* --- PROJECT 2: NITI AI --- */}
        <PinContainer title="/niti-ai.bot">
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-[24rem] w-[80vw] sm:w-[26rem] h-[26rem]">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-slate-100">
              Niti-Ai
            </h3>
            <div className="text-sm !m-0 !p-0 font-normal leading-relaxed text-slate-400 line-clamp-2">
              AI-Powered Policy Research Assistant. Analyzes documents and answers queries instantly using OpenAI.
            </div>
            <div className="relative flex flex-1 w-full rounded-lg mt-4 overflow-hidden bg-black/50 border border-white/10">
                <Image 
                    src="/project-niti-ai.png" 
                    alt="Niti AI Project"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                />
            </div>
            <div className="flex gap-3 mt-4 w-full">
                <a href="https://niti-ai-rose.vercel.app/" target="_blank" rel="noopener noreferrer" 
                   className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white text-black py-2.5 rounded-lg hover:bg-gray-200 transition pointer-events-auto z-50">
                   <ExternalLink size={14} /> Live Demo
                </a>
                <a href="https://github.com/manavmerja" target="_blank" rel="noopener noreferrer" 
                   className="flex-1 flex items-center justify-center gap-2 text-xs font-bold bg-white/10 text-white py-2.5 rounded-lg hover:bg-white/20 transition border border-white/10 pointer-events-auto z-50">
                   <Github size={14} /> Code
                </a>
            </div>
          </div>
        </PinContainer>

        {/* --- PROJECT 3: WASTE WARRIOR --- */}
        <PinContainer title="GitHub Repo">
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-[24rem] w-[80vw] sm:w-[26rem] h-[26rem]">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-slate-100">
              Waste Warrior (SIH)
            </h3>
            <div className="text-sm !m-0 !p-0 font-normal leading-relaxed text-slate-400 line-clamp-2">
              Smart India Hackathon Finalist. IoT & ML based automated waste classification for smart cities.
            </div>
            <div className="relative flex flex-1 w-full rounded-lg mt-4 overflow-hidden bg-black/50 border border-white/10">
                <Image 
                    src="/project-waste-warrior.png" 
                    alt="Waste Warrior Project"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                />
            </div>
            <div className="flex gap-3 mt-4 w-full">
                <a href="https://github.com/manavmerja" target="_blank" rel="noopener noreferrer" 
                   className="w-full flex items-center justify-center gap-2 text-xs font-bold bg-white/10 text-white py-2.5 rounded-lg hover:bg-white/20 transition border border-white/10 pointer-events-auto z-50">
                   <Github size={14} /> View Source Code
                </a>
            </div>
          </div>
        </PinContainer>

      </div>
    </section>
  );
}