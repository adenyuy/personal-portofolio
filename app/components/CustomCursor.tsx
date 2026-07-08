"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height (16px for a 32px cursor)
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);

      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 bg-[#e8481a] rounded-full pointer-events-none z-[9999] mix-blend-screen"
      style={{ x: cursorX, y: cursorY }}
      animate={{
        width: isHovering ? 64 : 32,
        height: isHovering ? 64 : 32,
        x: isHovering ? cursorX.get() - 16 : cursorX.get(),
        y: isHovering ? cursorY.get() - 16 : cursorY.get(),
        backgroundColor: isHovering ? "rgba(232, 72, 26, 0.2)" : "rgba(232, 72, 26, 1)",
        backdropFilter: isHovering ? "blur(4px)" : "blur(0px)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
}
