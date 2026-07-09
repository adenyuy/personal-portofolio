"use client";

import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import HoloProfileCard from "./HoloProfileCard";
import PixelCard from "./PixelCard";

import Shuffle from "./Shuffle";

function LetsTalkCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const scrollAnimRef = useRef<ReturnType<typeof animate> | null>(null);

  // Raw motion values
  const planeX = useMotionValue(0);
  const planeY = useMotionValue(0);
  const planeRotate = useMotionValue(45);
  const planeScale = useMotionValue(1);
  const planeOpacity = useMotionValue(1);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current || isFlying) return;
    const rect = ctaRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFlying) return;

    const contactEl = document.querySelector("#contact") as HTMLElement | null;
    if (!contactEl) return;

    const targetScrollY = contactEl.getBoundingClientRect().top + window.scrollY;
    const startScrollY = window.scrollY;
    const totalDistance = targetScrollY - startScrollY;

    // Capture the viewport position of the click
    const clickX = (e as unknown as MouseEvent).clientX;
    const clickY = (e as unknown as MouseEvent).clientY;
    const centerX = window.innerWidth / 2;

    setStartPos({ x: clickX, y: clickY });
    setIsFlying(true);

    const DURATION = 2500; // ms
    const startTime = performance.now();

    // Stop any existing scroll/RAF
    if (scrollAnimRef.current) scrollAnimRef.current.stop();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const flyLoop = (now: number) => {
      const elapsed = now - startTime;
      const rawT = Math.min(elapsed / DURATION, 1);

      // easeInOutCubic
      const t = rawT < 0.5
        ? 4 * rawT * rawT * rawT
        : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

      // Scroll position: move the view alongside the plane
      const currentScroll = startScrollY + totalDistance * t;
      window.scrollTo(0, currentScroll);

      // -- Plane position on screen --
      // Phase 1 (0–15%): Kick UP & sideways from click point (liftoff sling)
      // Phase 2 (15%–70%): Glide to screen center, following the view
      // Phase 3 (70%–100%): Dive down off screen

      let screenX: number;
      let screenY: number;
      let rotation: number;
      let scaleFactor: number;
      let opacity = 1;

      if (rawT < 0.15) {
        // Liftoff: pull up and slightly left, growing
        const p = rawT / 0.15;
        screenX = clickX + (-60) * p;
        screenY = clickY + (-120) * p;
        rotation = 45 + (-60) * p; // tilt backwards
        scaleFactor = 1 + 0.3 * p;
      } else if (rawT < 0.7) {
        // Glide: ease into center of screen with natural S-curve wobble
        const p = (rawT - 0.15) / 0.55;
        const easeP = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

        // Wobble in X using a sine wave
        const wobble = Math.sin(p * Math.PI * 3) * 25 * (1 - p);
        screenX = clickX - 60 + (centerX - clickX + 60) * easeP + wobble;
        screenY = clickY - 120 + (window.innerHeight * 0.42 - (clickY - 120)) * easeP;

        // Angle should point forward-down as it glides
        rotation = -15 + (90 - (-15)) * easeP;
        scaleFactor = 1.3 + 0.7 * easeP;
      } else {
        // Dive off screen
        const p = (rawT - 0.7) / 0.3;
        const easeP = p * p;

        screenX = centerX + Math.sin(p * Math.PI) * 40;
        screenY = window.innerHeight * 0.42 + (window.innerHeight * 0.7) * easeP;
        rotation = 90;
        scaleFactor = 2 + 2 * p;
        opacity = 1 - easeP;
      }

      planeX.set(screenX - 24);
      planeY.set(screenY - 24);
      planeRotate.set(rotation);
      planeScale.set(scaleFactor);
      planeOpacity.set(opacity);

      if (rawT < 1) {
        animFrameRef.current = requestAnimationFrame(flyLoop);
      } else {
        setIsFlying(false);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(flyLoop);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (scrollAnimRef.current) scrollAnimRef.current.stop();
    };
  }, []);

  return (
    <>
      <a
        ref={ctaRef}
        href="#contact"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative inline-block font-barlow font-black text-[#e8481a] uppercase leading-none tracking-tight cursor-none"
        style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
      >
        {/* Hover-only local cursor plane */}
        <AnimatePresence>
          {isHovered && !isFlying && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ x: mousePos.x, y: mousePos.y, opacity: 1, scale: 1, rotate: 45 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", mass: 0.04, stiffness: 600, damping: 18 }}
              className="absolute top-0 left-0 pointer-events-none z-50 -ml-6 -mt-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]"
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`transition-all duration-500 ${isHovered && !isFlying ? "opacity-30 blur-[2px]" : "opacity-100"}`}>
          <Shuffle
            text="LET'S TALK"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={false}
            triggerOnHover={false}
            respectReducedMotion={true}
            loop={true}
            loopDelay={3}
          />
        </div>
      </a>

      {/* Global fixed-position flying plane driven by motion values */}
      {isFlying && (
        <motion.div
          className="fixed top-0 left-0 z-[9999] pointer-events-none text-white drop-shadow-[0_0_30px_rgba(232,72,26,0.9)]"
          style={{ x: planeX, y: planeY, rotate: planeRotate, scale: planeScale, opacity: planeOpacity }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" />
          </svg>
        </motion.div>
      )}
    </>
  );
}

function CounterNumber({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const isInfinity = value.includes("∞");
  const numericValue = isInfinity ? 0 : parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = isInfinity ? "" : value.replace(/\d/g, "");

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const display = useTransform(rounded, (latest) => isInfinity ? "∞" : `${latest}${suffix}`);

  useEffect(() => {
    if (isInView) {
      animate(count, numericValue, { duration: 2, ease: "easeOut" });
    }
  }, [count, isInView, numericValue]);

  return (
    <div ref={ref} className="flex flex-col">
      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-barlow font-black text-[#e8481a]"
        style={{
          fontSize: isInfinity
            ? "clamp(8rem, 18vw, 12rem)"   // much bigger for ∞
            : "clamp(5rem, 12vw, 11rem)",
          lineHeight: 1
        }}
      >
        <motion.span>{display}</motion.span>
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
          style={{ perspective: 1000 }}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[#e8481a] opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700" />

          {/* HUD Corner Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#e8481a]/40 group-hover:border-[#e8481a] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#e8481a]/40 group-hover:border-[#e8481a] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#e8481a]/40 group-hover:border-[#e8481a] group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-500" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#e8481a]/40 group-hover:border-[#e8481a] group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-500" />

          {/* Floating Image Container with Holographic 3D Tilt + Pixel Overlay on Hover */}
          <PixelCard variant="orange" className="w-full h-full">
            <HoloProfileCard />
          </PixelCard>
        </motion.div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-0 py-2">
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

          {/* Stats Row — items-end keeps all numbers bottom-aligned */}
          <div className="flex flex-col sm:flex-row items-end gap-12 sm:gap-24">
            <CounterNumber value="3" label="YEARS" />
            <CounterNumber value="10+" label="PROJECTS" />
            <CounterNumber value="∞" label="COFFEE CUPS" />
          </div>

          {/* Shuffle CTA with Flying Plane */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-8 flex justify-start"
          >
            <LetsTalkCTA />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
