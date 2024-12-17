"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vendorsPerPage] = useState(6);
  const [totalVendors, setTotalVendors] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("/api/vendors");
        setVendors(response.data);
        setTotalVendors(response.data.length);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, []);

  const handleEdit = (vendor) => {
    router.push(`/admin/edit/${vendor._id}`);
  };

  const handleDelete = async (vendorId) => {
    try {
      await axios.delete(`/api/vendors/${vendorId}`);
      setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
      setTotalVendors(totalVendors - 1);
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalPages = Math.ceil(totalVendors / vendorsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
    requiredPermissions.every((permission) =>
      membership.permissions.includes(permission)
    )
  );

  if (!hasRequiredPermissions)
    return <p>Sorry, you don&apos;t have the required permissions to view this page.</p>;

  return (
    <div className="container mx-auto lg:p-8 sm:p-2 md:p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVendors.map((vendor) => (
          <div
            key={vendor._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center text-center"
          >
            {/* Vendor Logo */}
            <Link href={`/vendors/${vendor._id}`}>
              {vendor.uploadLogo ? (
                <Image
                  src={vendor.uploadLogo}
                  alt={vendor.businessName}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full mb-4"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold text-xl mb-4">
                  {vendor.businessName[0]}
                </div>
              )}
            </Link>

            {/* Business Information */}
            <h3 className="text-lg font-semibold mb-2">{vendor.businessName}</h3>
            <p className="text-gray-600 text-sm">{vendor.email}</p>
            <p className="text-gray-500 text-sm mb-2">
              {vendor.businessCategory} - {vendor.city}
            </p>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              <Button
                onClick={() => handleEdit(vendor)}
                variant="outline"
                className="flex items-center gap-1"
              >
                <Pencil className="h-4 w-4 text-[#fe8f40]" />
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(vendor._id)}
                variant="outline"
                className="flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4 text-red-700" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-[#fe8f40] text-white"
          >
            Previous
          </Button>
          <span className="text-sm font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-[#fe8f40] text-white"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
