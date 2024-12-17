"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LucideTwitter,
  LucideInstagram,
  Trash2,
  PhoneCall,
  LucideMessageSquare,
} from "lucide-react"; 
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const CollectionPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoaded, user } = useUser();

  // Calculate category counts
  const categoryCounts = {};
  Object.keys(data).forEach((category) => {
    categoryCounts[category] = data[category].length;
  });

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites/get");
        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const data = await response.json();
        setData(data.favorites);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (vendorId) => {
    const email = user.primaryEmailAddress.emailAddress;
    const confirmed = window.confirm(
      "Are you sure you want to remove this vendor from your favorites?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch("/api/favorites/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, vendorId }),
      });

      const dataResponse = await response.json();

      if (response.ok) {
        toast.success("Vendor removed from favorites!");
      } else {
        toast.error("Failed to remove vendor: " + dataResponse.message);
      }
    } catch (error) {
      toast.error("Error removing favorite: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          width={200}
        >
          <rect
            fill="#F5A47E"
            stroke="#F5A47E"
            strokeWidth="4"
            strokeLinejoin="round"
            width="30"
            height="30"
            x="85"
            y="85"
            rx="0"
            ry="0"
          >
            <animate
              attributeName="rx"
              calcMode="spline"
              dur="1.7"
              values="15;15;5;15;15"
              keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="ry"
              calcMode="spline"
              dur="1.7"
              values="15;15;10;15;15"
              keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="height"
              calcMode="spline"
              dur="1.7"
              values="30;30;1;30;30"
              keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="y"
              calcMode="spline"
              dur="1.7"
              values="40;170;40;"
              keySplines=".6 0 1 .4;0 .8 .2 1"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </svg>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div className="container mx-auto p-4">No favorites available.</div>;
  }
  const getLegendColor = (category) => {
    switch (category) {
      case "Apparel":
        return "bg-indigo-500"; // Indigo
      case "Band":
        return "bg-red-600"; // Dark Red
      case "Fashion Designer":
        return "bg-pink-500"; // Pink
      case "Bar Services":
        return "bg-yellow-400"; // Yellow
      case "Beautician":
        return "bg-teal-400"; // Teal
      case "Cakes":
        return "bg-amber-400"; // Amber
      case "Catering":
        return "bg-green-500"; // Green
      case "Decor":
        return "bg-purple-500"; // Purple
      case "Florist":
        return "bg-green-300"; // Light Green
      case "Graphics":
        return "bg-yellow-300"; // Light Yellow
      case "Jeweler":
        return "bg-orange-500"; // Orange
      case "Lighting":
        return "bg-sky-500"; // Sky Blue
      case "Millinery":
        return "bg-gray-500"; // Gray
      case "MC":
        return "bg-teal-600"; // Dark Teal
      case "Rental":
        return "bg-blue-600"; // Dark Blue
      case "Soloist":
        return "bg-red-500"; // Red
      case "Ushers":
        return "bg-blue-400"; // Light Blue
      case "Venues":
        return "bg-purple-600"; // Dark Purple
      case "Photographer":
        return "bg-pink-600"; // Dark Pink
      case "Videographer":
        return "bg-blue-800"; // Deep Blue
      case "Wedding Planner":
        return "bg-orange-600"; // Dark Orange
      default:
        return "bg-gray-400"; // Default Gray
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Apparel":
        return "border-indigo-500"; // Indigo
      case "Band":
        return "border-red-600"; // Dark Red
      case "Fashion Designer":
        return "border-pink-500"; // Pink
      case "Bar Services":
        return "border-yellow-400"; // Yellow
      case "Beautician":
        return "border-teal-400"; // Teal
      case "Cakes":
        return "border-amber-400"; // Amber
      case "Catering":
        return "border-green-500"; // Green
      case "Decor":
        return "border-purple-500"; // Purple
      case "Florist":
        return "border-green-300"; // Light Green
      case "Graphics":
        return "border-yellow-300"; // Light Yellow
      case "Jeweler":
        return "border-orange-500"; // Orange
      case "Lighting":
        return "border-sky-500"; // Sky Blue
      case "Millinery":
        return "border-gray-500"; // Gray
      case "MC":
        return "border-teal-600"; // Dark Teal
      case "Rental":
        return "border-blue-600"; // Dark Blue
      case "Soloist":
        return "border-red-500"; // Red
      case "Ushers":
        return "border-blue-400"; // Light Blue
      case "Venues":
        return "border-purple-600"; // Dark Purple
      case "Photographer":
        return "border-pink-600"; // Dark Pink
      case "Videographer":
        return "border-blue-800"; // Deep Blue
      case "Wedding Planner":
        return "border-orange-600"; // Dark Orange
      default:
        return "border-gray-400"; // Default Gray
    }
  };

  return (

    <main>
      <h1 className="text-2xl text-center text-white py-4 font-bold bg-gray-800">{Object.keys(data).length} Favorites Vendors </h1>
    <div className="px-8 mx-auto py-4 flex">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data &&
          Object.keys(data).map((category) =>
            data[category].map((vendor, index) => (
              <Card
                key={vendor._id}
                className={`border-b-4 ${getCategoryColor(category)}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={vendor.uploadLogo}
                        alt={`${vendor.businessName} logo`}
                        width={50}
                        height={50}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <CardTitle>{vendor.businessName}</CardTitle>
                    </div>
                    <div>
                      <Button
                        variant="destructive"
                        className="flex items-center justify-center w-8 h-8 p-2 rounded-full"
                        onClick={() => handleRemoveFavorite(vendor._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {vendor.briefIntroduction.length > 70
                      ? `${vendor.briefIntroduction.substring(0, 70)}...`
                      : vendor.briefIntroduction}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-2">
                    <Link
                      href={`tel:233${vendor.activePhoneNumber.slice(1)}`}
                      className="p-2"
                    >
                      <PhoneCall />
                    </Link>
                    <Link
                      href={`${vendor.socialMediaLinks.whatsapp}`}
                      className="p-2"
                    >
                      <LucideMessageSquare className="text-green-600" />
                    </Link>
                    <Link
                      href={`${vendor.socialMediaLinks.instagram}`}
                      className="p-2"
                    >
                      <LucideInstagram />
                    </Link>
                    <Link
                      href={`${vendor.socialMediaLinks.twitter}`}
                      className="p-2"
                    >
                      <LucideTwitter />
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
      </div>
    </div>
    {/* Legend for Category Breakdown */}
<div className="w-full lg:w-auto lg:ml-6 flex-none bg-slate-100 p-4 lg:px-6 lg:py-8 rounded-lg">
  <h2 className="text-lg font-bold text-center lg:text-left">Category Breakdown</h2>
  
  <ul className="flex flex-wrap lg:flex-col gap-4 mt-4 justify-center lg:justify-start">
    {Object.entries(categoryCounts).map(([category, count]) => (
      <li 
        key={category} 
        className="flex items-center gap-2 text-sm lg:text-base"
      >
        {/* Dynamic color indicator */}
        <span
          className={`w-4 h-4 rounded-full shrink-0 ${getLegendColor(category)}`}
        ></span>
        <span className="whitespace-nowrap">
          {category}: {count} {count === 1 ? "vendor" : "vendors"}
        </span>
      </li>
    ))}
  </ul>
</div>

  </main>
  );
};

export default CollectionPage;
