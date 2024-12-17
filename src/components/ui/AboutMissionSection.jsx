"use client";
import React from "react";

export default function AboutMissionSection() {
  return (
    <div className="py-24 px-6 md:px-24 flex flex-col md:flex-row items-center md:items-start gap-16 md:gap-12 ">
      <div className="flex-1">
        <h2 className="text-3xl font-extrabold text-[#fe8f40]  leading-tight mb-4">
          About Us
        </h2>
        <p className="leading-7 text-lg">
          iWedGh is more than just a wedding planning platform; it&apos;s your personal wedding assistant. We help couples navigate the journey to their perfect day with tools for budget tracking, vendor management, and more. Whether you&apos;re planning a small, intimate ceremony or a grand celebration, we have the resources you need to make every step of your wedding planning process seamless and enjoyable.
        </p>
      </div>

      <div className="flex-1">
        <h2 className="text-3xl font-extrabold text-[#fe8f40]  leading-tight mb-4">
          Our Mission
        </h2>
        <p className="leading-7 text-lg">
          At iWedGh, our mission is to empower couples to plan their weddings with ease and confidence. We strive to simplify the wedding planning process by providing a comprehensive platform that brings together everything you need — from budgeting to finding trusted vendors. Our goal is to ensure that every couple has a stress-free journey towards the wedding of their dreams, so they can focus on what truly matters — celebrating love and creating unforgettable memories.
        </p>
      </div>
    </div>
  );
}
