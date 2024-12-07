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
    
    <div className="flex-1 hero-text text-center md:text-left p-10">
      <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-800">
        Are you looking for{" "}
        <span id="vendorType" className="fade text-green-800">
          {currentVendorType}?
        </span>
      </h1>
      
      <p className="text-lg mb-6 text-gray-600 max-w-2xl">
        From Aisle to Altar - Discover Ghana&apos;s Best Wedding Vendors.
        <span className="block text-gray-800 mt-2 w-4/6">
          Explore a diverse range of trusted wedding vendors to help
          you plan every detail of your big day seamlessly.
        </span>
      </p>
    </div>
  );
}
  