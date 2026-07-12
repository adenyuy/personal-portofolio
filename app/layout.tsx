import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marvin Nugraha | Portfolio",
  description:
    "Full-stack developer & UI/UX designer building digital experiences that are intuitive, modern, and easy to connect with.",
  keywords: ["portfolio", "developer", "UI/UX", "frontend", "React", "Next.js"],
  authors: [{ name: "Marvin Nugraha" }],
  openGraph: {
    title: "Marvin Nugraha | Portfolio",
    description: "Building digital experiences that catch your eye.",
    type: "website",
  },
};

import BackgroundEffects from "./components/BackgroundEffects";
import { SmoothCursor } from "./components/magicui/smooth-cursor";
import SmoothScrolling from "./components/SmoothScrolling";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable}`}
    >
      <body className="min-h-screen bg-transparent text-white antialiased selection:bg-[#e8481a] selection:text-white scrollbar-thin scrollbar-thumb-[#e8481a] scrollbar-track-transparent">
        <SmoothScrolling>
          <BackgroundEffects />
          <SmoothCursor />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
