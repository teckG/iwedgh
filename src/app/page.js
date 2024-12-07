"use client";
import React from "react";
import CarouselSection from "@/components/ui/CarouselSection";
import AboutMissionSection from "@/components/ui/AboutMissionSection";
import FAQSection from "@/components/ui/FAQSection";
import CTA from "@/components/ui/CallToAction";
import Hero from "@/components/ui/HeroSect";
import GetStarted from "@/components/ui/GetStarted";

export default function Home() {

  return (
    <main className="conatiner mx-auto ">
      
      <div className="flex flex-col md:flex-row items-center justify-center  px-16 pt-9 ">
        <GetStarted />     
        <CarouselSection />
      </div>
      <Hero />
      {/* <hr />
      <CTA /> */}
      <hr />
      <AboutMissionSection />
      <hr />

      <FAQSection />
    </main>
  );
}
