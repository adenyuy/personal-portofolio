"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function DownloadResumeButton() {
  const text = "GRAB FULL RESUME";
  return (
    <motion.a
      href="/assets/Marvin%20Raditya%20Nugraha_CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center bg-[#0a0a0a] border border-[#2a2a2a] hover:border-[#e8481a]/50 rounded-full overflow-hidden transition-all duration-500 cursor-pointer"
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#e8481a]/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
      
      {/* 3D Spinning Icon */}
      <div className="relative z-10 w-[60px] h-[60px] flex-shrink-0 bg-[#1a1a1a] group-hover:bg-[#e8481a] rounded-full flex items-center justify-center transition-colors duration-500" style={{ perspective: "1000px" }}>
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
          className="flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
          </svg>
        </motion.div>
      </div>

      {/* Creative Text */}
      <motion.div 
        variants={{
          initial: { width: 0, opacity: 0, paddingRight: 0, marginLeft: 0 },
          hover: { width: "auto", opacity: 1, paddingRight: "32px", marginLeft: "16px", transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
        }}
        className="relative z-10 flex flex-col items-start whitespace-nowrap overflow-hidden"
      >
        <motion.span 
          variants={{
            initial: { opacity: 0, x: -10 },
            hover: { opacity: 1, x: 0 }
          }}
          className="font-barlow font-bold text-[#888] text-[9px] tracking-[0.3em] uppercase group-hover:text-[#e8481a] transition-colors duration-300"
        >
          Curriculum Vitae
        </motion.span>
        <motion.div 
          variants={{
            initial: {},
            hover: { transition: { staggerChildren: 0.03 } }
          }}
          className="font-barlow font-black text-white text-sm tracking-[0.2em] uppercase flex"
        >
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={{
                initial: { opacity: 0, y: 10 },
                hover: { opacity: 1, y: 0 }
              }}
              style={{ whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

const tools = [
  { name: "Next.js", symbol: "N" },
  { name: "React", symbol: "⚛" },
  { name: "TypeScript", symbol: "TS" },
  { name: "Figma", symbol: "F" },
];

export default function FooterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer id="contact" className="bg-[#141414]">
      {/* CTA Section */}
      <div ref={ref} className="px-6 lg:px-16 pt-20 pb-12 text-center">
        {/* Huge CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-barlow font-black text-[#e8481a] uppercase leading-[0.88] mb-6"
            style={{ fontSize: "clamp(3rem, 12vw, 11rem)", lineHeight: 0.88 }}
          >
            LET&apos;S WORK
            <br />
            TOGETHER
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-barlow font-bold text-[#888] text-xs tracking-[0.3em] uppercase mb-10"
        >
          I AM CURRENTLY AVAILABLE AND ACTIVELY LOOKING FOR NEW OPPORTUNITIES
        </motion.p>

        {/* BIG CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-14 flex justify-center"
        >
          <DownloadResumeButton />
        </motion.div>

        {/* Contact links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {[
            { label: "LINKEDIN", href: "https://www.linkedin.com/in/marvinugraha" },
            { label: "EMAIL", href: "mailto:marvinugraha@gmail.com" },
            { label: "GITHUB", href: "https://github.com/adenyuy" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-2 font-barlow font-black text-[#888] text-xs tracking-[0.3em] uppercase hover:text-white transition-colors duration-300"
            >
              <span className="w-4 h-px bg-[#444] group-hover:bg-[#e8481a] transition-colors duration-300" />
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Divider */}
      <div className="mx-6 lg:mx-16 h-px bg-[#1a1a1a]" />

      {/* Bottom bar */}
      <div className="px-6 lg:px-16 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Made with */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <p className="font-barlow font-bold text-[#555] text-xs tracking-[0.2em] uppercase">
              MADE WITH LOVE USING
            </p>
            <div className="flex gap-3 items-center">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  title={tool.name}
                  className="w-8 h-8 bg-[#1a1a1a] rounded flex items-center justify-center font-barlow font-black text-[#666] text-xs hover:bg-[#e8481a]/10 hover:text-[#e8481a] transition-colors duration-300 cursor-default"
                >
                  {tool.symbol}
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <p className="font-barlow font-bold text-[#333] text-xs tracking-widest uppercase text-center">
            © 2025 MARVIN NUGRAHA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
