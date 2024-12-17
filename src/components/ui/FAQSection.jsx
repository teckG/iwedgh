"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQSection() {
  return (
    <div className="py-16 px-6 md:px-24 bg-gradient-to-r from-[#2c3e50] to-[#4a6fa5]">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-white">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 font-semibold">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="py-5 px-6 text-lg font-semibold text-gray-800 bg-[#ffbe90]  shadow-md hover:bg-[#fe8f40] hover:text-white transition-all ease-in-out duration-300">
                Is it free to use the platform?
              </AccordionTrigger>
              <AccordionContent className="py-4 px-6 bg-white text-gray-700  shadow-sm">
                Yes. It is completely free to use the platform.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="py-5 px-6 text-lg font-semibold text-gray-800 bg-[#ffbe90]  shadow-md hover:bg-[#fe8f40] hover:text-white transition-all ease-in-out duration-300">
                Do I have to pay a vendor for enquiries?
              </AccordionTrigger>
              <AccordionContent className="py-4 px-6 bg-white text-gray-700  shadow-sm">
                No. You are not going to pay for enquiries.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="py-5 px-6 text-lg font-semibold text-gray-800 bg-[#ffbe90]  shadow-md hover:bg-[#fe8f40] hover:text-white transition-all ease-in-out duration-300">
                Can I save a vendor in my Favorites list?
              </AccordionTrigger>
              <AccordionContent className="py-4 px-6 bg-white text-gray-700  shadow-sm">
                Yes. The Favorite list feature helps you do that.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="py-5 px-6 text-lg font-semibold text-gray-800 bg-[#ffbe90]  shadow-md hover:bg-[#fe8f40] hover:text-white transition-all ease-in-out duration-300">
                Can I browse the platform without an account?
              </AccordionTrigger>
              <AccordionContent className="py-4 px-6 bg-white text-gray-700  shadow-sm">
                Yes. There is a guest mode but you can&apos;t add a vendor to your list.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="py-5 px-6 text-lg font-semibold text-gray-800 bg-[#ffbe90]  shadow-md hover:bg-[#fe8f40] hover:text-white transition-all ease-in-out duration-300">
                I am a vendor, how do I join the platform?
              </AccordionTrigger>
              <AccordionContent className="py-4 px-6 bg-white text-gray-700  shadow-sm">
                Kindly visit{" "}
                <Link
                  href="https://forms.gle/Q5MNwfZbwDNQUQBX6"
                  className="text-blue-500 hover:underline"
                >
                  <u>this link to sign up</u>
                </Link>{" "}
                as a vendor to join the family.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Right Section */}
        <div className="flex-1 space-y-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-6">
              <AccordionTrigger className="py-5 px-6 text-lg font-semibold text-gray-800 bg-[#ffbe90]  shadow-md hover:bg-[#fe8f40] hover:text-white transition-all ease-in-out duration-300">
                I am a vendor, but I don&apos;t know if my service is needed?
              </AccordionTrigger>
              <AccordionContent className="py-4 px-6 bg-white text-gray-700  shadow-sm">
                Kindly visit{" "}
                <Link
                  href="https://forms.gle/Q5MNwfZbwDNQUQBX6"
                  className="text-blue-500 hover:underline"
                >
                  <u>this link to let us discuss it</u>
                </Link>{" "}
                together.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
