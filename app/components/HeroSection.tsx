"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { Particles } from "./magicui/particles";
import { KineticText } from "./magicui/kinetic-text";
import { WordRotate } from "./magicui/word-rotate";

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
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#0a0a0a]"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        ease={80}
        color="#ffffff"
        size={1.5}
        vy={-0.1}
        refresh
      />
      {/* Background effects are now handled globally in app/layout.tsx */}

      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center text-center px-4 mt-32">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 font-barlow text-[#888] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-6 w-full justify-center"
        >
          <span>I AM MARVIN, A PASSIONATE</span>
          <div className="flex items-center justify-center bg-[#e8481a] text-black px-4 py-1.5 transform -skew-x-12 shadow-[0_0_20px_rgba(232,72,26,0.4)]">
            <div className="transform skew-x-12">
              <WordRotate
                words={["FULLSTACK DEVELOPER", "AI / ML ENTHUSIAST", "DATA SCIENTIST"]}
                className="text-black text-xs sm:text-sm font-black tracking-[0.3em] uppercase min-w-[250px] text-center"
                duration={3000}
                motionProps={{
                  initial: { opacity: 0, rotateX: -90, y: 10 },
                  animate: { opacity: 1, rotateX: 0, y: 0 },
                  exit: { opacity: 0, rotateX: 90, y: -10 },
                  transition: { duration: 0.5, ease: "backOut" }
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Main Headline */}
        <div className="overflow-hidden relative z-10">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex justify-center"
          >
            <KineticText
              as="h1"
              text="THIS IS MY"
              className="font-barlow font-black text-[#e8481a] leading-[0.88] uppercase pointer-events-auto"
              style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)" }}
            />
          </motion.div>
        </div>
        <div className="overflow-hidden relative z-10">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="flex justify-center"
          >
            <KineticText
              as="div"
              text="PORTOFOLIO"
              className="font-barlow font-black text-[#e8481a] leading-[0.88] uppercase pointer-events-auto"
              style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* 3D Asset Background */}
      <motion.div
        style={{ y: robotY }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-auto"
      >
        <RobotScene />
      </motion.div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-10" />
    </section>
  );
}
