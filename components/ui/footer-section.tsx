"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandX, IconBrandLinkedin, IconHome, IconMail, IconFileText } from "@tabler/icons-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Send } from "lucide-react";
import NumberTicker from "@/components/ui/number-ticker";

export default function FooterSection() {
  
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const updateCount = async () => {
      try {
        // ✅ NEW STABLE API (CounterAPI.dev)
        // Namespace: manavmerja, Key: portfolio
        const response = await fetch("https://api.counterapi.dev/v1/manavmerja/portfolio/up");
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        // CounterAPI returns { count: 123 }, whereas CountAPI returned { value: 123 }
        setVisitCount(data.count); 
      } catch (error) {
        console.error("Error fetching visit count:", error);
        setVisitCount(120); // Fallback value taaki 0 na dikhe
      }
    };
    
    updateCount();
  }, []);

  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-300" />,
      href: "#",
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full text-blue-400" />,
      href: "https://www.linkedin.com/in/merja-manav-124ba7317/",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-white" />,
      href: "https://github.com/manavmerja",
    },
    {
      title: "Twitter",
      icon: <IconBrandX className="h-full w-full text-gray-300" />,
      href: "https://x.com/manavmerja",
    },
    {
      title: "Resume",
      icon: <IconFileText className="h-full w-full text-yellow-400" />,
      href: "/resume.pdf",
      target: "_blank",
    },
    {
      title: "Email",
      icon: <IconMail className="h-full w-full text-green-400" />,
      href: "mailto:manavmerja@gmail.com",
    },
  ];

  return (
    <section id="contact" className="w-full relative pt-20 pb-8 bg-black overflow-hidden border-t border-white/10 flex flex-col items-center">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 h-full w-full bg-black">
         <DotPattern 
            className="opacity-40 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" 
            width={20} height={20} cx={1} cy={1} cr={1}
         />
      </div>

      <div className="max-w-5xl w-full mx-auto px-4 relative z-20 flex flex-col items-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-space-grotesk">
            TRANSMISSION DECK
          </h2>
          <p className="text-cyan-500/80 mt-4 text-sm font-mono tracking-widest uppercase">
            [ INITIALIZE CONNECTION ]
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-xl p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl mb-16"
        >
            <form 
              action="https://api.web3forms.com/submit" 
              method="POST" 
              className="space-y-4"
            >
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                <input type="hidden" name="redirect" value="https://web3forms.com/success" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-400 ml-1">CODENAME</label>
                        <input type="text" name="name" required placeholder="Enter Name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-400 ml-1">FREQUENCY (EMAIL)</label>
                        <input type="email" name="email" required placeholder="Enter Email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 ml-1">TRANSMISSION DATA</label>
                    <textarea rows={4} name="message" required placeholder="Type your message..." className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-all duration-300 mt-2">
                    <Send size={18} /> SEND SIGNAL
                </button>
            </form>
        </motion.div>

        {/* Floating Dock */}
        <div className="mb-12">
             <FloatingDock 
                items={links} 
                desktopClassName="bg-black/80 border-white/10 shadow-2xl"
             />
        </div>

        {/* --- BOTTOM STRIP --- */}
        <div className="w-full pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
            
            {/* Left: Logo & Copyright */}
            <div className="flex items-center gap-4">
                <div className="relative h-10 w-10 border border-white/10 rounded-full bg-black/50 p-2 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    <Image 
                        src="/logo.png" 
                        alt="Manav Merja" 
                        fill 
                        className="object-contain invert p-1"
                        sizes="40px" // ✅ FIX: Added exact size
                    />
                </div>
                <div className="flex flex-col">
                    <p className="tracking-widest text-gray-400">
                        © 2025 MANAV MERJA
                    </p>
                    <p className="text-[10px] text-gray-600">
                        SYSTEM STATUS: ONLINE
                    </p>
                </div>
            </div>

            {/* Right: Counter & Credits */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                
                {/* VISITOR COUNTER BADGE */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-gray-400 tracking-wider">VISITS:</span>
                    <span className="text-cyan-400 font-bold">
                        <NumberTicker value={visitCount} className="tabular-nums" />
                    </span>
                </div>

                <p className="flex items-center gap-2 tracking-widest">
                    BUILT WITH <span className="text-white font-bold">NEXT.JS</span> & <span className="text-cyan-500 font-bold">TAILWIND</span>
                </p>
            </div>
            
        </div>

      </div>
    </section>
  );
}