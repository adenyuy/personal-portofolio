"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import React, { useRef } from "react"

export default function HoloProfileCard() {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  // 3D Tilt bounds (-15 to 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  // Glare positions based on mouse
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = (mouseX / width) - 0.5
    const yPct = (mouseY / height) - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="w-full h-full relative overflow-hidden bg-[#141414] shadow-2xl transition-shadow duration-700 hover:shadow-[0_0_50px_rgba(232,72,26,0.5)] border border-white/5 rounded-none"
    >
      <div className="absolute inset-0 z-0 bg-[#141414]" />

      {/* Sci-Fi Scanning Line Animation (Baseline) */}
      <motion.div
        animate={{ y: ["-100%", "500%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-[#e8481a]/30 to-transparent z-20 pointer-events-none mix-blend-overlay"
      />

      {/* The Image */}
      <Image
        src="/assets/foto3.jpeg"
        alt="Marvin Raditya Nugraha"
        fill
        sizes="(max-width: 1024px) 100vw, 450px"
        className="object-cover object-top z-10 pointer-events-none scale-100 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
      />

      {/* Permanent warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#e8481a]/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

      {/* PSA 10 Holo Foil Overlay */}
      <motion.div
        style={{
          background: `
            radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%),
            linear-gradient(115deg, transparent 20%, rgba(232, 72, 26, 0.5) 30%, rgba(255, 255, 255, 0.6) 45%, rgba(232, 72, 26, 0.5) 60%, transparent 80%)
          `,
          backgroundSize: "200% 200%",
          backgroundPosition: useTransform(mouseXSpring, [-0.5, 0.5], ["100% 100%", "0% 0%"])
        }}
        className="absolute inset-0 z-20 pointer-events-none mix-blend-color-dodge opacity-0 hover:opacity-100 transition-opacity duration-500"
      />

      {/* Edge Reflection */}
      <motion.div
        style={{
          background: `linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)`,
          x: useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]),
        }}
        className="absolute inset-0 z-30 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
      />
    </motion.div>
  )
}
