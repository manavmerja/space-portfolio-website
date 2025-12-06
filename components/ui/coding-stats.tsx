"use client";
import React, { useEffect, useState } from "react";
// @ts-ignore
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import NumberTicker from "@/components/ui/number-ticker";
import { ExternalLink, Github } from "lucide-react"; // ✅ Github Icon added

export default function CodingStats() {
  const [leetcodeData, setLeetcodeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeetCode = async () => {
      try {
        // Note: Using your username manav99135
        const response = await fetch("https://leetcode-stats-api.herokuapp.com/manav99135");
        const data = await response.json();
        if (data.status === "success") {
          setLeetcodeData(data);
        }
      } catch (error) {
        console.error("Error fetching LeetCode stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCode();
  }, []);

  const stats = leetcodeData || { 
    totalSolved: 0, 
    easySolved: 0, mediumSolved: 0, hardSolved: 0, 
    totalQuestions: 3000 
  };

  const calculateStroke = (solved: number, total: number, radius: number) => {
    const circumference = 2 * Math.PI * radius;
    const percentage = total > 0 ? (solved / total) * 100 : 0;
    return circumference - (percentage / 100) * circumference;
  };

  return (
    <section id="stats" className="w-full py-20 bg-black relative z-10 overflow-hidden">
      
      {/* HEADER */}
      <div className="text-center mb-16 relative z-20 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-space-grotesk">
          MISSION CONTROL
        </h2>
        <p className="text-cyan-500/80 mt-2 text-sm font-mono tracking-widest uppercase">
          [ LIVE DATA STREAM ]
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* === LEFT: LEETCODE HUD === */}
        <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl group">
          
          {/* 🟠 FLOATING LEETCODE ICON */}
          <motion.a 
            href="https://leetcode.com/u/manav99135/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            animate={{ y: [0, -8, 0] }} // Floating animation
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
          >
            <ExternalLink size={20} />
          </motion.a>

          <h3 className="text-xl font-bold text-gray-200 mb-6 flex items-center gap-2 self-start md:self-center">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"/> LeetCode Stats
          </h3>
          
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* SVG RINGS CONTAINER */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              
              {/* Ring 1: Easy */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="45" fill="none" stroke="#22d3ee" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: calculateStroke(stats.easySolved, stats.totalEasy || 800, 45) }}
                transition={{ duration: 2, ease: "easeOut" }}
              />

              {/* Ring 2: Medium */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="#1e293b" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="35" fill="none" stroke="#c026d3" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="220"
                initial={{ strokeDashoffset: 220 }}
                animate={{ strokeDashoffset: calculateStroke(stats.mediumSolved, stats.totalMedium || 1600, 35) }}
                transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
              />

              {/* Ring 3: Hard */}
              <circle cx="50" cy="50" r="25" fill="none" stroke="#1e293b" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="25" fill="none" stroke="#f472b6" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="157"
                initial={{ strokeDashoffset: 157 }}
                animate={{ strokeDashoffset: calculateStroke(stats.hardSolved, stats.totalHard || 600, 25) }}
                transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
              />
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {loading ? (
                <span className="text-sm text-gray-400 animate-pulse">Scanning...</span>
              ) : (
                <>
                  <span className="text-4xl font-bold text-white">
                    <NumberTicker value={stats.totalSolved} />
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Solved</span>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6 text-xs font-mono">
            <div className="flex items-center gap-1 text-gray-300"><div className="w-3 h-3 rounded bg-cyan-400"/> Easy: <span className="text-white font-bold">{stats.easySolved}</span></div>
            <div className="flex items-center gap-1 text-gray-300"><div className="w-3 h-3 rounded bg-purple-600"/> Med: <span className="text-white font-bold">{stats.mediumSolved}</span></div>
            <div className="flex items-center gap-1 text-gray-300"><div className="w-3 h-3 rounded bg-pink-400"/> Hard: <span className="text-white font-bold">{stats.hardSolved}</span></div>
          </div>
        </div>


        {/* === RIGHT: GITHUB GRAPH === */}
        <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl overflow-x-auto">
          
          {/* 🟢 FLOATING GITHUB ICON */}
          <motion.a 
            href="https://github.com/manavmerja" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            animate={{ y: [0, -8, 0] }} // Floating animation
            transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }} // Added delay so they don't move in exact sync
            whileHover={{ scale: 1.1 }}
          >
            <Github size={20} />
          </motion.a>

          <h3 className="text-xl font-bold text-gray-200 mb-6 flex items-center gap-2 self-start md:self-center">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> GitHub Activity
          </h3>
          
          <div className="w-full flex justify-center scale-90 md:scale-100 origin-center">
            <GitHubCalendar 
              username="manavmerja" 
              blockSize={13}
              blockMargin={4}
              fontSize={14}
              theme={{
                light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                dark: ['#1f2937', '#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd'],
              }}
              style={{ color: "white" }}
            />
          </div>
          
          <p className="text-gray-500 text-xs mt-4 font-mono text-center">
            * Contribution graph for the last year
          </p>
        </div>

      </div>
    </section>
  );
}