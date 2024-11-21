"use client"

import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";


// Assuming these are custom components. Ensure they are correctly implemented.
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vendorsPerPage] = useState(5); // Number of vendors per page
  const [totalVendors, setTotalVendors] = useState(0);


  const router = useRouter();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("/api/vendors");
        setVendors(response.data);
        setTotalVendors(response.data.length); // Set total vendors count
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, []);

  // Handle Edit Click
  const handleEdit = (vendor) => {
    router.push(`/admin/edit/${vendor._id}`);
  };


  // Handle Close Modal
  const handleCloseModal = () => {
    setEditModalOpen(false); // Close the modal
  };



  // Calculate the index of the last vendor on the current page
  const indexOfLastVendor = currentPage * vendorsPerPage;
  // Calculate the index of the first vendor on the current page
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  // Get current vendors
  const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalVendors / vendorsPerPage);

 
  const handleDelete = async (vendorId) => {
    // Handle the delete action
    try {
      await axios.delete(`/api/vendors/${vendorId}`);
      setVendors(vendors.filter(vendor => vendor._id !== vendorId));
      setTotalVendors(totalVendors - 1); // Update total vendors count
    } catch (error) {
      console.error("Error deleting vendor:", error);
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
    

    <div className="container p-4 bg-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Table>
        <thead>
          <TableRow>
            <TableCell className="font-semibold">Logo</TableCell>
            <TableCell className="font-semibold">Business Name</TableCell>
            <TableCell className="font-semibold">Email</TableCell>
            <TableCell className="font-semibold">Website</TableCell>
            <TableCell className="font-semibold">Category</TableCell>
            <TableCell className="font-semibold">City</TableCell>
            <TableCell className="font-semibold">Actions</TableCell>
          </TableRow>
        </thead>
        <TableBody>
          {currentVendors.map(vendor => (
            <TableRow key={vendor._id}>
              <Link href={`/vendors/${vendor._id}`}>
              <TableCell>
                {vendor.uploadLogo ? (
                  <Image src={vendor.uploadLogo} alt={vendor.businessName} width={48} height={48} className="w-12 h-12 rounded-full" />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white text-xl">
                    {vendor.businessName[0]}
                  </div>
                )}
              </TableCell>
              </Link>
              <TableCell>{vendor.businessName}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>
                {vendor.website}
                </TableCell>
              <TableCell>{vendor.businessCategory}</TableCell>
              <TableCell>{vendor.city}</TableCell>
              <TableCell>
  <Button
    onClick={() => handleEdit(vendor)}  // Pass the vendor object
    className="mr-2"
    variant="outline"
  >
    <Pencil className="h-4 w-4 text-[#fe8f40]"  />
  </Button>
  <Button
    onClick={() => handleDelete(vendor._id)} // Delete functionality remains the same
    variant="outline"
  >
    <Trash2 className="h-4 w-4 text-red-700" />
  </Button>
</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <Button
        className="bg-[#fe8f40]"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span         className="bg-[#fe8f40] p-5 m-2 rounded-md"
         >Page {currentPage} of {totalPages}</span>
        <Button
          className="bg-[#fe8f40]"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
     
    
    </div>

  );
}


export default AdminDashboard;