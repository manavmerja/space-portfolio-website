"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteors, setMeteors] = useState<number[]>([]);

  useEffect(() => {
    // Client-side par meteors generate karo
    setMeteors(new Array(number).fill(true));
  }, [number]);

  return (
    <>
      {meteors.map((_, idx) => (
        <motion.span
          key={"meteor" + idx}
          initial={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: 0,
            // 📉 Movement Logic:
            // Left (-500px) aur Down (+500px) jao
            // Ye visual direction ke saath match karega
            x: -500, 
            y: 500,  
          }}
          transition={{
            duration: Math.random() * 2 + 2, // 2s - 4s speed
            repeat: Infinity,
            delay: Math.random() * 3, // Random start
            ease: "easeIn", // Gravity feel
          }}
          style={{
            // 📍 CRITICAL FIX:
            // Top: Screen ke upar (-5px)
            top: -5,
            
            // Left: Screen ke Left (-50%) se Right (100%) tak failao
            // Isse wo puri screen cover karenge
            left: Math.floor(Math.random() * 150 - 50) + "%", 
            
            position: "absolute",
            zIndex: 20, // Z-index high rakha taaki sabke upar dikhe
          }}
          className={cn(
            // Meteor Head
            "h-0.5 w-0.5 rounded-full bg-white shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            // Meteor Tail (Pooch)
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[150px] before:h-[1px] before:bg-gradient-to-r before:from-cyan-400 before:to-transparent",
            className
          )}
        />
      ))}
    </>
  );
};