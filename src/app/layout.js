"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Set initial online/offline state
    setIsOnline(navigator.onLine);

    // Add event listeners for online and offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/images/logo.ico" />

          <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
          <meta
            name="keywords"
            content="iWedGh, Wedding Vendors, Wedding in Ghana, Wedding Planners"
          />
          <meta
            name="description"
            content="Discover iWedGh, Ghana's #1 wedding platform! Find top-rated vendors, stunning hashtags, budget planners, expert tips, and more to plan your dream wedding effortlessly."
          />
          <meta
            name="google-site-verification"
            content="xVRblMQYiDLHukCvTk8cDTbsaWk5_8ntGOZ34gAgUq4"
          />
          <meta
            property="og:title"
            content="iWedGh - Plan Your Dream Wedding"
          />
          <meta
            property="og:description"
            content="Discover Ghana's top wedding vendors, stunning hashtag generators, budget planners, expert tips, and more to plan your dream wedding effortlessly."
          />
          <meta
            property="og:image"
            content="https://www.iwedgh.com/assets/og-image.jpg"
          />
          <meta property="og:url" content="https://www.iwedgh.com/" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_GH" />
          <meta property="og:site_name" content="iWedGh" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="iWedGh - Plan Your Dream Wedding"
          />
          <meta
            name="twitter:description"
            content="Discover Ghana's top wedding vendors, stunning hashtag generators, budget planners, expert tips, and more to plan your dream wedding effortlessly."
          />
          <meta
            name="twitter:image"
            content="https://www.iwedgh.com/assets/twitter-card.jpg"
          />

          <link rel="canonical" href="https://www.iwedgh.com/" />
          <title>iWedGh - Ghana&apos;s #1 Wedding Platform</title>
        </head>
        <body className="bg-gradient-to-r from-[#fdb588e8] via-[#ffc49f79] to-[#efb3003f] min-h-screen flex flex-col">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="flex-1 flex">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-gray-800 text-white">
              <Nav />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Top Nav for smaller screens */}
              <header className="md:hidden bg-gray-800 text-white">
                <Nav />
              </header>

              {/* Offline Warning */}
              {!isOnline && (
                <div className="bg-red-500 text-white text-center p-2">
                  You are currently offline. Please check your internet
                  connection.
                </div>
              )}

              {/* Main Content */}
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
