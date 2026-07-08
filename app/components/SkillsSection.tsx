"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaPython, FaJsSquare, FaPhp, FaReact, FaLaravel, FaGithub, FaWordpress, FaFigma } from "react-icons/fa";
import { SiDart, SiTailwindcss, SiPostgresql, SiPrisma, SiFirebase, SiTensorflow, SiScikitlearn, SiOpencv, SiFlutter, SiMysql } from "react-icons/si";
import { TbSql } from "react-icons/tb";

const skills = [
  { 
    name: "PROGRAMMING\nLANGUAGES", 
    span: "md:col-span-2 lg:col-span-2 lg:row-span-2",
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
    span: "md:col-span-1 lg:col-span-1 lg:row-span-1",
    icons: [
      { name: "TensorFlow", icon: <SiTensorflow key="tf" />, color: "#FF6F00" }, 
      { name: "Scikit-Learn", icon: <SiScikitlearn key="sk" />, color: "#F7931E" }, 
      { name: "OpenCV", icon: <SiOpencv key="cv" />, color: "#5C3EE8" }
    ]
  },
  { 
    name: "DATABASES &\nBACKEND", 
    span: "md:col-span-1 lg:col-span-1 lg:row-span-1",
    icons: [
      { name: "MySQL", icon: <SiMysql key="mysql" />, color: "#4479A1" },
      { name: "PostgreSQL", icon: <SiPostgresql key="pg" />, color: "#336791" }, 
      { name: "Prisma", icon: <SiPrisma key="prisma" />, color: "#FFFFFF" }, 
      { name: "Firebase", icon: <SiFirebase key="fb" />, color: "#FFCA28" }
    ]
  },
  { 
    name: "WEB & MOBILE\nFRAMEWORKS", 
    span: "md:col-span-2 lg:col-span-2 lg:row-span-1",
    icons: [
      { name: "React / Next.js", icon: <FaReact key="react" />, color: "#61DAFB" }, 
      { name: "Laravel", icon: <FaLaravel key="laravel" />, color: "#FF2D20" }, 
      { name: "Flutter", icon: <SiFlutter key="flutter" />, color: "#02569B" }, 
      { name: "TailwindCSS", icon: <SiTailwindcss key="tw" />, color: "#e8481a" }
    ]
  },
  { 
    name: "TOOLS &\nPLATFORMS", 
    span: "md:col-span-1 lg:col-span-1 lg:row-span-1",
    icons: [
      { name: "Figma", icon: <FaFigma key="figma" />, color: "#F24E1E" }, 
      { name: "WordPress", icon: <FaWordpress key="wp" />, color: "#21759B" }, 
      { name: "GitHub", icon: <FaGithub key="gh" />, color: "#FFFFFF" }
    ]
  },
];

function BentoCard({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10%" }}
      className={`group relative flex flex-col justify-between bg-[#111]/40 backdrop-blur-xl rounded-[2rem] border border-white/5 hover:border-[#e8481a]/50 p-6 md:p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(232,72,26,0.15)] ${skill.span}`}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8481a]/0 to-[#e8481a]/0 group-hover:from-[#e8481a]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

      {/* Top Section: Icons */}
      <div className="flex flex-wrap gap-4 md:gap-6 z-10">
        {skill.icons.map((item, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.1 + idx * 0.1 }}
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0], color: item.color }}
            className="relative group/icon cursor-pointer text-4xl md:text-5xl text-[#555] transition-colors duration-300"
          >
            {item.icon}
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-[#333] !text-white text-xs font-barlow font-bold px-3 py-1.5 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl z-20">
              {item.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section: Title */}
      <div className="mt-12 z-10">
        <span className="font-barlow text-[#555] font-bold text-xs tracking-[0.2em] mb-2 block">
          0{index + 1}
        </span>
        <h3 className="font-barlow font-black text-white group-hover:text-[#e8481a] transition-colors duration-300 uppercase whitespace-pre-line text-3xl md:text-5xl leading-[0.9] tracking-tight">
          {skill.name}
        </h3>
      </div>
      
      {/* Decorative large icon in background */}
      <div className="absolute -bottom-10 -right-10 text-[15rem] opacity-5 group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-700 pointer-events-none text-white">
        {skill.icons[0].icon}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="relative bg-[#0a0a0a] py-16 lg:py-32">
      {/* Standard Header */}
      <div ref={ref} className="px-6 lg:px-16 mb-16">
        <div className="flex items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-barlow text-[#555] font-bold text-sm tracking-[0.3em] uppercase mb-2">
              THE
            </p>
            <h2
              className="font-barlow font-black text-transparent uppercase text-6xl lg:text-[8rem] leading-none"
              style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)" }}
            >
              SKILLS
            </h2>
          </motion.div>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 h-px bg-[#2a2a2a] origin-left hidden md:block"
          />

          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-barlow font-bold text-[#555] text-xs tracking-widest uppercase hidden md:block"
          >
            EXPERTISE
          </motion.span>
        </div>
      </div>

      {/* Bento Box Grid */}
      <div className="px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6">
          {skills.map((skill, i) => (
            <BentoCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
