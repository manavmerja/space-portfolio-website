"use client";

import React, { useEffect, useState } from "react";
import { Cloud } from "react-icon-cloud";

export const IconCloud = ({ iconSlugs }: { iconSlugs: string[] }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const iconTags = iconSlugs.map((slug) => (
    <a 
      key={slug} 
      href="#" 
      onClick={(e) => e.preventDefault()}
      style={{ cursor: "default" }}
    >
      <img 
        src={`https://cdn.simpleicons.org/${slug}/white`} 
        alt={slug}
        height="40" 
        width="40"
        style={{ 
          objectFit: "contain",
          opacity: 0.9 
        }}
      />
    </a>
  ));

  return (
    <div className="relative flex items-center justify-center">
      <Cloud
        id="tech-stack-cloud"
        options={{
          clickToFront: 500,
          depth: 1,
          imageScale: 2,
          // ✅ FIX: Speed Badha di (0.1 -> 0.25) taaki ye apne aap ghume
          initial: [0.15, -0.15], 
          outlineColour: "#0000",
          reverse: true,
          tooltip: "native",
          tooltipDelay: 0,
          wheelZoom: false,
          // ✅ FIX: Dragging ke baad bhi ghumna chahiye
          freezeActive: false,
          shuffleTags: true,
        }}
      >
        {iconTags}
      </Cloud>
    </div>
  );
};