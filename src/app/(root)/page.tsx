// import DepartmentView from "@/app/(root)/_components/department-view";
import React from "react";
import MetricsGrid from "./_components/metrics-grid";

function RootPage() {
  return (
    <main className="space-y-6 p-6">
      <MetricsGrid />

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Departments</h2>
        {/* <DepartmentView /> */}
      </div>
    </main>
  );
}

export default RootPage;
