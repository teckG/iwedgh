import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegistrationForm from "@/components/ui/RegistrationForm";
import cockTail from "../../images/cocktail.jpeg";

export default function RegisterCardSection() {
  return (
    <div className="w-full bg-dark text-white mt-8">
      <Card className="flex flex-col md:flex-row pt-8 pb-4">
        <div className="flex-1 order-1 md:order-2">
          <CardHeader>
            <CardTitle>Register Now</CardTitle>
            <CardDescription>Use the form below to register.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <RegistrationForm />
          </CardContent>
        </div>
        <div className="flex-1 order-2 md:order-1">
          <CardContent className="h-full overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={cockTail}
                alt="Cocktail"
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
