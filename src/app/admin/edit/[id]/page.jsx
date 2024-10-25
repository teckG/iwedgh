"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const EditVendor = ({ params }) => {
  const { id } = params; // Get the vendor ID from the route
  const router = useRouter();

  const [formData, setFormData] = useState({
    businessName: "",
    businessCategory: "",
    briefIntroduction: "",
    activePhoneNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    uploadLogo: "",
    address: "",
    city: "",
    region: "",
    website: "",
    socialMediaLinks: {
      instagram: "",
      twitter: "",
      tiktok: "",
      whatsapp: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get(`/api/vendors/${id}`);
        const vendorData = response.data;
        setFormData({
          businessName: vendorData.businessName,
          businessCategory: vendorData.businessCategory,
          briefIntroduction: vendorData.briefIntroduction,
          activePhoneNumber: vendorData.activePhoneNumber,
          firstName: vendorData.firstName,
          lastName: vendorData.lastName,
          email: vendorData.email,
          uploadLogo: vendorData.uploadLogo,
          address: vendorData.address,
          city: vendorData.city,
          region: vendorData.region,
          website: vendorData.website,
          socialMediaLinks: {
            instagram: vendorData.socialMediaLinks.instagram,
            twitter: vendorData.socialMediaLinks.twitter,
            tiktok: vendorData.socialMediaLinks.tiktok,
            whatsapp: vendorData.socialMediaLinks.whatsapp,
          },
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vendor:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      socialMediaLinks: {
        ...prevData.socialMediaLinks,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/vendors/${id}`, formData);
      router.push("/admin");
    } catch (err) {
      console.error("Error updating vendor:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width={200}><rect fill="#F5A+
        47E" stroke="#F5A47E" strokeWidth="4" strokeLinejoin="round" width="30" height="30" x="85" y="85" rx="0" ry="0"><animate attributeName="rx" calcMode="spline" dur="1.7" values="15;15;5;15;15" keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1" repeatCount="indefinite"></animate><animate attributeName="ry" calcMode="spline" dur="1.7" values="15;15;10;15;15" keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1" repeatCount="indefinite"></animate><animate attributeName="height" calcMode="spline" dur="1.7" values="30;30;1;30;30" keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1" repeatCount="indefinite"></animate><animate attributeName="y" calcMode="spline" dur="1.7" values="40;170;40;" keySplines=".6 0 1 .4;0 .8 .2 1" repeatCount="indefinite"></animate></rect></svg>
      </div>
    );
  }
  
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Vendor</CardTitle>
          <CardDescription>Edit details of vendor {formData.businessName}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Name */}
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Business Category */}
              <div>
                <Label htmlFor="businessCategory">Business Category</Label>
                <Input
                  type="text"
                  name="businessCategory"
                  value={formData.businessCategory}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Brief Introduction */}
              <div className="md:col-span-2">
                <Label htmlFor="briefIntroduction">Brief Introduction</Label>
                <Textarea
                  name="briefIntroduction"
                  value={formData.briefIntroduction}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="activePhoneNumber">Phone Number</Label>
                <Input
                  type="tel"
                  name="activePhoneNumber"
                  value={formData.activePhoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* First Name */}
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Logo URL */}
              <div>
                <Label htmlFor="uploadLogo">Logo URL</Label>
                <Input
                  type="url"
                  name="uploadLogo"
                  value={formData.uploadLogo}
                  onChange={handleInputChange}
                />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* City */}
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Region */}
              <div>
                <Label htmlFor="region">Region</Label>
                <Input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Website */}
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              {/* Social Media Links */}
              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      type="url"
                      name="instagram"
                      value={formData.socialMediaLinks.instagram}
                      onChange={handleSocialMediaChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      type="url"
                      name="twitter"
                      value={formData.socialMediaLinks.twitter}
                      onChange={handleSocialMediaChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tiktok">TikTok</Label>
                    <Input
                      type="url"
                      name="tiktok"
                      value={formData.socialMediaLinks.tiktok}
                      onChange={handleSocialMediaChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      type="url"
                      name="whatsapp"
                      value={formData.socialMediaLinks.whatsapp}
                      onChange={handleSocialMediaChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" onClick={handleSubmit} className="bg-[#fe8f40] hover:bg-[#d17c40]">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditVendor;

