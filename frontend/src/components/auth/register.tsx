import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
  return (
    <div className="w-1/2  ">
      <Card className="p-8 space-y-4">
        <CardTitle>Register</CardTitle>
        <CardDescription>Fill in your details to create an account</CardDescription>
        <Input placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Button>Register</Button>
      </Card>
    </div>
  );
}
