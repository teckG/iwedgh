"use client"; // For client-side rendering in Next.js
import React, { useEffect, useState } from "react";

export function VendorSearch({ user, filteredVendors, setFilteredVendors }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const categories = [
    "Apparel", "Bands", "DJ", "Fashion Designers", "Bar Services", "Beautician", 
    "Cake", "Catering", "Decor", "Florist", "Graphics", "Jeweler", 
    "Lighting", "Millinery", "MC", "Rental", "Soloist", "Ushers", "Venues", 
    "Photographer", "Videographer", "Wedding Planner", "All Categories"
  ];

  // Filter suggestions based on input
  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
      setIsDropdownVisible(false);
    } else {
      const filteredSuggestions = categories.filter((category) =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setIsDropdownVisible(true);
    }
  }, [searchTerm]);

  const handleSelectCategory = (category) => {
    setSearchTerm(category);
    setIsDropdownVisible(false);
    // Filter vendors based on selected category
    const filtered = filteredVendors.filter(
      (vendor) => vendor.businessCategory === category
    );
    setFilteredVendors(filtered);
  };

  return (
    <div className="flex-1">
      {/* Top Banner */}
      <div className="p-3 bg-gray-200 pl-24 flex items-center">
        <h1 className="font-bold flex-grow">
          {user?.firstName ? "Welcome " + user.firstName : "Hello there"}
        </h1>

        <div className="flex items-center space-x-4 relative">
          <span>{filteredVendors.length} Vendors</span>

          {/* Search Bar with Suggestions */}
          <div className="relative">
            <input
              type="text"
              className="text-black p-2 rounded border border-[#c2c2c2] w-64"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsDropdownVisible(true)}
            />

            {/* Dropdown suggestions */}
            {isDropdownVisible && suggestions.length > 0 && (
              <ul className="absolute left-0 top-full w-full bg-white border border-[#c2c2c2] rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectCategory(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
