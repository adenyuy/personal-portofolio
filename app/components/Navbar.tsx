"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const sections = ["hero", "about", "works", "skills", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const ringRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  // Live WIB clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const wib = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setTime(wib);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Custom cursor
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);

    // Smooth ring follow
    const animate = () => {
      ringRef.current.x += (cursorPos.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (cursorPos.y - ringRef.current.y) * 0.12;
      setRingPos({ ...ringRef.current });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [cursorPos]);

  // Hover detection for interactive elements
  useEffect(() => {
    const addHover = () => setIsHovering(true);
    const removeHover = () => setIsHovering(false);
    const links = document.querySelectorAll("a, button, [data-hover]");
    links.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });
    return () => {
      links.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  });

  // Active section detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    // Trigger initial detection fallback if needed
    setTimeout(() => {
      if (!activeSection && window.scrollY < 100) {
        setActiveSection("hero");
      }
    }, 100);
    
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          left: cursorPos.x - 6,
          top: cursorPos.y - 6,
          transform: isHovering ? "scale(2.5)" : "scale(1)",
          transition: "transform 0.2s ease",
        }}
      />
      <div
        className="custom-cursor-ring"
        style={{
          left: ringPos.x - 18,
          top: ringPos.y - 18,
          width: isHovering ? 60 : 36,
          height: isHovering ? 60 : 36,
          opacity: isHovering ? 0.3 : 0.5,
        }}
      />

      {/* Top-left: Brand + location + clock */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 z-50 p-6 flex flex-col gap-0"
      >
        <span
          className="font-barlow font-black text-white tracking-widest text-sm uppercase"
          style={{ letterSpacing: "0.15em" }}
        >
          MARVIN
        </span>
      </motion.div>

      {/* Bottom-left: City + Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed bottom-0 left-0 z-50 p-6 flex flex-col gap-1"
      >
        <span className="font-barlow font-bold text-white text-xs tracking-widest uppercase">
          JAKARTA
        </span>
        <span className="font-barlow font-bold text-[#888] text-xs tracking-widest uppercase">
          {time}
        </span>
      </motion.div>

      {/* Top-right: Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="fixed top-0 right-0 z-50 p-6 flex flex-col gap-3 items-end"
      >
        {["HOME", "ABOUT", "WORKS", "SKILLS", "CONTACT"].map((item) => {
          const id = item === "HOME" ? "hero" : item.toLowerCase();
          const isActive = activeSection === id;
          return (
            <button
              key={item}
              onClick={() => scrollTo(id)}
              className={`font-barlow font-bold text-base tracking-widest uppercase transition-colors duration-300 ${
                isActive ? "text-[#e8481a]" : "text-white hover:text-[#e8481a]"
              }`}
            >
              {item}
            </button>
          );
        })}
      </motion.nav>

      {/* Right sidebar: Social icons */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed bottom-0 right-0 z-50 p-6 flex flex-col gap-5 items-center"
      >
        <a
          href="mailto:marvin@example.com"
          className="text-[#666] hover:text-[#e8481a] transition-colors duration-300"
          title="Email"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </a>
        <a
          href="tel:+6281234567890"
          className="text-[#666] hover:text-[#e8481a] transition-colors duration-300"
          title="Phone"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.9v2.02z"/>
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/marvin-nugraha"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#666] hover:text-[#e8481a] transition-colors duration-300"
          title="LinkedIn"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
      </motion.div>
    </>
  );
}
