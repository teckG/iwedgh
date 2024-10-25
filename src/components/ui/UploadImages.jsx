"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label"; // shadcn's label
import { Button } from "@/components/ui/button"; // shadcn's button
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

const UploadImages = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await fetch("/api/vendors");
        const vendors = await response.json();
        setEmails(vendors);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    }

    fetchVendors();
  }, []);

  useEffect(() => {
    if (selectedEmail) {
      const selectedVendor = emails.find(vendor => vendor.email === selectedEmail);
      if (selectedVendor) {
        setImages(selectedVendor.uploadImagesOfService || []);
      }
    }
  }, [selectedEmail, emails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        if (selectedEmail) {
          const updatedVendor = emails.find(vendor => vendor.email === selectedEmail);
          if (updatedVendor) {
            setImages(updatedVendor.uploadImagesOfService || []);
          }
        }
      } else {
        toast.error(result.message);
      }

      event.target.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
  };

  const { user } = useUser();
  const memberships = user?.organizationMemberships || [];
  const requiredPermissions = [
    "org:sys_profile:manage",
    "org:sys_profile:delete",
    "org:sys_memberships:read",
    "org:sys_memberships:manage",
    "org:sys_domains:read",
    "org:sys_domains:manage",
  ];

  const hasRequiredPermissions = memberships.some((membership) =>
    requiredPermissions.every(permission => membership.permissions.includes(permission))
  );

  if (!hasRequiredPermissions) return <p>Sorry, you don&apos;t have the required permissions to view this page.</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form section */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/3 sticky top-0"
      >
        <div className="space-y-6">
          {/* Email Dropdown */}
          <div>
            <Label htmlFor="account" className="text-gray-700 font-semibold">
              Select Account
            </Label>
            <select
              name="email"
              onChange={handleEmailChange}
              required
              className="mt-2 w-full p-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {emails.map((vendor, index) => (
                <option key={index} value={vendor.email} className="text-gray-700">
                  {vendor.businessName}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Logo */}
          <div>
            <Label htmlFor="uploadLogo" className="text-gray-700 font-semibold">
              Upload Logo *
            </Label>
            <input
              type="file"
              name="uploadLogo"
              accept="image/*"
              required
              className="mt-2 w-full p-2 border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Upload Service Images */}
          <div>
            <Label htmlFor="uploadImagesOfService" className="text-gray-700 font-semibold">
              Upload Service Images *
            </Label>
            <input
              type="file"
              name="uploadImagesOfService"
              accept="image/*"
              multiple
              required
              className="mt-2 w-full p-2 border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Submit
          </Button>
        </div>
      </form>

      {/* Image Gallery */}
      <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length ? (
            images.map((img, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg border border-gray-200">
                <Image
                  src={img}
                  alt={`Image ${index + 1}`}
                  layout="responsive"
                  height={200}
                  width={200}
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No images available for the selected account.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImages;
