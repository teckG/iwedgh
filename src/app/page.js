"use client";
import React from "react";
import CarouselSection from "@/components/ui/CarouselSection";
import AboutMissionSection from "@/components/ui/AboutMissionSection";
import FAQSection from "@/components/ui/FAQSection";
import Hero from "@/components/ui/HeroSect";
import HeroSection from "@/components/ui/HeroSection";

export default function Home() {
  return (
    <main>
      <div className="relative  text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black opacity-60"></div>
  
  {/* Content Container */}
  <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-8 max-w-screen-xl mx-auto">
    
    {/* Get Started Section */}
    <div className="md:text-left w-full md:w-3/5">
      <HeroSection />
    </div>

    {/* Carousel Section */}
    <div className="w-full md:w-3/5 lg:w-4/5">
      <CarouselSection />
    </div>
  </div>
</div>

      <Hero />
      <AboutMissionSection />
      <FAQSection />
    </main>
  );
}
