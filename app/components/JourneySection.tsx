"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

interface JourneyItem {
  id: number;
  period: string;
  role: string;
  company: string;
  companyFull: string;
  type: "WORK" | "INTERNSHIP" | "ORGANIZATION";
  description: string;
  tags: string[];
  accent: string;
  glow: string;
  index: string;
}

const journeyData: JourneyItem[] = [
  {
    id: 1,
    period: "JULY 2026 – AUGUST 2026",
    role: "DATA ANALYST",
    company: "KEMENDIKDASMEN",
    companyFull: "KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH",
    type: "WORK",
    description:
      "Monitored operational performance and evaluated facilitator engagement to ensure milestone completion. Designed an interactive tracking dashboard for data-driven decision-making.",
    tags: ["DATA ANALYTICS", "DASHBOARD"],
    accent: "#FF0055",
    glow: "radial-gradient(circle at 70% 30%, rgba(255, 0, 85, 0.25) 0%, transparent 50%)",
    index: "01",
  },
  {
    id: 2,
    period: "SEPT 2025 – JUNE 2026",
    role: "DATA OPERATION",
    company: "KEMENDIKDASMEN",
    companyFull: "KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH",
    type: "WORK",
    description:
      "Led digital transformation via a custom web-based system. Developed automated web scraping scripts and resolved critical synchronization bugs to maintain optimal performance.",
    tags: ["DATA OPS", "SCRAPING", "WEB DEV"],
    accent: "#00E5FF",
    glow: "radial-gradient(circle at 30% 70%, rgba(0, 229, 255, 0.25) 0%, transparent 50%)",
    index: "02",
  },
  {
    id: 3,
    period: "SEPT 2025 – NOV 2025",
    role: "HEAD OF ACADEMIC",
    company: "EXPECTIK",
    companyFull: "EXPECTIK COMMITTEE",
    type: "ORGANIZATION",
    description:
      "Directed a cross-functional team of 7 staff members, overseeing the end-to-end planning and execution of the orientation program for over 300+ new Informatics Engineering students.",
    tags: ["LEADERSHIP", "CURRICULUM"],
    accent: "#8A2BE2",
    glow: "radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.25) 0%, transparent 50%)",
    index: "03",
  },
  {
    id: 4,
    period: "FEB 2022 – APR 2022",
    role: "IT SUPPORT",
    company: "PPKPI",
    companyFull: "PPKPI JAKARTA",
    type: "INTERNSHIP",
    description:
      "Provided first-level technical support and performed network troubleshooting to ensure smooth daily operations. Designed visual content for the official Instagram account.",
    tags: ["IT SUPPORT", "NETWORKING"],
    accent: "#FFEA00",
    glow: "radial-gradient(circle at 20% 20%, rgba(255, 234, 0, 0.2) 0%, transparent 50%)",
    index: "04",
  },
];

// ── Glitch text component ─────────────────────────────────────────────────────
function GlitchText({ text }: { text: string }) {
  const [glitching, setGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

  useEffect(() => {
    // Random glitch bursts
    const scheduleGlitch = () => {
      const delay = 2000 + Math.random() * 4000;
      const timer = setTimeout(() => {
        setGlitching(true);
        let count = 0;
        const maxCount = 12;
        const interval = setInterval(() => {
          if (count >= maxCount) {
            clearInterval(interval);
            setDisplayText(text);
            setGlitching(false);
            scheduleGlitch();
          } else {
            setDisplayText(
              text
                .split("")
                .map((char, i) => {
                  if (char === " ") return " ";
                  if (i < (count / maxCount) * text.length) return text[i];
                  return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("")
            );
            count++;
          }
        }, 45);
      }, delay);
      return timer;
    };
    const t = scheduleGlitch();
    return () => clearTimeout(t);
  }, [text]);

  return (
    <span className="relative inline-block">
      {displayText}
      {/* RGB split layers */}
      {glitching && (
        <>
          <span
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              color: "#ff0040",
              clipPath: "inset(30% 0 40% 0)",
              transform: "translate(-3px, 1px)",
              opacity: 0.7,
              mixBlendMode: "screen",
            }}
            aria-hidden
          >
            {displayText}
          </span>
          <span
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              color: "#00ffcc",
              clipPath: "inset(60% 0 10% 0)",
              transform: "translate(3px, -1px)",
              opacity: 0.7,
              mixBlendMode: "screen",
            }}
            aria-hidden
          >
            {displayText}
          </span>
        </>
      )}
    </span>
  );
}

