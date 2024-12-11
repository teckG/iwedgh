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
    <div className="p-8 px-24">
      <h2 className="mb-4 text-2xl  text-green-600 font-extrabold leading-tight">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 gap-16">
        <div className="col flex-1">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it free to use the platform?</AccordionTrigger>
              <AccordionContent>Yes. It is completely free to use the platform.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Do I have to pay a vendor for enquiries?</AccordionTrigger>
              <AccordionContent>No. You are not going to pay for enquiries.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can I save a vendor in my Favorites list?</AccordionTrigger>
              <AccordionContent>Yes. The Favorite list feature helps you do that.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I browse the platform without an account?</AccordionTrigger>
              <AccordionContent>Yes. There is a guest mode but you cant add a vendor to your list.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>I am vendor, how do I join the platform?</AccordionTrigger>
              <AccordionContent>
                Kindly visit{" "}
                <Link href="https://forms.gle/Q5MNwfZbwDNQUQBX6" className="link"><u>link to sign up</u></Link> as a vendor to join the family.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="col flex-1">
          <Accordion type="single" collapsible>
            {/* Add more FAQs here */}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
