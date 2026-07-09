import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WorksSection from "./components/WorksSection";
import AboutSection from "./components/AboutSection";
import JourneySection from "./components/JourneySection";
import SkillsSection from "./components/SkillsSection";
import FooterSection from "./components/FooterSection";
import Preloader from "./components/Preloader";

export default function Home() {
  return (
    <main className="relative">
      <Preloader />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <WorksSection />
      <SkillsSection />
      <FooterSection />
    </main>
  );
}
