"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

function TickerTapeCTA() {
  return (
    <a href="#contact" className="group relative flex items-center justify-end w-12 hover:w-64 overflow-hidden bg-[#e8481a] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] cursor-pointer mt-4 rounded-full shadow-2xl p-1 h-12 origin-left">

      {/* Ticker Tape Area */}
      <div className="absolute left-1 right-11 overflow-hidden h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
        {/* Gradient fades on edges to make scrolling smooth inside the pill */}
        <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-[#e8481a] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-[#e8481a] to-transparent z-10" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="flex items-center whitespace-nowrap font-barlow font-black text-black text-[11px] tracking-widest uppercase h-full"
        >
          <span className="mx-2">LET&apos;S TALK</span>
          <span className="mx-2">•</span>
          <span className="mx-2">LET&apos;S TALK</span>
          <span className="mx-2">•</span>
          <span className="mx-2">LET&apos;S TALK</span>
          <span className="mx-2">•</span>
          <span className="mx-2">LET&apos;S TALK</span>
          <span className="mx-2">•</span>
          {/* DUPLICATE */}
          <span className="mx-2">LET&apos;S TALK</span>
          <span className="mx-2">•</span>
          <span className="mx-2">LET&apos;S TALK</span>
          <span className="mx-2">•</span>
          <span className="mx-2">LET&apos;S TALK</span>
          <span className="mx-2">•</span>
          <span className="mx-2">LET&apos;S TALK</span>
          <span className="mx-2">•</span>
        </motion.div>
      </div>

      {/* Button Affordance (Arrow Icon) */}
      <div className="flex-shrink-0 w-10 h-10 bg-[#111] rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-500 z-20 shadow-md">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white group-hover:text-black group-hover:rotate-45 group-hover:scale-110 transition-all duration-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </a>
  );
}

function CounterNumber({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col">
      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-barlow font-black text-[#e8481a]"
        style={{ fontSize: "clamp(5rem, 12vw, 11rem)", lineHeight: 1 }}
      >
        {value}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="font-barlow font-bold text-[#888] text-sm tracking-[0.3em] uppercase -mt-2"
      >
        {label}
      </motion.span>
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="bg-[#0a0a0a] py-10 lg:py-16">
      {/* Header matching WorksSection but without lines */}
      <div ref={ref} className="py-8 px-6 lg:px-16 bg-[#0a0a0a] overflow-hidden mb-8">
        <div className="flex items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-barlow text-[#555] text-xs tracking-[0.3em] uppercase mb-1">
              THE
            </p>
            <h2
              className="font-barlow font-black text-white uppercase"
              style={{ fontSize: "clamp(2rem, 6vw, 5rem)", lineHeight: 1 }}
            >
              PROFILE
            </h2>
          </motion.div>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 h-px bg-[#2a2a2a] origin-left"
          />

          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-barlow font-bold text-[#555] text-xs tracking-widest uppercase"
          >
            ABOUT ME
          </motion.span>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 lg:px-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left: Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="lg:w-[28rem] lg:h-[36rem] w-full h-80 flex-shrink-0 relative group p-4"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[#e8481a] opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700" />
          
          {/* HUD Corner Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#e8481a]/40 group-hover:border-[#e8481a] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#e8481a]/40 group-hover:border-[#e8481a] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#e8481a]/40 group-hover:border-[#e8481a] group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-500" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#e8481a]/40 group-hover:border-[#e8481a] group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-500" />

          {/* Floating Image Container */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full relative overflow-hidden bg-[#141414] shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(232,72,26,0.3)] border border-white/5"
          >
            {/* Sci-Fi Scanning Line Animation */}
            <motion.div
              animate={{ y: ["-100%", "500%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-[#e8481a]/30 to-transparent z-20 pointer-events-none mix-blend-overlay"
            />
            
            {/* Permanent warm overlay that intensifies on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#e8481a]/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            
            <Image
              src="/assets/foto2.jpeg"
              alt="Marvin Raditya Nugraha"
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover object-top scale-100 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
            />
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-2 py-2">
          {/* Top Row: Bio */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
            {/* Bio */}
            <motion.div
              className="flex-1 font-barlow font-bold text-[#aaa] uppercase leading-[1.4]"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}
            >
              {"A THIRD-YEAR INFORMATICS ENGINEERING STUDENT AT POLITEKNIK NEGERI JAKARTA WITH A ROBUST FOUNDATION IN DATA SCIENCE, MACHINE LEARNING, AND FULL-STACK DEVELOPMENT. I AM HIGHLY PASSIONATE ABOUT BRIDGING COMPLEX DATA STRUCTURES WITH INTUITIVE SYSTEM DESIGNS TO SOLVE REAL-WORLD PROBLEMS.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.02 }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 pt-4">
            <CounterNumber value="3" label="YEARS" />
            <CounterNumber value="10+" label="PROJECTS" />
            <CounterNumber value="10+" label="CLIENTS" />
          </div>

          {/* Expanding Ticker Tape CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-6"
          >
            <TickerTapeCTA />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
