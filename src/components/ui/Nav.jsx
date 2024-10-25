"use client"; // For client-side rendering in Next.js

import * as React from "react";
import Link from "next/link";
import { SignUpButton, useUser } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  HandPlatter,
  ImagesIcon,
  StarIcon,
  CheckCheck,
  HashIcon,
  UserCheck,
  PencilLineIcon,
  LucideDollarSign,
  LogInIcon,
  LogIn,
  LucideSignpost,
  LogOut,
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
    requiredPermissions.every(permission =>
      membership.permissions.includes(permission)
    )
  );

  // Navigation items
  const navItems = [
    { href: "/", label: "iWedGh", icon: null },
    { href: "/vendors", label: "Vendors", icon: <HandPlatter width={20} className="text-[#fe8f40]" /> },
    { href: "/hashtag", label: "Hashtag Generator", icon: <HashIcon width={20} className="text-[#fe8f40]" /> },
    { href: "/checklist", label: "Check List", icon: <CheckCheck width={20} className="text-[#fe8f40]" /> },
    { href: "/budget", label: "Budget Planner", icon: <LucideDollarSign width={20} className="text-[#fe8f40]" /> },
    { href: "/collection", label: "Collection", icon: <StarIcon width={20} className="text-[#fe8f40]" /> },
  ];

  const adminItems = [
    { href: "/admin", label: "Admin Dashboard", icon: <UserCheck width={20} className="text-[#fe8f40]" /> },
    { href: "/enlist", label: "Register Vendor", icon: <PencilLineIcon width={20} className="text-[#fe8f40]" /> },
    { href: "/uploadimg", label: "Upload Image", icon: <ImagesIcon width={20} className="text-[#fe8f40]" /> },
  ];

  return (
    <NavigationMenu className="max-w-full bg-gray-800 text-white text-sm">
      <div className="py-3">
        <NavigationMenuList className="flex justify-between flex-wrap gap-2 items-center">
          {/* Render standard navigation items */}
          {navItems.map(({ href, label, icon }, index) => (
            <NavigationMenuItem key={index}>
              <Link
                href={href}
                passHref
                className="flex gap-2 flex-row justify-between rounded-md p-2 py-1 no-underline outline-none hover:text-[#3a3a3a] hover:bg-[#ffffff]"
              >
                {icon} {label}
              </Link>
            </NavigationMenuItem>
          ))}

          {/* Render admin navigation items if user has permissions */}
          {hasRequiredPermissions && adminItems.map(({ href, label, icon }, index) => (
            <NavigationMenuItem key={index}>
              <Link
                href={href}
                passHref
                className="flex gap-2 flex-row justify-between rounded-md p-2 py-1 no-underline outline-none hover:text-[#3a3a3a] hover:bg-[#ffffff]"
              >
                {icon} {label}
              </Link>
            </NavigationMenuItem>
          ))}

          {/* User authentication buttons */}
          <NavigationMenuItem className="flex items-center justify-center">
            <SignedOut className="flex justify-between">
              <div className="flex gap-2 flex-row justify-between rounded-md p-2 py-1 no-underline outline-none hover:text-[#3a3a3a] hover:bg-[#ffffff]">
              <LogIn  className="text-[#fe8f40]" width={20} /> <SignInButton />
              </div>
              <div className="flex gap-2 flex-row justify-between rounded-md p-2 py-1 no-underline outline-none hover:text-[#3a3a3a] hover:bg-[#ffffff]">
              <LogOut className="text-[#fe8f40]" width={20} /> <SignUpButton />
              </div>
            </SignedOut>
            <SignedIn className="flex items-center justify-center">
              <UserButton />
            </SignedIn>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
