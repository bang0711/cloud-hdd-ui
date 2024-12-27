import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { medicines } from "@/lib/constants";

import AddMedicineDialog from "./add-medicine-dialog";

import Image from "next/image";
import Link from "next/link";

const getStatusColor = (status: Medicine["status"]) => {
  const colors = {
    "in-stock": "bg-green-100 text-green-800",
    "low-stock": "bg-yellow-100 text-yellow-800",
    "out-of-stock": "bg-red-100 text-red-800",
  };
  return colors[status];
};

function PharmacyView() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddMedicineDialog />
      </div>

      <div className="flex flex-col space-y-4">
        {medicines.map((medicine) => (
          <Link href={`/pharmacy/${medicine.id}`} key={medicine.id}>
            <Card className="cursor-pointer transition-shadow hover:shadow-lg">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 overflow-hidden rounded-lg">
                    <Image
                      width={100}
                      height={100}
                      src={medicine.image}
                      alt={medicine.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-medium">{medicine.name}</h3>
                    <p className="text-sm text-muted-foreground">{medicine.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <p>Stock: {medicine.stock}</p>
                    <p className="text-muted-foreground">${medicine.price.toFixed(2)}</p>
                  </div>

                  <Badge className={getStatusColor(medicine.status)}>{medicine.status}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PharmacyView;
