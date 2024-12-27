import React from "react";
import PharmacyView from "./_components/pharmacy-view";

function PharmacyPage() {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold md:text-2xl">Patients</h2>
      <PharmacyView />
    </div>
  );
}

export default PharmacyPage;
