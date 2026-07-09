"use client";

import { motion, useInView, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ScrollVelocityContainer, ScrollVelocityRow } from "./magicui/scroll-based-velocity";

const projects = [
  {
    number: "01",
    total: "04",
    name: "PRISM\nSCHEDULING",
    category: "DATA SCIENCE & WEB",
    description: "Intelligent system predicting optimal maintenance schedules and minimizing unexpected asset downtime using Machine Learning and React.",
    href: "https://github.com/adenyuy",
    media: "/assets/output3.mp4",
  },
  {
    number: "02",
    total: "04",
    name: "DELISA\nAPP",
    category: "SOFTWARE PROJECT",
    description: "An innovative software solution and development project tailored for specific use-cases.",
    href: "https://github.com/adenyuy/delisa",
    gallery: [
      "/assets/delisa/TC-LOG-001-01.png",
      "/assets/delisa/TC-DASH-001-02.png",
      "/assets/delisa/TC-MST-001-01.png",
      "/assets/delisa/TC-HOSP-001.png",
      "/assets/delisa/TC-SCR-001-01.png"
    ]
  },
  {
    number: "03",
    total: "04",
    name: "CENPI\nPAYMENT",
    category: "FULL-STACK (WEB APP)",
    description: "Canteen Digitalization App with Midtrans payment integration, WebSockets, and an interactive analytics dashboard.",
    href: "https://github.com/adenyuy/CenPI",
    gallery: [
      "/assets/cenpi/dashboard.png",
      "/assets/cenpi/checkout.png",
      "/assets/cenpi/myorder.png",
      "/assets/cenpi/management-order-1.png",
      "/assets/cenpi/dashboard-tenant.png"
    ]
  },
  {
    number: "04",
    total: "04",
    name: "CLASSROOM\nMONITORING",
    category: "COMPUTER VISION (AI)",
    description: "Computer vision-based monitoring system using YOLO and CNNs to automatically track and classify student behaviors during examinations.",
    href: "https://github.com/adenyuy/cheating-detection-cnn",
    gallery: [
      "/assets/clasroom/login.png",
      "/assets/clasroom/home.png",
      "/assets/clasroom/monitor.png",
      "/assets/clasroom/monitor1-1.png",
      "/assets/clasroom/result.png"
    ]
  }
];

