import React from "react";
import AdventureList from "@/components/AdventureList";
import AITripPlanner from "@/components/AITripPlanner";

export default function ExpeditionsPage() {
  return (
    <div className="bg-white w-full">
      <AdventureList />
      <AITripPlanner />
    </div>
  );
}
