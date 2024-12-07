"use client"; // For client-side rendering in Next.js

import * as React from "react";
import Link from "next/link";
import Footer from "@/components/ui/Footer";
import { useUser } from "@clerk/nextjs";
import {
  HandPlatter,
  ImagesIcon,
  StarIcon,
  CheckCheck,
  HashIcon,
  UserCheck,
  PencilLineIcon,
  LucideDollarSign,
  LogIn,
  User,
  LucideHome,
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Nav() {
  const { user } = useUser(); // Get the current user

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

  // Check if the user has the required permissions
  const hasRequiredPermissions = memberships.some((membership) =>
    requiredPermissions.every((permission) =>
      membership.permissions.includes(permission)
    )
  );

  // Navigation items
  const navItems = [
    { href: "/", label: "iWedGh", icon: <LucideHome width={20} className="text-[#fe8f40]" /> },
    {
      href: "/vendors",
      label: "Vendors",
      icon: <HandPlatter width={20} className="text-[#fe8f40]" />,
    },
    {
      href: "/hashtag",
      label: "Hashtag Generator",
      icon: <HashIcon width={20} className="text-[#fe8f40]" />,
    },
    {
      href: "/checklist",
      label: "Check List",
      icon: <CheckCheck width={20} className="text-[#fe8f40]" />,
    },
    {
      href: "/budget",
      label: "Budget Planner",
      icon: <LucideDollarSign width={20} className="text-[#fe8f40]" />,
    },
    {
      href: "/collection",
      label: "Collection",
      icon: <StarIcon width={20} className="text-[#fe8f40]" />,
    },
  ];

  const adminItems = [
    {
      href: "/admin",
      label: "Admin Dashboard",
      icon: <UserCheck width={20} className="text-[#fe8f40]" />,
    },
    {
      href: "/enlist",
      label: "Register Vendor",
      icon: <PencilLineIcon width={20} className="text-[#fe8f40]" />,
    },
    {
      href: "/uploadimg",
      label: "Upload Image",
      icon: <ImagesIcon width={20} className="text-[#fe8f40]" />,
    },
  ];

  return (
    <nav className="flex flex-col justify-between min-h-screen p-4 bg-gray-800 text-white">
      {/* Navigation Links */}
      <div>
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="flex items-center gap-2 text-white p-2 hover:bg-gray-700 rounded"
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        {/* Admin navigation items */}
        {hasRequiredPermissions &&
          adminItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center gap-2 text-white p-2 hover:bg-gray-700 rounded"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
      </div>
      

      {/* Authentication Links */}
      <div className="flex items-center gap-4 p-2">
        <SignedOut>
          <div className="flex items-center gap-2">
            <LogIn className="text-[#fe8f40]" width={20} />
            <SignInButton />
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-2">
            <User className="text-[#fe8f40]" width={20} />
            <UserButton />
          </div>
        </SignedIn>
      </div>

      {/* Footer */}
      <Footer />
    </nav>
  );
}
