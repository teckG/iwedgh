"use client";
import React, { useState, useEffect } from "react";

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

  // Cycle through vendor types
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % vendorTypes.length);
    }, 6100); // Change every 6.1 seconds

    return () => clearInterval(interval);
  }, [vendorTypes.length]);

  // Update current vendor type
  useEffect(() => {
    setCurrentVendorType(vendorTypes[index]);
  }, [index, vendorTypes]);

  return (
    
    <div className="flex-1 p-10 text-center md:text-left">
    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Are you looking for
      </h1>
      <h2
        id="vendorType"
        className="text-4xl font-bold text-green-600 fade"
      >
        {currentVendorType}?
      </h2>
    </div>
    <p className="text-lg text-gray-700 mt-4 max-w-xl mx-auto md:mx-0">
      From Aisle to Altar - Discover Ghana&apos;s Best Wedding Vendors.
      <span className="block mt-2 text-gray-900">
        Explore a curated selection of trusted vendors to help you plan
        every detail of your big day effortlessly.
      </span>
    </p>
  </div>
  
  );
}
  