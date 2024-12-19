"use client";
import React from "react";
import Image from "next/image"; 

export default function AboutMissionSection() {
  return (
    <div className="py-24 px-6 md:px-24 flex flex-col md:flex-row items-center md:items-start gap-16 md:gap-24 bg-gradient-to-r from-[#ffe4b5] to-[#fdf2e9]">
      {/* Left Section: About Us */}
      
      <div className="flex-1 space-y-6 md:space-y-8 max-w-xl">
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
          <Image
            src="/admin.png" 
            alt="Our Mission"
            width={800} 
                height={600} 
                className="absolute inset-0 object-cover"
          />
        </div>
        <h2 className="text-4xl font-extrabold text-[#fe8f40] leading-tight mb-4">
          About Us
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed">
          iWedGh is more than just a wedding planning platform; it&apos;s your personal wedding assistant. We help couples navigate the journey to their perfect day with tools for budget tracking, vendor management, and more. Whether you&apos;re planning a small, intimate ceremony or a grand celebration, we have the resources you need to make every step of your wedding planning process seamless and enjoyable.
        </p>
        
      </div>

      {/* Right Section: Mission with Image */}
      <div className="flex-1 space-y-6 md:space-y-8 max-w-xl text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-[#fe8f40] leading-tight mb-4">
          Our Mission
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed">
          At iWedGh, our mission is to empower couples to plan their weddings with ease and confidence. We strive to simplify the wedding planning process by providing a comprehensive platform that brings together everything you need — from budgeting to finding trusted vendors. Our goal is to ensure that every couple has a stress-free journey towards the wedding of their dreams, so they can focus on what truly matters — celebrating love and creating unforgettable memories.
        </p>
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
          <Image
            src="/flyer.jpg" 
            alt="Our Mission"
            width={800} 
                height={600} 
                className="absolute inset-0 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