// Removed GalleryImage in favor of ScrollVelocity
function ProjectImageBlock({
  project,
  index,
  onInView,
}: {
  project: (typeof projects)[0];
  index: number;
  onInView: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Trigger when the element crosses the middle of the screen
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  const previewColors = [
    "from-slate-700 to-slate-900",
    "from-zinc-700 to-zinc-900",
    "from-neutral-700 to-neutral-900",
    "from-stone-700 to-stone-900",
  ];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"]
  });

  return (
    <div
      ref={ref}
      className="h-[70vh] lg:h-screen w-full relative"
    >
      <div className="h-full w-full flex items-center justify-center p-6 lg:p-12 lg:pl-0">
        <div style={{ perspective: "1500px" }} className="relative group w-full aspect-[4/3] lg:aspect-video">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateY: (project as any).media ? -30 : 0, z: -100 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: (project as any).media ? -15 : 0, z: 0 }}
            whileHover={{ scale: 1.02, rotateY: (project as any).media ? -5 : 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
          {(project as any).gallery ? (
            <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center bg-[#111]">
              <ScrollVelocityContainer className="w-full">
                <ScrollVelocityRow baseVelocity={5} direction={1} className="py-2">
                  {(project as any).gallery.map((img: string, idx: number) => (
                    <img
                      key={`top-${idx}`}
                      src={img}
                      alt={`Gallery ${idx}`}
                      loading="lazy"
                      className="mx-2 lg:mx-4 inline-block h-32 lg:h-56 w-auto rounded-lg object-contain shadow-sm border border-white/5 bg-[#0f0f0f]"
                    />
                  ))}
                </ScrollVelocityRow>
                <ScrollVelocityRow baseVelocity={5} direction={-1} className="py-2">
                  {(project as any).gallery.map((img: string, idx: number) => (
                    <img
                      key={`bottom-${idx}`}
                      src={img}
                      alt={`Gallery ${idx}`}
                      loading="lazy"
                      className="mx-2 lg:mx-4 inline-block h-32 lg:h-56 w-auto rounded-lg object-contain shadow-sm border border-white/5 bg-[#0f0f0f]"
                    />
                  ))}
                </ScrollVelocityRow>
              </ScrollVelocityContainer>
              <div className="from-[#111] pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r z-10" />
              <div className="from-[#111] pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l z-10" />
            </div>
          ) : (project as any).media ? (
            <video
              src={(project as any).media}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${previewColors[index % previewColors.length]} flex items-center justify-center p-4 lg:p-8`}>
              {/* Browser chrome mockup */}
              <div className="w-full h-full bg-[#0f0f0f] rounded-lg overflow-hidden border border-white/10 shadow-2xl flex flex-col group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
                {/* Browser header */}
                <div className="h-8 bg-[#1a1a1a] flex items-center px-3 gap-2 border-b border-white/5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <div className="flex-1 mx-4 h-5 bg-[#0f0f0f] rounded flex items-center justify-center">
                    <span className="text-[9px] text-[#555] font-inter">
                      {project.name.replace("\n", "-").toLowerCase()}.vercel.app
                    </span>
                  </div>
                </div>
                {/* Browser content placeholder */}
                <div className="flex-1 bg-[#111] relative overflow-hidden flex flex-col p-6 gap-4">
                  <div className="h-8 w-3/4 bg-[#e8481a]/20 rounded-md" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/5 rounded" />
                    <div className="h-3 w-5/6 bg-white/5 rounded" />
                    <div className="h-3 w-4/6 bg-white/5 rounded" />
                  </div>
                  <div className="mt-4 flex-1 w-full bg-white/5 rounded-md" />
                </div>
              </div>
            </div>
          )}

          {/* External link button */}
          <a
            href={project.href}
            className="absolute top-6 right-6 w-12 h-12 bg-[#222] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#e8481a] hover:scale-110 shadow-xl"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </motion.div>
      </div>
      </div>
    </div>
  );
}

export default function WorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  return (
    <section id="works" className="relative bg-[#0a0a0a]">
      <div className="flex flex-col lg:flex-row">

        {/* Left Side: Sticky Text Content */}
        <div className="w-full lg:w-5/12 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center px-6 lg:px-16 pt-20 pb-6 lg:py-0 z-20 sticky top-0 bg-[#0a0a0a]/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b border-white/5 lg:border-none">

          <div className="mb-10 lg:mb-16">
            <p className="font-barlow font-bold text-white text-sm tracking-[0.3em] uppercase mb-2">
              SELECTED
            </p>
            <h2
              className="font-barlow font-black text-transparent uppercase text-6xl lg:text-[8rem] leading-none"
              style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)" }}
            >
              PROJECT
            </h2>
          </div>

          <div className="relative h-64 lg:h-[22rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col"
              >
                <p className="font-barlow text-[#666] font-bold text-sm tracking-widest mb-4 flex items-center gap-4">
                  <span className="text-[#e8481a]">{activeProject.number}</span>
                  <span className="w-8 h-px bg-[#333]" />
                  <span>{activeProject.total}</span>
                </p>

                <h3 className="font-barlow font-black text-white uppercase leading-[0.9] mb-4 text-4xl lg:text-6xl whitespace-pre-line tracking-tight">
                  {activeProject.name}
                </h3>

                <p className="font-barlow font-bold text-[#e8481a] text-xs tracking-widest uppercase mb-6">
                  {activeProject.category}
                </p>

                <p className="font-inter text-[#888] text-base leading-relaxed max-w-md">
                  {activeProject.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Scrollable Images */}
        <div className="w-full lg:w-7/12 relative bg-[#0f0f0f] lg:bg-transparent">
          {projects.map((project, i) => (
            <ProjectImageBlock
              key={project.number}
              project={project}
              index={i}
              onInView={setActiveIndex}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
