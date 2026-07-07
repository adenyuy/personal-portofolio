"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    const duration = 2000; // 2 seconds
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      
      // Add some easing to the progress calculation for a more natural feel
      // A simple ease-out curve
      const easeOutProgress = Math.floor(100 * (1 - Math.pow(1 - newProgress / 100, 3)));
      
      setProgress(easeOutProgress > 100 ? 100 : easeOutProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = ""; // Re-enable scrolling
        }, 500); // Wait a bit after hitting 100 before animating out
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated background grain/glow */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "150px 150px",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#e8481a] rounded-full blur-[120px] opacity-20 pointer-events-none" />

          {/* Progress Number */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-baseline"
            >
              <span 
                className="font-barlow font-black text-white leading-none"
                style={{ fontSize: "clamp(6rem, 15vw, 12rem)" }}
              >
                {progress}
              </span>
              <span className="font-barlow font-black text-[#e8481a] text-2xl lg:text-5xl ml-2">
                %
              </span>
            </motion.div>
            
            {/* Loading text and bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-8 flex flex-col items-center gap-4 w-64"
            >
              <span className="font-barlow font-bold text-[#555] text-xs tracking-[0.4em] uppercase">
                INITIALIZING PORTFOLIO
              </span>
              <div className="w-full h-[2px] bg-[#222] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#e8481a]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
