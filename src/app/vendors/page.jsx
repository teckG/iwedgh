"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Delete, HeartIcon, HeartPulse } from "lucide-react";




export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useUser();
  const { isSignedIn } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 8;

  // Fetch vendors
  useEffect(() => {
    const getVendors = async () => {
      try {
        const res = await fetch("/api/vendors");
        const data = await res.json();
        setVendors(data);
        setFilteredVendors(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    getVendors();
  }, []);

  // Filter based on category
  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredVendors(vendors);
    } else {
      const filtered = vendors.filter(
        (vendor) =>
          vendor.businessCategory.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
      setFilteredVendors(filtered);
    }
  }, [selectedCategory, vendors]);

  // Dropdown categories
  const categories = [
    "Apparel",
    "Band",
    "DJ",
    "Fashion Designer",
    "Bar Services",
    "Beautician",
    "Cakes",
    "Catering",
    "Decor",
    "Florist",
    "Graphics",
    "Jeweler",
    "Lighting",
    "Millinery",
    "MC",
    "Rental",
    "Soloist",
    "Ushers",
    "Venues",
    "Photographer",
    "Videographer",
    "Wedding Planner",
  ];

  const filteredCategories = selectedCategory
    ? categories.filter((category) =>
        category.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    : categories;

  // Handle outside click for dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Pagination Logic
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(
    indexOfFirstVendor,
    indexOfLastVendor
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredVendors.length / vendorsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Fetch favorites for the logged-in user
  useEffect(() => {
    if (user?.id) {
      const fetchFavorites = async () => {
        try {
          const res = await fetch(`/api/favorites/get`);
          const data = await res.json();
          const favoriteIds = Object.values(data.favorites || {})
            .flat()
            .map((fav) => fav._id);
          setFavorites(favoriteIds);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites();
    }
  }, [user?.id]);

  const toggleFavorite = async (vendorId) => {
    if (!user?.id) return;
    try {
      if (favorites.includes(vendorId)) {
        await fetch("/api/favorites/remove", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.primaryEmailAddress.emailAddress,
            vendorId,
          }),
        });
        setFavorites(favorites.filter((id) => id !== vendorId));
      } else {
        await fetch("/api/favorites/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.primaryEmailAddress.emailAddress,
            vendorId,
          }),
        });
        setFavorites([...favorites, vendorId]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("");

  return (
    <div className="flex ">
      <div className="flex-1 ">
        {/* bg-gradient-to-r from-green-500 via-blue-600 to-purple-700 */}
        <div className=" w-full bg-gray-800 text-white shadow-lg p-6 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 z-50">
        {/* Welcome Message */}
          <h1 className="text-2xl font-bold">
            {user?.firstName ? `Welcome, ${user.firstName}` : "Hello there"}
          </h1>

          {/* Vendor Count & Category Dropdown */}
          <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
            <span className="text-lg font-medium">
              {filteredVendors.length} Vendors
            </span>

            {/* Search Bar with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <input
                type="text"
                placeholder="Search categories..."
                className="p-3 rounded-lg border-none text-gray-900 bg-white placeholder-gray-500 shadow-sm focus:ring-4 focus:ring-blue-300 focus:outline-none "
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setDropdownVisible(true);
                }}
                onFocus={() => setDropdownVisible(true)}
              />

              {/* Clear button 'x' */}
              {selectedCategory && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setSelectedCategory("")}
                >
                  <Delete />
                </button>
              )}

              {dropdownVisible && filteredCategories.length > 0 && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-20">
                  <ul className="py-2">
                    {filteredCategories.map((category) => (
                      <li
                        key={category}
                        className="hover:bg-gray-200 px-4 py-2 cursor-pointer text-gray-700"
                        onClick={() => {
                          setSelectedCategory(category);
                          setDropdownVisible(false);
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-20 lg:p-10">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="shadow-lg bg-gray-200">
                    <CardHeader className="flex flex-col items-center p-4">
                      <div className="w-24 h-24 bg-gray-300 mb-4"></div>
                      <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="w-24 h-4 bg-gray-300 rounded"></div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="w-full h-12 bg-gray-300 rounded"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  {currentVendors.length > 0 ? (
    currentVendors.map((vendor, index) => (
      <div
        key={index}
        className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        {/* Image Carousel Section */}
        <div className="relative">
          <Carousel>
            <CarouselContent>
              {vendor.uploadImagesOfService?.map((link, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={link}
                      alt={vendor.businessName}
                      width={400}
                      height={225}
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Next and Previous Buttons */}
            <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200" />
            <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200" />
          </Carousel>

          {/* Favorite Button */}
          {isSignedIn && (
            <button
              onClick={() => toggleFavorite(vendor._id)}
              className={`absolute top-4 right-4 p-2 rounded-full text-white transition-colors duration-200 ${
                favorites.includes(vendor._id)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              {favorites.includes(vendor._id) ? (
                <HeartPulse className="w-6 h-6" />
              ) : (
                <HeartIcon className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        {/* Business Details Section */}
        <div className="p-4 flex items-center gap-4">
          {/* Business Logo */}
          {vendor.uploadLogo ? (
            <Image
              src={vendor.uploadLogo}
              alt={vendor.businessName}
              width={50}
              height={50}
              className="w-14 h-14 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="flex justify-center items-center w-14 h-14 bg-gray-300 rounded-full text-lg font-bold text-gray-700">
              {getInitials(vendor.businessName)}
            </div>
          )}

          {/* Business Name and Address */}
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              <Link href={`/vendors/${vendor._id}`} className="hover:underline">
                {vendor.businessName}
              </Link>
            </h3>
            <p className="text-sm text-gray-500">
              📍 {vendor.city}, {vendor.businessCategory}
            </p>
          </div>
        </div>
      </div>
    ))
  )  : (
                <p>No vendors found</p>
              )}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={prevPage}
              className={`px-4 py-2 bg-[#fe8f40] text-white rounded-lg mr-4 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="bg-[#fe8f40] p-2 px-5 rounded-sm font-bold text-white">
              Page {currentPage} of{" "}
              {Math.ceil(filteredVendors.length / vendorsPerPage)}
            </span>
            <button
              onClick={nextPage}
              className={`px-4 py-2 bg-[#fe8f40] text-white rounded-lg ml-4 ${
                currentPage ===
                Math.ceil(filteredVendors.length / vendorsPerPage)
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={
                currentPage ===
                Math.ceil(filteredVendors.length / vendorsPerPage)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
