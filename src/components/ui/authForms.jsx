
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInForm() {
  return (
    <form className="space-y-4">
       <h3 className="p-4 rounded">To see your saved collections kindly login.</h3>
      <div>
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
        <Input type="email" id="email" className="w-full mt-1" required />
      </div>
      <div>
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
        <Input type="password" id="password" className="w-full mt-1" required />
      </div>
      <Button type="submit"  className="w-full">Sign In</Button>

    </form>
  );
}

export function SignUpForm() {
  return (
    <form className="space-y-4">
            <h3 className="p-4 rounded">To save your collections kindly signup. It is totally free.</h3>
      <div>
        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</Label>
        <Input type="text" id="name" className="w-full mt-1" required />
      </div>
      <div>
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
        <Input type="email" id="email" className="w-full mt-1" required />
      </div>
      <div>
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
        <Input type="password" id="password" className="w-full mt-1" required />
      </div>
      <Button type="submit" className="w-full">Sign Up</Button>
    </form>
  );
}
