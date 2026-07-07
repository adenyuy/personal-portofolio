"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const RobotScene = dynamic(() => import("./RobotScene"), { ssr: false });

const words = ["WEBSITES", "APPS", "SYSTEMS", "EXPERIENCES"];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const robotY = useTransform(scrollYProgress, [0, 1], [0, -350]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden bg-[#0a0a0a]"
    >
      {/* Radial gradient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 70%, rgba(232,72,26,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Animated grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center text-center px-4 mt-24">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-barlow text-[#888] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-4"
        >
          I AM MARVIN
        </motion.p>

        {/* Main Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-barlow font-black text-[#e8481a] leading-[0.88] uppercase"
            style={{ fontSize: "clamp(3.5rem, 13vw, 14rem)", lineHeight: 0.88 }}
          >
            THIS IS MY
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="font-barlow font-black text-[#e8481a] leading-[0.88] uppercase"
            style={{ fontSize: "clamp(3.5rem, 13vw, 14rem)", lineHeight: 0.88 }}
          >
            PORTOFOLIO
          </motion.div>
        </div>

        {/* 3D Asset directly below text */}
        <motion.div
          style={{ y: robotY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="w-full max-w-4xl h-[50vh] mt-4 flex items-center justify-center z-20 relative"
        >
          <RobotScene />
        </motion.div>
      </motion.div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-10" />
    </section>
  );
}
