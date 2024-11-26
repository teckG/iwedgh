"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Shirt } from "lucide-react";
import { useUser } from "@clerk/nextjs";

// Define the validation schema using Zod
const formSchema = z.object({
  businessName: z.string().nonempty("Business Name is required"),
  businessCategory: z.string().nonempty("Please select a business category"),
  subcategory: z.string().optional(),
  briefIntroduction: z.string().nonempty("Brief Introduction is required"),
  activePhoneNumber: z.string().nonempty("Phone Number is required"),
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().nonempty("Last Name is required"),
  password: z.string().min(6).max(15).nonempty("Password is required"),
  email: z
    .string()
    .email("Please enter a valid email")
    .nonempty("Email is required"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  region: z.string().nonempty("Region is required"),
  website: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  tiktok: z.string().optional(),
  whatsapp: z.string().optional(),
});

export default function MultiStepForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }, reset
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [step, setStep] = useState(1); // Tracks the current step
 
  const onSubmit = async (formData) => {
    const dataToSubmit = { ...formData };
    try {
      const response = await fetch("/api/addvendor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });
      const result = await response.json();
      if (result.success){
        toast.success(result.message);
        reset();
      } 
      else toast.error(result.message);

    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const { user } = useUser(); // Get user data from Clerk

  // Extract organization memberships
  const memberships = user?.organizationMemberships || [];
  
  // Define the required permissions
  const requiredPermissions = [
    "org:sys_profile:manage",
    "org:sys_profile:delete",
    "org:sys_memberships:read",
    "org:sys_memberships:manage",
    "org:sys_domains:read",
    "org:sys_domains:manage",
  ];

  // Check if any of the user's memberships have the required permissions
  const hasRequiredPermissions = memberships.some((membership) => 
    requiredPermissions.every(permission => membership.permissions.includes(permission))
  );

  if (!hasRequiredPermissions) return <p> Sorry , you don&apos;t have the required permissions to view this page.</p>;


  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Vendor Registration</h2>

        {/* Step Navigation */}
        <div className="flex gap-1 justify-between">
          <Button
            onClick={() => setStep(1)}
            className={`w-1/3 py-2 ${step === 1 ? "bg-[#fe8f40] text-white" : "bg-gray-400"}`}
          >
            Step 1: Bio Data
          </Button>
          <Button
            onClick={() => setStep(2)}
            className={`w-1/3 py-2 ${step === 2 ? "bg-[#fe8f40] text-white" : "bg-gray-400"}`}
          >
            Step 2: Business Data
          </Button>
          <Button
            onClick={() => setStep(3)}
            className={`w-1/3 py-2 ${step === 3 ? "bg-[#fe8f40] text-white" : "bg-gray-400"}`}
          >
            Step 3: Address
          </Button>
          <Button
            onClick={() => setStep(4)}
            className={`w-1/3 py-2 ${step === 4 ? "bg-[#fe8f40] text-white" : "bg-gray-400"}`}
          >
            Step 4: Socials
          </Button>
        </div>

        {/* Step 1: Bio Data */}
        {step === 1 && (
          <div className="space-y-6">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                First Name *
              </Label>
              <Input
                id="firstName"
                {...register("firstName")}
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.firstName && (
                <p className="mt-2 text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                Last Name *
              </Label>
              <Input
                id="lastName"
                {...register("lastName")}
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.lastName && (
                <p className="mt-2 text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>

            {/* Phone Number */}
        <div>
          <Label
            htmlFor="activePhoneNumber"
            className="block text-sm font-medium text-gray-600"
          >
            Active Phone Number *
          </Label>
          <Input
            id="activePhoneNumber"
            {...register("activePhoneNumber")}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.activePhoneNumber && (
            <p className="mt-2 text-sm text-red-500">
              {errors.activePhoneNumber.message}
            </p>
          )}
        </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email *
              </Label>
              <Input
                id="email"
                {...register("email")}
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password *
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full bg-[#fe8f40] text-white py-2 px-4 hover:bg-orange-500"
            >
              Next
            </Button>
          </div>
        )}

        {/* Step 2: Business Data */}
        {step === 2 && (
          <div className="space-y-6">
             {/* Business Name */}
        <div>
          <Label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-600"
          >
            Business Name *
          </Label>
          <Input
            id="businessName"
            {...register("businessName")}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.businessName && (
            <p className="mt-2 text-sm text-red-500">
              {errors.businessName.message}
            </p>
          )}
        </div>

        {/* Business Category */}
        <div>
          <Label
            htmlFor="businessCategory"
            className="block text-sm font-medium text-gray-600"
          >
            Business Category *
          </Label>
          <Select
            onValueChange={(value) => setValue("businessCategory", value)}
          >
            <SelectTrigger id="businessCategory" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">
              <span className="text-gray-700">{watch("businessCategory") || "Select a category"}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Apparel">Apparel</SelectItem>
              <SelectItem value="Band">Band</SelectItem>
              <SelectItem value="Soloist">Soloist</SelectItem>
              <SelectItem value="DJ">DJ</SelectItem>
              <SelectItem value="Bar Services">Bar Services</SelectItem>
              <SelectItem value="Beautician">Beautician</SelectItem>
              <SelectItem value="Cakes">Cakes</SelectItem>
              <SelectItem value="Catering">Catering</SelectItem>
              <SelectItem value="Decor">Decor</SelectItem>
              <SelectItem value="Fashion Designer">Fashion Designer</SelectItem>
              <SelectItem value="Lighting">Lighting</SelectItem>
              <SelectItem value="MC">MC&apos;s</SelectItem>
              <SelectItem value="Photographer">Photographer</SelectItem>
              <SelectItem value="Videographer">Videographer</SelectItem>
              <SelectItem value="Florist">Florist</SelectItem>
              <SelectItem value="Jeweler">Jeweler</SelectItem>
              <SelectItem value="Wedding Planner">Wedding Planner</SelectItem>
              <SelectItem value="Venues">Venues</SelectItem>
              <SelectItem value="Rental">Rental</SelectItem>
              <SelectItem value="Ushers">Ushers</SelectItem>
              <SelectItem value="Graphics">Wedding Stationery</SelectItem>
              <SelectItem value="Other">Other (specify below)</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="mt-2 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Subcategory (Other) */}
        <div>
          <Label
            htmlFor="subcategory"
            className="block text-sm font-medium text-gray-600"
          >
            Other Category, Subcategory
          </Label>
          <Input
            id="subcategory"
            {...register("subcategory")}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Brief Introduction */}
        <div>
          <Label
            htmlFor="briefIntroduction"
            className="block text-sm font-medium text-gray-600"
          >
            Brief Introduction *
          </Label>
          <Textarea
            id="briefIntroduction"
            {...register("briefIntroduction")}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.briefIntroduction && (
            <p className="mt-2 text-sm text-red-500">
              {errors.briefIntroduction.message}
            </p>
          )}
        </div>

            <Button
              onClick={() => setStep(3)}
              className="w-full bg-[#fe8f40] text-white py-2 px-4 hover:bg-orange-500"
            >
              Next
            </Button>
          </div>
        )}

        {/* Step 3: Others */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Address */}
            <div>
              <Label htmlFor="address" className="block text-sm font-medium text-gray-600">
                Address *
              </Label>
              <Input
                id="address"
                {...register("address")}
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.address && (
                <p className="mt-2 text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <Label htmlFor="city" className="block text-sm font-medium text-gray-600">
                City *
              </Label>
              <Input
                id="city"
                {...register("city")}
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.city && (
                <p className="mt-2 text-sm text-red-500">{errors.city.message}</p>
              )}
            </div>

            {/* Region */}
        <div>
          <Label
            htmlFor="region"
            className="block text-sm font-medium text-gray-600"
          >
            Region *
          </Label>
          <Select onValueChange={(value) => setValue("region", value)}>
            <SelectTrigger id="region" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">
              <span className="text-gray-700">{watch("region") || "Select a region"}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ashanti Region">Ashanti Region</SelectItem>
              <SelectItem value="Central Region">Central Region</SelectItem>
              <SelectItem value="Eastern Region">Eastern Region</SelectItem>
              <SelectItem value="Greater Accra Region">Greater Accra Region</SelectItem>
              <SelectItem value="Northern Region">Northern Region</SelectItem>
              <SelectItem value="Western Region">Western Region</SelectItem>
              <SelectItem value="Volta Region">Volta Region</SelectItem>
              <SelectItem value="Upper East Region">Upper East Region</SelectItem>
              <SelectItem value="Upper West Region">Upper West Region</SelectItem>
            </SelectContent>
          </Select>
          {errors.region && (
            <p className="mt-2 text-sm text-red-500">{errors.region.message}</p>
          )}
        </div>

            {/* Website */}
            <div>
          <Label
            htmlFor="website"
            className="block text-sm font-medium text-gray-600"
          >
            Website
          </Label>
          <Input
            id="website"
            {...register("website")}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <Button
              onClick={() => setStep(4)}
              className="w-full bg-[#fe8f40] text-white py-2 px-4 hover:bg-orange-500"
            >
              Next
            </Button>
            
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6"> 

        

        {/* Social Media Links */}
        <div className="space-y-4">
          {['facebook', 'twitter', 'instagram', 'tiktok', 'whatsapp'].map((platform) => (
            <div key={platform}>
              <Label
                htmlFor={platform}
                className="block text-sm font-medium text-gray-600"
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </Label>
              <Input
                id={platform}
                {...register(platform)}
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors[platform] && (
                <p className="mt-2 text-sm text-red-500">
                  {errors[platform].message}
                </p>
              )}
            </div>
          ))}
        </div>
        <Button
              type="submit"
              className="w-full bg-[#fe8f40] text-white py-2 px-4 hover:bg-orange-500"
            >
              Submit
            </Button>
          </div>
      )}

      </form>
    </div>
  )}