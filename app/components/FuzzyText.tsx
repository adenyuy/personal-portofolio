"use client";
import React, { useState, useEffect } from 'react';

interface FuzzyTextProps {
  children: React.ReactNode;
  baseIntensity?: number;
  hoverIntensity?: number;
  enableHover?: boolean;
}

export default function FuzzyText({
  children,
  baseIntensity = 0.2,
  hoverIntensity = 0.3,
  enableHover = true
}: FuzzyTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [seed, setSeed] = useState(0);

  const intensity = isHovered && enableHover ? hoverIntensity : baseIntensity;

  // Calculate a scale for the displacement map based on the intensity
  // Reduced multiplier to make the glitch less aggressive
  const scale = intensity * 25;

  useEffect(() => {
    let animationFrameId: number;
    let lastUpdate = 0;

    // Update seed every 80ms to create a smoother, less jittery static effect
    const updateSeed = (time: number) => {
      if (time - lastUpdate > 80) {
        setSeed(Math.floor(Math.random() * 100));
        lastUpdate = time;
      }
      animationFrameId = requestAnimationFrame(updateSeed);
    };

    animationFrameId = requestAnimationFrame(updateSeed);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      className="relative inline-block cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="absolute w-0 h-0 pointer-events-none">
        <filter id="fuzzy">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.15"
            numOctaves="3"
            result="noise"
            seed={seed}
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div
        className="inline-block transition-all duration-300"
        style={{ filter: `url(#fuzzy)` }}
      >
        {children}
      </div>
    </div>
  );
}
