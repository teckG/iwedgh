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
    <div className="py-16 px-6 md:px-24 bg-white ">
      <h2 className="text-3xl font-extrabold  mb-8 text-center text-[#fe8f40] ">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col md:flex-row gap-12 md:gap-16">
        <div className="flex-1 space-y-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="py-4 px-6 text-lg font-medium text-gray-800 bg-white shadow-sm hover:bg-green-50 transition">
                Is it free to use the platform?
              </AccordionTrigger>
              <AccordionContent className="py-4 px-6 bg-gray-100 text-gray-700 rounded-b-md">
                Yes. It is completely free to use the platform.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="py-4 px-6 text-lg font-medium text-gray-800 bg-white shadow-sm hover:bg-green-50 transition">
                Do I have to pay a vendor for enquiries?
              </AccordionTrigger>
              <AccordionContent className="py-4 px-6 bg-gray-100 text-gray-700 rounded-b-md">
                No. You are not going to pay for enquiries.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="py-4 px-6 text-lg font-medium text-gray-800 bg-white shadow-sm hover:bg-green-50 transition">
                Can I save a vendor in my Favorites list?
              </AccordionTrigger>
              <AccordionContent className="py-4 px-6 bg-gray-100 text-gray-700 rounded-b-md">
                Yes. The Favorite list feature helps you do that.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="py-4 px-6 text-lg font-medium text-gray-800 bg-white shadow-sm hover:bg-green-50 transition">
                Can I browse the platform without an account?
              </AccordionTrigger>
              <AccordionContent className="py-4 px-6 bg-gray-100 text-gray-700 rounded-b-md">
                Yes. There is a guest mode but you can’t add a vendor to your list.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="py-4 px-6 text-lg font-medium text-gray-800 bg-white shadow-sm hover:bg-green-50 transition">
                I am a vendor, how do I join the platform?
              </AccordionTrigger>
              <AccordionContent className="py-4 px-6 bg-gray-100 text-gray-700 rounded-b-md">
                Kindly visit{" "}
                <Link href="https://forms.gle/Q5MNwfZbwDNQUQBX6" className="text-blue-500 hover:underline">
                  <u>this link to sign up</u>
                </Link> as a vendor to join the family.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex-1 space-y-4">
          <Accordion type="single" collapsible>
          <AccordionItem value="item-5">
              <AccordionTrigger className="py-4 px-6 text-lg font-medium text-gray-800 bg-white shadow-sm hover:bg-green-50 transition">
                I am a vendor, but i don&apos;t know if my services is needed?
              </AccordionTrigger>
              <AccordionContent className="py-4 px-6 bg-gray-100 text-gray-700 rounded-b-md">
                Kindly visit{" "}
                <Link href="https://forms.gle/Q5MNwfZbwDNQUQBX6" className="text-blue-500 hover:underline">
                  <u>this link let us discuss it</u>
                </Link> together.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
