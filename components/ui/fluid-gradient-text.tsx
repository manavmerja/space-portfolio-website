"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export type FluidGradientTextProps = {
  /** Text content rendered inside the SVG. */
  text: string;
  /**
   * SVG viewBox width used to scale the gradient and text layout.
   * @default 1200
   * */
  svgViewBoxWidth?: number;
  /**
   * SVG viewBox height used as the base text size.
   * @default 300
   * */
  svgViewBoxHeight?: number;
  className?: string;
  fontFamily?: string;
};

export function FluidGradientText({
  text,
  svgViewBoxWidth = 1200,
  svgViewBoxHeight = 300,
  className = "",
  fontFamily = "var(--font-doto), 'Doto', monospace, sans-serif",
}: FluidGradientTextProps) {
  const gradientX1Raw = useMotionValue(0.5);
  const gradientX1 = useSpring(
    useTransform(gradientX1Raw, [0, 1], [0, svgViewBoxWidth]),
    {
      stiffness: 150,
      damping: 25,
    }
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const containerRect = event.currentTarget.getBoundingClientRect();
    gradientX1Raw.set(
      (event.clientX - containerRect.left) / containerRect.width
    );
  };

  const handleMouseLeave = () => {
    gradientX1Raw.set(0.5);
  };

  return (
    <div
      className={`relative size-full overflow-hidden after:absolute after:bottom-0 after:h-px after:w-full after:bg-white/10 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        className="size-full select-none"
        viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          stroke="#ffffff"
          strokeOpacity="0.2"
          strokeWidth="1.5"
          fill="url(#fluid_gradient_text_linear)"
          style={{
            fontFamily,
            fontSize: svgViewBoxHeight * 0.75,
            fontWeight: "900",
            letterSpacing: "0.02em",
          }}
        >
          {text}
        </text>
        <defs>
          <motion.linearGradient
            id="fluid_gradient_text_linear"
            x1={gradientX1}
            y1="0"
            x2={svgViewBoxWidth / 2}
            y2={svgViewBoxHeight}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="1" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  );
}
