"use client";
import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-4">About iWedGh</h4>
            <p className="text-sm text-gray-400">
              iWedGh is a platform that helps couples manage their wedding plans effortlessly. From budget planning to vendor management, we provide everything you need.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div className="text-center">
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="text-sm text-gray-400">
              <li>Email: <a href="mailto:support@iwedgh.com" className="text-blue-400 hover:underline">support@iwedgh.com</a></li>
              <li>Phone: +233 123 456 789</li>
              <li>WhatsApp: +233 987 654 321</li>
              <li>Support: <a href="https://iwedgh.com/support" className="text-blue-400 hover:underline">iwedgh.com/support</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="text-sm text-gray-400">
              <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link href="/vendors" className="hover:underline">Vendor Directory</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="tracking-wide text-sm text-gray-400">
            &copy; {new Date().getFullYear()} iWedGh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
