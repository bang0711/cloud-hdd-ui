import { PharmacyView } from "@/components/pharmacy";
import React from "react";

function PharmacyPage() {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold md:text-2xl">Patients</h2>
      <PharmacyView />
    </div>
  );
}

export default PharmacyPage;
