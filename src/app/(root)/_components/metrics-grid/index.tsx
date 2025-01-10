import { Users, BedIcon, Stethoscope, Receipt } from "lucide-react";
import React from "react";
import MetricCard from "./metric-card";

function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Patients"
        value="1,234"
        trend={12.5}
        icon={<Users className="h-5 w-5 text-blue-500" />}
        description="Total number of registered patients"
      />
      <MetricCard
        title="Available Beds"
        value="45"
        trend={-8.3}
        icon={<BedIcon className="h-5 w-5 text-blue-500" />}
        description="Currently available hospital beds"
      />
      <MetricCard
        title="Staff on Duty"
        value="89"
        trend={3.2}
        icon={<Stethoscope className="h-5 w-5 text-blue-500" />}
        description="Medical staff currently on duty"
      />
      <MetricCard
        title="Pending Bills"
        value="$23.5K"
        trend={15.8}
        icon={<Receipt className="h-5 w-5 text-blue-500" />}
        description="Total pending payments"
      />
    </div>
  );
}

export default MetricsGrid;
