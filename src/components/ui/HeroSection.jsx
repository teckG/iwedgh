"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link to handle navigation

export default function HeroSection() {
  const vendorTypes = [
    "a photographer",
    "a videographer",
    "a caterer",
    "a florist",
    "a DJ",
    "a planner",
    "a vendor",
    "an MC",
    "an usher",
  ];

  const [currentVendorType, setCurrentVendorType] = useState(vendorTypes[0]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true); // State to control fade effect

  // Cycle through vendor types
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % vendorTypes.length); // Update index
        setFade(true); // Start fade-in
      }, 500); // Fade-out duration
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [vendorTypes.length]);

  // Update current vendor type
  useEffect(() => {
    setCurrentVendorType(vendorTypes[index]);
  }, [index, vendorTypes]);

  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left p-10">
      
      <div className="flex flex-col items-center md:items-start gap-3">
        <h1 className="text-2xl md:text-3xl font-extrabold leading-tight ">
          Are you looking for
        </h1>
        <h2
          id="vendorType"
          className={`text-2xl md:text-3xl font-extrabold text-[#fe8f40] transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {currentVendorType}?
        </h2>
      </div>
      <p className="text-base md:text-lg mt-6 max-w-2xl">
        From Aisle to Altar - Discover Ghana&apos;s Best Wedding Vendors.
        <span className="block mt-4 font-medium">
          Explore a curated selection of trusted vendors to help you plan every detail of your big day effortlessly.
        </span>
      </p>
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
  {/* Register Button */}
  <Link
    href="https://forms.gle/Q5MNwfZbwDNQUQBX6"
    target="_blank"
    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#fe8f40] to-[#ff9e66] text-white text-lg font-bold rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-1000 ease-in-out transform animate-bounce"
  >
    Register
  </Link>

  {/* Visit Vendors Page Button */}
  <Link
    href="/vendors"
    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#fe8f40] to-[#ff9e66] text-white text-lg font-bold rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-1000 ease-in-out transform animate-bounce"
  >
    Visit Vendors Page
  </Link>
</div>

    </div>
  );
}
