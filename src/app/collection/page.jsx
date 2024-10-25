"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideFacebook, LucideTwitter, LucideInstagram, LucideGlobe, Trash2, PhoneCall, MessageSquare, PhoneCallIcon, LucideMessageSquare  } from "lucide-react"; // Import Lucide icons
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { Skeleton } from '@/components/ui/skeleton';

const CollectionPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoaded, user } = useUser();
  

  // Calculate category counts
  const categoryCounts = {};
  Object.keys(data).forEach(category => {
    categoryCounts[category] = data[category].length;
  });

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites/get');
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
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
    const confirmed = window.confirm("Are you sure you want to remove this vendor from your favorites?");
    if (!confirmed) return;

    try {
      const response = await fetch('/api/favorites/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    return (<div className="px-8 ml-14 mr-14 mx-auto py-4 flex bg-gray-200 h-full mt-5">
      {/* Table on the left */}
      <div className="flex-1 overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th colSpan={5} className="text-left text-lg p-4">
                <Skeleton className="h-6 w-32" />
              </th>
            </tr>
            <tr>
              <th className="px-4 py-2 border border-gray-300">
                <Skeleton className="h-5 w-16" />
              </th>
              <th className="px-4 py-2 border border-gray-300">
                <Skeleton className="h-5 w-16" />
              </th>
              <th className="px-4 py-2 border border-gray-300">
                <Skeleton className="h-5 w-32" />
              </th>
              <th className="px-4 py-2 border border-gray-300">
                <Skeleton className="h-5 w-48" />
              </th>
              <th className="px-4 py-2 border border-gray-300">
                <Skeleton className="h-5 w-24" />
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Simulate multiple rows */}
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border border-gray-300">
                  <Skeleton className="h-5 w-16" />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <Skeleton className="h-16 w-16 rounded-full" />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <Skeleton className="h-5 w-32" />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <Skeleton className="h-5 w-48" />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
  }

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div className="container mx-auto p-4">No favorites available.</div>;
  }

  

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Apparel':
        return 'bg-indigo-500'; // Indigo
      case 'Band':
        return 'bg-red-600'; // Dark Red
      case 'Fashion Designer':
        return 'bg-pink-500'; // Pink
      case 'Bar Services':
        return 'bg-yellow-400'; // Yellow
      case 'Beautician':
        return 'bg-teal-400'; // Teal
      case 'Cakes':
        return 'bg-amber-400'; // Amber
      case 'Catering':
        return 'bg-green-500'; // Green
      case 'Decor':
        return 'bg-purple-500'; // Purple
      case 'Florist':
        return 'bg-green-300'; // Light Green
      case 'Graphics':
        return 'bg-yellow-300'; // Light Yellow
      case 'Jeweler':
        return 'bg-orange-500'; // Orange
      case 'Lighting':
        return 'bg-sky-500'; // Sky Blue
      case 'Millinery':
        return 'bg-gray-500'; // Gray
      case 'MC':
        return 'bg-teal-600'; // Dark Teal
      case 'Rental':
        return 'bg-blue-600'; // Dark Blue
      case 'Soloist':
        return 'bg-red-500'; // Red
      case 'Ushers':
        return 'bg-blue-400'; // Light Blue
      case 'Venues':
        return 'bg-purple-600'; // Dark Purple
      case 'Photographer':
        return 'bg-pink-600'; // Dark Pink
      case 'Videographer':
        return 'bg-blue-800'; // Deep Blue
      case 'Wedding Planner':
        return 'bg-orange-600'; // Dark Orange
      default:
        return 'bg-gray-400'; // Default Gray
    }
  };

  return (
    <div className="px-8 mx-auto py-4 flex bg-white">
      {/* Table on the left */}
      <div className="flex-1 overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th colSpan={5} className='text-left text-lg p-4'>My Favorites</th>
            </tr>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Category</th>
              <th className="px-4 py-2 border border-gray-300">Logo</th>
              <th className="px-4 py-2 border border-gray-300">Business Name</th>
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && Object.keys(data).map((category) =>
              data[category].map((vendor, index) => (
                <tr key={vendor._id}>
                  {index === 0 && (
                    <td
                      className="px-4 py-2 border border-gray-300 font-bold"
                      rowSpan={data[category].length}
                    >
                      {category}
                    </td>
                  )}
                  <td className="px-4 py-2 border border-gray-300">
                    <Image
                      src={vendor.uploadLogo}
                      alt={`${vendor.businessName} logo`}
                      width={50}
                      height={50}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {vendor.businessName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {vendor.briefIntroduction.length > 70
                      ? `${vendor.briefIntroduction.substring(0, 70)}...`
                      : vendor.briefIntroduction}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 flex space-x-2">
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
                    <Link
                      href={`${vendor.socialMediaLinks.tiktok}`}
                      className="p-2 rounded-full font-bold text-sm"
                    >
                      TikTok
                    </Link>
                    <Button
                      variant="destructive"
                      className="flex items-center"
                      onClick={() => handleRemoveFavorite(vendor._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Legend on the right */}
      <div className="ml-6 flex-none">
        <h2 className="text-lg font-bold">Category Breakdown</h2>
        <ul className="flex flex-col gap-2 mt-4">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <li key={category} className="flex items-center">
              {/* Color box */}
              <span className={`w-4 h-4 rounded mr-2 ${getCategoryColor(category)}`}></span>
              <span>
                {category}: {count} {count === 1 ? "vendor" : "vendors"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CollectionPage;
