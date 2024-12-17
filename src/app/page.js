"use client";
import React from "react";
import CarouselSection from "@/components/ui/CarouselSection";
import AboutMissionSection from "@/components/ui/AboutMissionSection";
import FAQSection from "@/components/ui/FAQSection";
import Hero from "@/components/ui/HeroSect";
import HeroSection from "@/components/ui/HeroSection";

export default function Home() {

  return (
    <main className="conatiner mx-auto ">
      
      <div className="relative py-16 px-8 md:px-16 text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 ">
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 max-w-screen-xl ">
    
    {/* Get Started Section */}
    <div className="text-center  md:text-left md:w-1/2">
      <HeroSection />
    </div>
    
    {/* Carousel Section */}
    <div className="md:w-1/2">
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
