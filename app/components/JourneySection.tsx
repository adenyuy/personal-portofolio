"use client";

import { motion, useInView, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function GlitchText({ text, trigger, delay }: { text: string; trigger: boolean; delay: number }) {
  const [display, setDisplay] = useState(text.replace(/[a-zA-Z0-9]/g, "_"));
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    if (!trigger) return;

    const timeout = setTimeout(() => {
      let iteration = 0;
      const maxIterations = 20; // Slower decode

      const interval = setInterval(() => {
        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplay(text);
        } else {
          setDisplay(
            text.split("").map((char, index) => {
              if (char === " ") return " ";
              if (index < (iteration / maxIterations) * text.length) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            }).join("")
          );
        }
        iteration++;
      }, 50);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [trigger, text, delay]);

  return <span>{display}</span>;
}

interface JourneyItem {
  id: number;
  year: string;
  period: string;
  role: string;
  company: string;
  type: "WORK" | "INTERNSHIP" | "ORGANIZATION";
  description: string;
  tags: string[];
}

const journeyData: JourneyItem[] = [
  {
    id: 1,
    year: "2025",
    period: "SEPT 2025 - JUNE 2026",
    role: "DATA VERIFIER (DIGITALIZATION TEAM)",
    company: "KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH",
    type: "WORK",
    description:
      "Maintained and enhanced an existing enterprise web application, consistently deploying new features. Resolved critical system bugs and data synchronization issues, successfully fixing a data duplication error. Conducted regular system troubleshooting.",
    tags: ["Enterprise Web App", "Troubleshooting", "Data Sync", "Bug Fixing"],
  },
  {
    id: 2,
    year: "2025",
    period: "SEPT 2025 - NOV 2025",
    role: "HEAD OF ACADEMIC DIVISION",
    company: "EXPECTIK (EXPLORATION & PERCEPTION WEEK)",
    type: "ORGANIZATION",
    description:
      "Directed and managed a cross-functional team of 7 staff members, overseeing the end-to-end planning and execution of the orientation program for over 300+ new Informatics Engineering students. Spearheaded the curriculum development strategy.",
    tags: ["Leadership", "Curriculum Dev", "Project Management", "Team Synergy"],
  },
  {
    id: 3,
    year: "2025",
    period: "JUL 2025 - AUG 2025",
    role: "SECURITY & LOGISTICS STAFF",
    company: "CAREER EXPO COMMITTEE",
    type: "ORGANIZATION",
    description:
      "Managed all logistical and operational aspects of the event, including equipment procurement, vendor contracts, consumption distribution, and first aid readiness. Ensured event security and order.",
    tags: ["Event Management", "Logistics", "Risk Management"],
  },
  {
    id: 4,
    year: "2024",
    period: "SEPT 2024 - NOV 2024",
    role: "ACADEMIC DIVISION STAFF",
    company: "EXPECTIK (EXPLORATION & PERCEPTION WEEK)",
    type: "ORGANIZATION",
    description:
      "Designed and developed a comprehensive assignment curriculum for over 300 new students, covering academic, self-development, and creative aspects. Actively contributed to creating a positive orientation experience.",
    tags: ["Curriculum Design", "Mentorship", "Student Adaptability"],
  },
  {
    id: 5,
    year: "2022",
    period: "FEB 2022 - APR 2022",
    role: "IT SUPPORT INTERN",
    company: "PPKPI JAKARTA",
    type: "INTERNSHIP",
    description:
      "Provided first-level technical support to trainees and staff on issues related to computer hardware and internet connectivity. Designed and created visual content for the official Instagram account.",
    tags: ["Technical Support", "Hardware", "Networking", "Graphic Design"],
  },
];

const typeColor: Record<JourneyItem["type"], string> = {
  WORK: "#e8481a",
  INTERNSHIP: "#fb923c",
  ORGANIZATION: "#3b82f6",
};

const typeBg: Record<JourneyItem["type"], string> = {
  WORK: "rgba(232,72,26,0.12)",
  INTERNSHIP: "rgba(251,146,60,0.10)",
  ORGANIZATION: "rgba(59,130,246,0.12)",
};

export default function JourneySection() {
  const [active, setActive] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Outer container gets 400vh for a long scroll runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let newIndex = Math.floor(latest * journeyData.length);
    if (newIndex >= journeyData.length) newIndex = journeyData.length - 1;
    if (newIndex < 0) newIndex = 0;

    if (newIndex !== active) {
      setActive(newIndex);
    }
  });

  const activeItem = journeyData[active];

  return (
    <section ref={containerRef} id="experience" className="relative h-[400vh] bg-[#0a0a0a]">
      {/* Sticky container that stays on screen while scrolling the 400vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center border-t border-white/5 bg-[#0a0a0a]">

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-[#e8481a]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* ── Section Header ── */}
        <div className="px-6 lg:px-16 mb-12 relative z-10 w-full">
          <div className="flex items-center gap-8">
            <div>
              <p className="font-barlow text-[#555] font-bold text-sm tracking-[0.3em] uppercase mb-2">
                THE
              </p>
              <h2
                className="font-barlow font-black text-transparent uppercase text-5xl md:text-6xl lg:text-[7rem] leading-none tracking-tighter"
                style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)" }}
              >
                EXPERIENCE
              </h2>
            </div>
            <div className="flex-1 h-px bg-[#2a2a2a] origin-left hidden md:block" />
            <span className="font-barlow font-bold text-[#555] text-xs tracking-widest uppercase hidden md:block">
              CAREER & ORG
            </span>
          </div>
        </div>

        {/* ── Main Layout ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start px-6 lg:px-16 w-full relative z-10">

          {/* LEFT: Stacked Timeline Cards */}
          <div className="flex flex-col gap-3 lg:w-[340px] flex-shrink-0 relative">

            {/* Background static line */}
            <div className="absolute left-[calc(6rem+20px)] lg:-left-6 w-[2px] top-4 bottom-4 bg-[#1a1a1a]" />

            {journeyData.map((item, i) => {
              const isRevealed = active >= i; // It has been dripped on
              const isCurrentlyActive = active === i;
              const color = typeColor[item.type];

              return (
                <div key={item.id} className="relative">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isRevealed ? 1 : 0, x: isRevealed ? 0 : -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="relative p-5 border border-[#2a2a2a] bg-[#0f0f0f] rounded-none overflow-hidden transition-all duration-300">

                      {/* The Fluid Liquid Border */}
                      {isCurrentlyActive && (
                        <motion.div
                          layoutId="liquidBorder"
                          className="absolute inset-0 pointer-events-none z-10"
                          style={{
                            border: `2px solid ${color}`,
                            boxShadow: `inset 0 0 20px ${color}15, 0 0 20px ${color}30`,
                            backgroundColor: `${color}05`
                          }}
                          transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        />
                      )}

                      <div className="flex items-start justify-between gap-4 pl-2 relative z-20">
                        <div className="flex flex-col gap-1">
                          <span className="font-mono font-bold text-3xl tracking-tight leading-none" style={{ color: isCurrentlyActive ? color : "#444" }}>
                            {item.year}
                          </span>
                          <span className="font-barlow font-black text-white text-sm uppercase tracking-wider leading-tight">
                            {item.role}
                          </span>
                          <span className="font-barlow text-[#555] text-xs uppercase tracking-widest">
                            {item.company}
                          </span>
                        </div>

                        <span
                          className="font-mono font-bold text-[10px] tracking-[0.1em] uppercase px-2 py-1 flex-shrink-0"
                          style={{
                            color: isCurrentlyActive ? color : "#555",
                            border: `1px solid ${isCurrentlyActive ? color + '40' : '#333'}`,
                            backgroundColor: isCurrentlyActive ? color + '10' : 'transparent',
                          }}
                        >
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Water Drip Animation using layoutId */}
                  {isCurrentlyActive && (
                    <motion.div
                      layoutId="waterDrop"
                      className="absolute left-[calc(6rem+16px)] lg:-left-[29px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-20"
                      style={{ backgroundColor: color, boxShadow: `0 0 15px 3px ${color}` }}
                      transition={{ type: "spring", stiffness: 100, damping: 18 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: Detail Panel */}
          <div className="flex-1 min-h-[360px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative h-full"
              >
                {/* Corner accents */}
                <div
                  className="absolute top-0 left-0 w-12 h-12 pointer-events-none"
                  style={{ borderTop: `2px solid ${typeColor[activeItem.type]}`, borderLeft: `2px solid ${typeColor[activeItem.type]}` }}
                />
                <div
                  className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
                  style={{ borderBottom: `2px solid ${typeColor[activeItem.type]}40`, borderRight: `2px solid ${typeColor[activeItem.type]}40` }}
                />

                <div className="p-8 lg:p-10">
                  {/* Period label */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: typeColor[activeItem.type], boxShadow: `0 0 10px ${typeColor[activeItem.type]}` }}
                    />
                    <span className="font-barlow font-bold text-sm tracking-[0.25em] uppercase" style={{ color: typeColor[activeItem.type] }}>
                      <GlitchText text={activeItem.period} trigger={true} delay={0.1} />
                    </span>
                  </div>

                  {/* Role */}
                  <h3 className="font-barlow font-black text-white uppercase tracking-tight mb-1" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.05 }}>
                    <GlitchText text={activeItem.role} trigger={true} delay={0.2} />
                  </h3>
                  <p className="font-barlow font-bold text-[#666] text-sm uppercase tracking-widest mb-8">
                    <GlitchText text={activeItem.company} trigger={true} delay={0.4} />
                  </p>

                  {/* Description with animated line */}
                  <div className="relative pl-5 border-l border-[#2a2a2a] mb-8">
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      style={{ backgroundColor: typeColor[activeItem.type] }}
                    />
                    <p className="font-inter text-[#bbb] text-base leading-relaxed">
                      {activeItem.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {activeItem.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.07 + 0.5 }}
                        className="font-barlow font-bold text-xs uppercase tracking-widest px-3 py-1.5"
                        style={{
                          color: typeColor[activeItem.type],
                          border: `1px solid ${typeColor[activeItem.type]}30`,
                          backgroundColor: `${typeColor[activeItem.type]}08`,
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
