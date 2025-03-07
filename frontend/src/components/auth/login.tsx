import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="w-1/2  ">
      <Card className="p-8 space-y-4">
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to login</CardDescription>
        <Input placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Button>Login</Button>
      </Card>
    </div>
  );
}
