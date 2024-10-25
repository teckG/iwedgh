"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "@/components/ui/button";

const EditVendorPage = ({ params }) => {
  const { id } = params; // Get vendor ID from route params
  const [vendor, setVendor] = useState(null);
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    website: "",
    businessCategory: "",
    city: "",
    uploadLogo: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get(`/api/vendors/${id}`);
        setVendor(response.data);
        setFormData({
          businessName: response.data.businessName,
          email: response.data.email,
          website: response.data.website,
          businessCategory: response.data.businessCategory,
          city: response.data.city,
          uploadLogo: response.data.uploadLogo,
        });
      } catch (error) {
        console.error("Error fetching vendor:", error);
      }
    };

    fetchVendor();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/vendors/${id}`, formData);
      // Redirect back to AdminDashboard after saving
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  if (!vendor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Vendor</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="businessName" className="block text-sm font-medium">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={vendor.businessName}
            onChange={handleInputChange}
            className="mt-1 block w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="website" className="block text-sm font-medium">
            Website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="businessCategory" className="block text-sm font-medium">
            Business Category
          </label>
          <input
            type="text"
            id="businessCategory"
            name="businessCategory"
            value={formData.businessCategory}
            onChange={handleInputChange}
            className="mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="mt-1 block w-full"
          />
        </div>

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default EditVendorPage;
