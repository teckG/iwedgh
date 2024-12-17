"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label"; // shadcn's label
import { Button } from "@/components/ui/button"; // shadcn's button
import { Input } from "@/components/ui/input"; // shadcn's input
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
      const selectedVendor = emails.find((vendor) => vendor.email === selectedEmail);
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
          const updatedVendor = emails.find(
            (vendor) => vendor.email === selectedEmail
          );
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
    requiredPermissions.every((permission) => membership.permissions.includes(permission))
  );

  if (!hasRequiredPermissions)
    return (
      <p className="text-center mt-10 text-red-500">
        Sorry, you don&apos;t have the required permissions to view this page.
      </p>
    );

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Upload Service Images</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white shadow-lg rounded-xl p-6 w-full lg:w-1/3 sticky top-0"
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
                className="mt-2 w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select an Account --</option>
                {emails.map((vendor, index) => (
                  <option key={index} value={vendor.email}>
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
              <Input type="file" name="uploadLogo" required accept="image/*" />
            </div>

            {/* Upload Service Images */}
            <div>
              <Label htmlFor="uploadImagesOfService" className="text-gray-700 font-semibold">
                Upload Service Images *
              </Label>
              <Input
                type="file"
                name="uploadImagesOfService"
                multiple
                required
                accept="image/*"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>

        {/* Image Gallery Section */}
        <div className="flex-1 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.length ? (
              images.map((img, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-md border border-gray-200"
                >
                  <Image
                    src={img}
                    alt={`Service Image ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-32"
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No images available for the selected account.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImages;