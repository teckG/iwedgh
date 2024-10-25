"use client"
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { Toaster } from "react-hot-toast";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Footer from "@/components/ui/Footer";


// export const metadata = {
//   title: "iWedGh",
//   description: "#1 Wedding Platform in Ghana",
// };

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
          <link rel="icon" href="/favicon.ico" />
          <title>iWedGh</title>
        </head>
        <body className="flex flex-col min-h-screen bg-gradient-to-r from-[#fdb588e8] via-[#ffc49f79] to-[#efb3003f]">
          <Toaster position="top-center" reverseOrder={false} />
          <Nav />

          {/* Show Offline Warning Banner */}
          {!isOnline && (
            <div className="bg-red-500 text-white text-center p-2 z-50">
              You are currently offline. Please check your internet connection.
            </div>
          )}

          {/* Main content should expand to fill the available space */}
          <main className="flex-grow">{children}</main>

          {/* Footer sticks to the bottom */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}