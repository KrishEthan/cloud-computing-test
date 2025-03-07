import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  return (
    <div className="container mx-auto w-screen space-y-8">
      <nav className="flex justify-between items-center p-4">
        <h1 className="font-bold text-xl">Welcome Krish Parekh</h1>
        <Button variant="link">Logout</Button>
      </nav>
        <div className="flex flex-col">
            {/* Area for the subscriptions */}
            <h1>Subscriptions</h1>
            <div>Container</div>
        </div>     

        <div className="flex flex-col">
            {/* Area for the subscriptions */}
            <h1>Filtering</h1>
            <div>Container</div>
        </div>     
    </div>
  );
}
