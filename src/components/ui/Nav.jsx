"use client";

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
  Menu,
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "./dialog";


export function Nav() {
  const { user } = useUser();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

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

  const navItems = [
    { href: "/", label: "Home", icon: <LucideHome width={20} /> },
    { href: "/vendors", label: "Vendors", icon: <HandPlatter width={20} /> },
    { href: "/hashtag", label: "Hashtag", icon: <HashIcon width={20} /> },
    { href: "/checklist", label: "Checklist", icon: <CheckCheck width={20} /> },
    { href: "/budget", label: "Budget", icon: <LucideDollarSign width={20} /> },
    { href: "/collection", label: "Collection", icon: <StarIcon width={20} /> },
  ];

  const adminItems = [
    { href: "/admin", label: "Admin", icon: <UserCheck width={20} /> },
    { href: "/enlist", label: "Register", icon: <PencilLineIcon width={20} /> },
    { href: "/uploadimg", label: "Upload", icon: <ImagesIcon width={20} /> },
  ];

  return (
    <div>
      {/* Mobile Navigation Drawer */}
      <Sheet aria-describedby="Navigation bar">
  {/* Trigger button */}
  <SheetTrigger className="lg:hidden p-2 fixed top-4 left-4 z-50 bg-gray-800 text-white rounded-md shadow-md">
    <Menu size={24} aria-label={`Trigger Navbar`} />
  </SheetTrigger>

  {/* Content of the Sheet */}
  

  <SheetContent side="left" className="p-0 bg-gray-800 text-white">
    {/* Hidden DialogTitle for accessibility */}
    <DialogTitle className="visually-hidden">Navigation Menu</DialogTitle>
     

    {/* Title Section */}
    <div className="p-4">
      <h2 className="text-xl font-semibold">Navigation</h2>
    </div>

    {/* Navigation Items */}
    <div className="flex flex-col gap-2">
      {navItems.map((item, idx) => (
        <Link
          key={idx}
          href={item.href}
          className="flex items-center gap-2 p-4 hover:bg-gray-700"
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
      {hasRequiredPermissions &&
        adminItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="flex items-center gap-2 p-4 hover:bg-gray-700"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
    </div>

    <div className="mt-auto p-4">
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
  </SheetContent>
</Sheet>


      {/* Desktop Sidebar */}
{/* Desktop Sidebar */}
<nav
  className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transition-all duration-300 lg:block hidden ${
    isCollapsed ? "lg:w-20" : "lg:w-64"
  }`}
>
  <div className="flex flex-col justify-between h-full py-10">
    <div>
      {navItems.map((item, idx) => (
        <Link
          key={idx}
          href={item.href}
          className="group flex items-center gap-2 p-4 hover:bg-gray-700 rounded"
        >
          <div className="text-[#fe8f40]">{item.icon}</div>
          {!isCollapsed && (
            <span className="group-hover:text-[#fe8f40]">{item.label}</span>
          )}
        </Link>
      ))}
      {hasRequiredPermissions &&
        adminItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="group flex items-center gap-2 p-4 hover:bg-gray-700 rounded"
          >
            <div className="text-[#fe8f40]">{item.icon}</div>
            {!isCollapsed && (
              <span className="group-hover:text-[#fe8f40]">{item.label}</span>
            )}
          </Link>
        ))}
    </div>

    {/* Authentication Links */}
    <div className="p-4">
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

    {!isCollapsed && <Footer />}
  </div>
</nav>


    </div>
  );
}
