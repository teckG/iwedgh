import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Adjust the import path accordingly
import { SignInForm, SignUpForm } from "@/components/ui/authForms"; // Separate components for the forms

function AuthTabs() {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className="w-96 bg-green-600 p-8 rounded">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex justify-center">
          <TabsTrigger value="signin" className="w-1/2">Sign In</TabsTrigger>
          <TabsTrigger value="signup" className="w-1/2">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthTabs;
