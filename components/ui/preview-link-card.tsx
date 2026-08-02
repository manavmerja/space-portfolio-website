"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PreviewLinkCardProps extends HoverCardPrimitive.HoverCardProps {
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}

export function PreviewLinkCard({
  children,
  openDelay = 100,
  closeDelay = 200,
  ...props
}: PreviewLinkCardProps) {
  return (
    <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay} {...props}>
      {children}
    </HoverCardPrimitive.Root>
  );
}

export function PreviewLinkCardTrigger({
  className,
  children,
  asChild = true,
  ...props
}: HoverCardPrimitive.HoverCardTriggerProps) {
  return (
    <HoverCardPrimitive.Trigger asChild={asChild} className={cn("cursor-pointer", className)} {...props}>
      {children}
    </HoverCardPrimitive.Trigger>
  );
}

export function PreviewLinkCardContent({
  className,
  align = "center",
  sideOffset = 8,
  children,
  ...props
}: HoverCardPrimitive.HoverCardContentProps) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-[9999] w-72 rounded-2xl border border-white/20 bg-black/90 p-3 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.2)] outline-none overflow-hidden text-white",
          className
        )}
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
}

export function PreviewLinkCardImage({
  src,
  alt = "Preview",
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full h-36 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-950/80 via-black to-purple-950/80 border border-white/10 flex flex-col items-center justify-center p-4 text-center", className)}>
      <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mb-2">
        <span className="text-2xl">💬</span>
      </div>
      <h4 className="text-sm font-bold text-white tracking-wider">TEAM HEISENBERG</h4>
      <p className="text-[11px] text-cyan-400 font-mono mt-1">Official WhatsApp Community</p>
    </div>
  );
}
