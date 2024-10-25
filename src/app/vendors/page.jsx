"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"; // Adjust the import path
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {  Delete, HeartIcon, HeartPulse } from "lucide-react";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isSignedIn } = useUser(); // Get the user's sign-in status


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 10; // Limit to 8 vendors per page

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
        (vendor) => vendor.businessCategory === selectedCategory
      );
      setFilteredVendors(filtered);
    }
  }, [selectedCategory, vendors]);


  const [filteredCategories, setFilteredCategories] = useState([]);
  const dropdownRef = useRef(null);


  // Filter categories based on the input
  useEffect(() => {
     // Full list of categories
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
    "Wedding Planner"
  ];

    if (selectedCategory) {
      setFilteredCategories(
        categories.filter((category) =>
          category.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    } else {
      setFilteredCategories(categories);
    }
  }, [selectedCategory]);

 

 // Handle click outside to close the dropdown
 useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  // Pagination Logic
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(
    indexOfFirstVendor,
    indexOfLastVendor
  );

  // Handle Page Change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredVendors.length / vendorsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Fetch favorites for the logged-in user
  useEffect(() => {
    if (user?.id) {
      const fetchFavorites = async () => {
        try {
          const res = await fetch(`/api/favorites/get`);
          const data = await res.json();
          // Check if favorites is an object before processing
          if (typeof data.favorites === "object" && data.favorites !== null) {
            const favoriteIds = Object.values(data.favorites)
              .flat()
              .map((fav) => fav._id);
            setFavorites(favoriteIds);
          } else {
            console.error("Favorites is not a valid object:", data.favorites);
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites();
    }
  }, [user?.id]);

  // Toggle favorite status of a vendor
  const toggleFavorite = async (vendorId) => {
    if (!user?.id) return; // Ensure the user is logged in

    try {
      // Check if the client already exists in the database
      const res = await fetch("/api/clients/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
        }),
      });

      const { exists } = await res.json();

      if (!exists) {
        // If the client doesn't exist, create a new client record
        await fetch("/api/clients/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.primaryEmailAddress.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
          }),
        });
      }

      // Add or remove vendor from favorites
      if (favorites.includes(vendorId)) {
        // Remove from favorites in the database
        await fetch("/api/favorites/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.primaryEmailAddress.emailAddress,
            vendorId,
          }),
        });

        // Update the state locally
        setFavorites(favorites.filter((id) => id !== vendorId));
      } else {
        // Add to favorites in the database
        await fetch("/api/favorites/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.primaryEmailAddress.emailAddress,
            vendorId,
          }),
        });

        // Update the state locally
        setFavorites([...favorites, vendorId]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1">


{/* New UI */}

<div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-between shadow-sm">
      {/* Welcome Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
        {user?.firstName ? `Welcome, ${user.firstName}` : "Hello there"}
      </h1>

      {/* Vendor Count & Category Dropdown */}
      <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 w-full md:w-auto">
        <span className="text-gray-600 text-lg">
          {filteredVendors.length} Vendors
        </span>

        {/* Search Bar with Dropdown */}
        <div className="relative w-full md:w-64" ref={dropdownRef}>
  <input
    type="text"
    placeholder="Search categories..."
    className="w-full text-gray-700 p-2 pl-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
    value={selectedCategory}
    onChange={(e) => {
      setSelectedCategory(e.target.value);
      setDropdownVisible(true);
    }}
    onFocus={() => setDropdownVisible(true)} // Show dropdown on focus
  />

  {/* Clear button 'x' */}
  {selectedCategory && (
    <button
      type="button"
      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
      onClick={() => setSelectedCategory("")}
    >
    <Delete />
    </button>
  )}

  {dropdownVisible && filteredCategories.length > 0 && (
    <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-20">
      <ul className="py-1">
        {filteredCategories.map((category) => (
          <li
            key={category}
            className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
            onClick={() => {
              setSelectedCategory(category);
              setDropdownVisible(false); // Close dropdown after selection
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
        <div className="px-20 h-screen">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-4">
              {currentVendors.length > 0 ? (
                currentVendors.map((vendor, index) => (
                  <div key={index} className="relative">
                    <div className="">
                      {/* Image Carousel Section */}
                      <div className="relative w-full">
                        <Carousel>
                          <CarouselContent>
                            {vendor.uploadImagesOfService?.map(
                              (link, index) => (
                                <CarouselItem
                                  key={index}
                                  className="shadow-md rounded-t-lg"
                                >
                                  <AspectRatio ratio={16 / 9}>
                                    <Image
                                      src={link}
                                      alt={vendor.businessName}
                                      width={400}
                                      height={225}
                                      className="object-cover w-full h-full rounded-t-lg"
                                    />
                                  </AspectRatio>
                                </CarouselItem>
                              )
                            )}
                          </CarouselContent>

                          {/* Next and Previous buttons */}
                            <CarouselPrevious className="absolute top-1/2 left-2 transform-translate-y-1/2  rounded-full p-2 shadow-md " />
                            <CarouselNext className="absolute top-1/2 right-2 transform-translate-y-1/2  rounded-full p-2 shadow-md"/>
                        </Carousel>

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

                      {/* Details Section */}
                      <CardContent className="p-4  rounded-b-lg bg-white">
                        <div className="flex items-center mb-4">
                          {vendor.uploadLogo ? (
                            <Link
                            href={`/vendors/${vendor._id}`}
                            className="hover:text-gray-400"
                          >
                            <Image
                              src={vendor.uploadLogo}
                              alt={vendor.businessName}
                              width={50}
                              height={50}
                              className="rounded-full object-cover w-12 h-12"
                            />
                            </Link>
                          ) : (
                            <div className="flex justify-center items-center w-12 h-12 bg-gray-300 rounded-full text-2xl font-bold text-white">
                             <Link
                            href={`/vendors/${vendor._id}`}
                            className="hover:text-gray-400 "
                          >{getInitials(vendor.businessName)} </Link> 
                            </div>
                          )}
                          <div className="ml-4">
                            <CardTitle>
                              <Link
                                href={`/vendors/${vendor._id}`}
                              >
                                {" "}
                                <span className="text-xl">{vendor.businessName}{" "}</span>
                              </Link>
                            </CardTitle>

                            <CardDescription>
                              {vendor.businessCategory} 📍 {vendor.city}
                            </CardDescription>
                          </div>
                        </div>
                        <p className="text-sm">
                          {vendor.briefIntroduction.length > 70
                            ? `${vendor.briefIntroduction.substring(0, 80)}...`
                            : vendor.briefIntroduction}
                        </p>
                      </CardContent>
                    </div>
                  </div>
                ))
              ) : (
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

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
}



