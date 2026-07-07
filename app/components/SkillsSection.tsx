"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaPython, FaJsSquare, FaPhp, FaReact, FaLaravel, FaGithub, FaWordpress, FaFigma } from "react-icons/fa";
import { SiDart, SiTailwindcss, SiPostgresql, SiPrisma, SiFirebase, SiTensorflow, SiScikitlearn, SiOpencv, SiFlutter, SiMysql } from "react-icons/si";
import { TbSql } from "react-icons/tb";

const skills = [
  { 
    name: "PROGRAMMING\nLANGUAGES", 
    icons: [
      { name: "Python", icon: <FaPython key="py" />, color: "#3776AB" }, 
      { name: "JS / TS", icon: <FaJsSquare key="js" />, color: "#F7DF1E" }, 
      { name: "PHP", icon: <FaPhp key="php" />, color: "#777BB4" }, 
      { name: "Dart", icon: <SiDart key="dart" />, color: "#0175C2" }, 
      { name: "SQL", icon: <TbSql key="sql" />, color: "#336791" }
    ]
  },
  { 
    name: "MACHINE\nLEARNING", 
    icons: [
      { name: "TensorFlow", icon: <SiTensorflow key="tf" />, color: "#FF6F00" }, 
      { name: "Scikit-Learn", icon: <SiScikitlearn key="sk" />, color: "#F7931E" }, 
      { name: "OpenCV", icon: <SiOpencv key="cv" />, color: "#5C3EE8" }
    ]
  },
  { 
    name: "WEB & MOBILE\nFRAMEWORKS", 
    icons: [
      { name: "React / Next.js", icon: <FaReact key="react" />, color: "#61DAFB" }, 
      { name: "Laravel", icon: <FaLaravel key="laravel" />, color: "#FF2D20" }, 
      { name: "Flutter", icon: <SiFlutter key="flutter" />, color: "#02569B" }, 
      { name: "TailwindCSS", icon: <SiTailwindcss key="tw" />, color: "#06B6D4" }
    ]
  },
  { 
    name: "DATABASES &\nBACKEND", 
    icons: [
      { name: "MySQL", icon: <SiMysql key="mysql" />, color: "#4479A1" },
      { name: "PostgreSQL", icon: <SiPostgresql key="pg" />, color: "#336791" }, 
      { name: "Prisma", icon: <SiPrisma key="prisma" />, color: "#FFFFFF" }, 
      { name: "Firebase", icon: <SiFirebase key="fb" />, color: "#FFCA28" }
    ]
  },
  { 
    name: "TOOLS &\nPLATFORMS", 
    icons: [
      { name: "Figma", icon: <FaFigma key="figma" />, color: "#F24E1E" }, 
      { name: "WordPress", icon: <FaWordpress key="wp" />, color: "#21759B" }, 
      { name: "GitHub", icon: <FaGithub key="gh" />, color: "#FFFFFF" }
    ]
  },
];

function SkillRow({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-[#1a1a1a] cursor-pointer hover:border-[#e8481a]/30 transition-colors duration-300 gap-6 overflow-hidden"
    >
      <div className="flex items-start gap-6">
        <span className="font-barlow text-[#333] font-bold text-xs mt-2 tracking-widest w-8 flex-shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3
            className="font-barlow font-black text-white group-hover:text-[#e8481a] transition-colors duration-300 uppercase whitespace-pre-line leading-[0.9]"
            style={{ fontSize: "clamp(1.8rem, 5vw, 4.5rem)", lineHeight: 0.9 }}
          >
            {skill.name}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 ml-14 md:ml-0 w-full md:w-auto">
        {/* Icons */}
        <div className="flex items-center gap-6 md:gap-8 text-2xl md:text-3xl transition-colors duration-300">
          {skill.icons.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: 50, color: "#555555" }}
              animate={isInView ? { opacity: 1, x: 0, color: "#555555" } : { color: "#555555" }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: (index * 0.1) + 0.3 + (idx * 0.1) }}
              whileHover={{ scale: 1.3, rotate: [0, -10, 10, -10, 0], color: item.color }}
              className="cursor-pointer relative group/icon"
            >
              {item.icon}
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-[#333] !text-white text-[10px] font-barlow font-bold px-3 py-1.5 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg z-10">
                {item.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arrow indicator */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="w-10 h-10 border border-[#e8481a] rounded-full hidden md:flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8481a" strokeWidth="2">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="bg-[#0a0a0a] py-10 lg:py-16">
      {/* Standard Header */}
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
              SKILLS
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
            className="font-barlow font-bold text-[#555] text-xs tracking-widest uppercase hidden md:inline-block"
          >
            EXPERTISE
          </motion.span>
        </div>
      </div>

      <div className="px-6 lg:px-16">
        {/* Skills list */}
        <div className="border-t border-[#1a1a1a]">
          {skills.map((skill, i) => (
            <SkillRow key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
