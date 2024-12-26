import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { bills } from "@/lib/constants";

const getStatusColor = (status: Bill["status"]) => {
  const colors = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    overdue: "bg-red-100 text-red-800",
  };
  return colors[status];
};

function BillingView() {
  return (
    <div className="space-y-4">
      {bills.map((bill) => (
        <Card key={bill.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-medium">{bill.patientName}</h3>
              <p className="text-sm text-muted-foreground">{bill.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right text-sm">
                <p className="font-medium">${bill.amount.toFixed(2)}</p>
                <p className="text-muted-foreground">{bill.date}</p>
              </div>

              <Badge className={getStatusColor(bill.status)}>{bill.status}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default BillingView;
