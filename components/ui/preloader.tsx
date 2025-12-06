"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING CORE...");

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // ✅ SLOWER PROGRESS LOGIC
    // Interval ko 40ms se badhakar 80ms kar diya (Slow Loading)
    const timer = setInterval(() => {
      setProgress((prev) => {
        // Increment bhi chhota kar diya (1 se 3 ke beech)
        const next = prev + Math.floor(Math.random() * 3) + 1;
        
        if (next > 30 && next < 60) setStatus("LOADING NEURAL NETWORKS...");
        if (next > 60 && next < 90) setStatus("VERIFYING BIOMETRICS...");
        if (next > 90) setStatus("ACCESS GRANTED.");

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 1000); // 1 sec wait before opening
          return 100;
        }
        return next;
      });
    }, 80); // <-- Yahan speed control hoti hai (Bada number = Slow speed)

    return () => clearInterval(timer);
  }, [loading]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
          
          // ✅ SLOWER EXIT ANIMATION (Cinematic Fade)
          exit={{ 
            opacity: 0, 
            scale: 1.5, // Thoda kam zoom rakha hai taaki blur na phate
            filter: "blur(15px)",
            transition: { duration: 1.5, ease: "easeInOut" } // 1.5s transition
          }}
        >
          {/* --- HOLOGRAPHIC CORE CONTAINER --- */}
          <div className="relative flex items-center justify-center mb-10 scale-150">
            
            {/* Outer Ring (Very Slow Reverse Spin) */}
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }} // ✅ 20s rotation
                className="absolute w-40 h-40 border border-cyan-500/30 rounded-full border-t-cyan-500 border-r-transparent"
            />
            
            {/* Middle Ring (Slow Spin) */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }} // ✅ 10s rotation
                className="absolute w-28 h-28 border border-blue-500/30 rounded-full border-b-blue-400 border-l-transparent"
            />

            {/* Inner Ring (Medium Spin) */}
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }} // ✅ 5s rotation
                className="absolute w-16 h-16 border-2 border-white/10 rounded-full border-t-white border-l-transparent"
            />

            {/* Center Core (Slow Pulsing) */}
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }} // ✅ 2s pulse
                className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)]"
            />
          </div>

          {/* --- TEXT & PROGRESS --- */}
          <div className="flex flex-col items-center gap-2 font-mono z-10">
             <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-cyan-500 text-xs tracking-[0.2em] animate-pulse"
             >
                {status}
             </motion.p>
             
             <div className="h-1 w-48 bg-gray-800 rounded-full overflow-hidden mt-2 border border-white/10">
                <motion.div 
                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
                />
             </div>
             
             <p className="text-gray-500 text-[10px] mt-1">
                SYSTEM INTEGRITY: <span className="text-white">{progress}%</span>
             </p>
          </div>

          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        </motion.div>
      )}
    </AnimatePresence>
  );
}