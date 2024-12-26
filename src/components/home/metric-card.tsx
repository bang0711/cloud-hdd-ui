import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { InfoIcon } from "lucide-react";

type Props = {
  title?: string;
  value?: string | number;
  icon?: React.ReactNode;
  trend?: number;
  description?: string;
};

function MetricCard({
  title = "Total Patients",
  value = "1,234",
  icon,
  trend = 12.5,
  description = "Total number of registered patients",
}: Props) {
  return (
    <Card className="space-y-4 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{value}</span>
            <span
              className={`text-sm ${trend >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {trend >= 0 ? "+" : ""}
              {trend}%
            </span>
          </div>
        </div>
        <div className="rounded-lg bg-blue-50 p-2">{icon}</div>
      </div>
    </Card>
  );
}

export default MetricCard;
