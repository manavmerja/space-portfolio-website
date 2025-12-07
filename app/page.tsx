import HeroSection from "@/components/ui/hero-section";
import Navbar from "@/components/ui/navbar";
import FloatingAssistant from "@/components/ui/floating-assistant";
import AboutSection from "@/components/ui/about-section";
import TechStack from "@/components/ui/tech-stack";
import ProjectsSection from "@/components/ui/projects-section";
import CodingStats from "@/components/ui/coding-stats"; 
import JourneySection from "@/components/ui/journey-section";
import FooterSection from "@/components/ui/footer-section";
import Preloader from "@/components/ui/preloader";


export default function Home() {
  return (
    <main className="bg-black min-h-screen w-full relative">
      
      {/* ✅ Preloader ko sabse upar rakha */}
      <Preloader />

      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStack />
      <ProjectsSection />
      <CodingStats /> 
      <JourneySection />
       <FloatingAssistant />  
      <FooterSection />  
       
    </main>
  );
}