// SVG Noise Filter Component for Cinematic Grain
function CinematicGrain() {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.08] mix-blend-screen">
      <svg className="absolute w-0 h-0">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0" />
        </filter>
      </svg>
      <div className="w-full h-full" style={{ filter: "url(#noiseFilter)" }}></div>
    </div>
  );
}

function CinematicIntro({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const totalPanels = journeyData.length;
  const block = 1 / (totalPanels + 2);
  const fadeOutStart = block * 0.4;
  const fadeOutEnd = block * 0.8;
  
  const opacity = useTransform(scrollProgress, [0, fadeOutStart, fadeOutEnd], [1, 1, 0]);
  const display = useTransform(scrollProgress, (p) => (p > fadeOutEnd ? "none" : "flex"));
  const scale = useTransform(scrollProgress, [0, fadeOutEnd], [1, 1.4]);
  const letterSpacing = useTransform(scrollProgress, [0, fadeOutEnd], ["0.1em", "0.6em"]);
  const filter = useTransform(scrollProgress, [0, fadeOutEnd], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.div
      style={{ opacity, display, zIndex: 1 }}
      className="absolute inset-0 w-full h-full bg-[#030303] flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ scale, filter }} className="text-center relative z-10 flex flex-col items-center">
        <motion.p
          className="font-barlow font-bold text-white text-sm tracking-[0.3em] uppercase mb-2"
        >
          THE
        </motion.p>
        <motion.h1
          style={{
            letterSpacing,
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)",
          }}
          className="font-barlow font-black text-transparent uppercase text-6xl lg:text-[8rem] leading-none"
        >
          <GlitchText text="EXPERIENCE" />
        </motion.h1>
      </motion.div>
      
      {/* Cinematic light leak */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
    </motion.div>
  );
}

function CinematicPanel({
  item,
  idx,
  scrollProgress,
}: {
  item: JourneyItem;
  idx: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const totalPanels = journeyData.length;
  const block = 1 / (totalPanels + 2);
  const start = (idx + 1) * block;
  
  const fadeInStartRaw = start - block * 0.3;
  const fadeInEndRaw = start + block * 0.1;
  const fadeOutStartRaw = start + block * 0.7;
  const fadeOutEndRaw = start + block * 1.1;

  const fadeInStart = Math.max(0, Math.min(1, fadeInStartRaw));
  const fadeInEnd = Math.max(0, Math.min(1, fadeInEndRaw));
  const fadeOutStart = Math.max(0, Math.min(1, fadeOutStartRaw));
  const fadeOutEnd = Math.max(0, Math.min(1, fadeOutEndRaw));

  const opacity = useTransform(
    scrollProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
  
  const bgScale = useTransform(scrollProgress, [fadeInStart, fadeOutEnd], [1, 1.25]);
  const titleX = useTransform(scrollProgress, [fadeInStart, fadeOutEnd], ["10%", "-10%"]);
  const contentY = useTransform(scrollProgress, [fadeInStart, fadeInEnd], [80, 0]);
  const contentOpacity = useTransform(scrollProgress, [fadeInStart, fadeInEnd], [0, 1]);

  return (
    <motion.div
      style={{ opacity, zIndex: idx + 10 }}
      className="absolute inset-0 w-full h-full bg-[#030303] overflow-hidden flex items-center"
    >
      {/* Background Orbs / Lighting */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 origin-center pointer-events-none">
        <div className="absolute inset-0" style={{ background: item.glow, mixBlendMode: "screen" }} />
        {/* Additional dramatic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_80%)] opacity-90" />
      </motion.div>

      {/* Massive Background Title */}
      <motion.div
        style={{ x: titleX }}
        className="absolute w-full top-1/3 -translate-y-1/2 pointer-events-none select-none z-0"
      >
        <h2
          className="font-barlow font-black uppercase whitespace-nowrap opacity-30"
          style={{
            fontSize: "clamp(12rem, 25vw, 30rem)",
            WebkitTextStroke: `5px ${item.accent}`,
            color: "transparent",
            letterSpacing: "-0.02em"
          }}
        >
          {item.company}
        </h2>
      </motion.div>

      {/* Main Content Overlay */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-end h-[70%] mt-[10vh]">
        
        {/* Left: Role & Company */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col gap-2 max-w-2xl"
        >
          <span
            className="font-barlow font-black text-6xl md:text-8xl lg:text-[140px] leading-none drop-shadow-2xl"
            style={{ color: item.accent }}
          >
            {item.index}
          </span>
          <h3 className="font-barlow font-black text-4xl md:text-6xl text-white uppercase tracking-wider mt-2 md:mt-4">
            {item.role}
          </h3>
          <p className="font-barlow font-bold text-base md:text-xl text-white/70 tracking-[0.3em] uppercase">
            {item.companyFull}
          </p>
        </motion.div>

        {/* Right: Description & Meta */}
        <motion.div
          style={{ y: useTransform(scrollProgress, [fadeInStart, fadeOutEnd], [60, -60]), opacity: contentOpacity }}
          className="flex flex-col gap-6 md:max-w-sm lg:max-w-md mt-12 md:mt-0 pb-8"
        >
          <div className="h-1 w-20" style={{ backgroundColor: item.accent, boxShadow: `0 0 20px ${item.accent}` }} />
          <p className="font-sans text-base md:text-lg text-white/80 leading-relaxed font-light">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <span
              className="px-4 py-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase border border-white/30 text-white/90 backdrop-blur-sm rounded-sm"
            >
              {item.type}
            </span>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-sm backdrop-blur-md"
                style={{
                  color: item.accent,
                  backgroundColor: `${item.accent}15`,
                  border: `1px solid ${item.accent}30`
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="font-barlow font-bold text-xs text-white/40 tracking-[0.2em] uppercase mt-2">
            {item.period}
          </p>
        </motion.div>
      </div>

    </motion.div>
  );
}

function CinematicOutro({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const totalPanels = journeyData.length;
  const block = 1 / (totalPanels + 2);
  const fadeInStartRaw = 1 - block * 0.9;
  const fadeInEndRaw = 1 - block * 0.4;
  
  const fadeInStart = Math.max(0, Math.min(1, fadeInStartRaw));
  const fadeInEnd = Math.max(0, Math.min(1, fadeInEndRaw));

  const opacity = useTransform(scrollProgress, [fadeInStart, fadeInEnd], [0, 1]);
  const display = useTransform(scrollProgress, (p) => (p < fadeInStart ? "none" : "flex"));
  const scale = useTransform(scrollProgress, [fadeInStart, 1], [1.4, 1]);
  const letterSpacing = useTransform(scrollProgress, [fadeInStart, 1], ["0.6em", "0.1em"]);
  const filter = useTransform(scrollProgress, [fadeInStart, 1], ["blur(12px)", "blur(0px)"]);

  return (
    <motion.div
      style={{ opacity, display, zIndex: 1 }}
      className="absolute inset-0 w-full h-full bg-[#030303] flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ scale, filter }} className="text-center relative z-10 flex flex-col items-center">
        <motion.p
          className="font-barlow font-bold text-white text-sm tracking-[0.3em] uppercase mb-2"
        >
          THE
        </motion.p>
        <motion.h1
          style={{
            letterSpacing,
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)",
          }}
          className="font-barlow font-black text-transparent uppercase text-6xl lg:text-[8rem] leading-none"
        >
          <GlitchText text="EXPERIENCE" />
        </motion.h1>
      </motion.div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
    </motion.div>
  );
}

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPanels = journeyData.length;
  // Make the section extremely tall so the scroll feels slow and cinematic
  const totalHeight = `${(totalPanels + 2) * 120}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative bg-[#030303]"
      style={{ height: totalHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ isolation: "isolate" }}>
        
        {/* Cinematic Letterbox Borders */}
        <div className="absolute top-0 left-0 w-full h-[6vh] bg-[#000] z-50 shadow-[0_20px_50px_rgba(0,0,0,0.9)]" />
        <div className="absolute bottom-0 left-0 w-full h-[6vh] bg-[#000] z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.9)]" />
        
        {/* Cinematic Grain Overlay */}
        <CinematicGrain />

        <CinematicIntro scrollProgress={scrollYProgress} />

        {journeyData.map((item, i) => (
          <CinematicPanel
            key={item.id}
            item={item}
            idx={i}
            scrollProgress={scrollYProgress}
          />
        ))}
        
        <CinematicOutro scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
}
