import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

const medicine = {
  id: "M001",
  name: "Amoxicillin 500mg",
  stock: 532,
  category: "Antibiotics",
  status: "in-stock" as const,
  price: 12.99,
  image:
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400&h=400",
  description: "Broad-spectrum antibiotic used to treat various bacterial infections",
  manufacturer: "PharmaCorp Inc.",
  expiryDate: "2025-06-30",
  batchNumber: "LOT-2023-456",
  storageConditions: "Store below 25°C in a dry place",
  sideEffects: ["Nausea", "Vomiting", "Diarrhea", "Rash", "Allergic reactions"],
  dosageInstructions: [
    "Take with or without food",
    "Complete the full course as prescribed",
    "Take at regular intervals",
  ],
  reorderPoint: 100,
  reorderQuantity: 200,
  lastRestocked: "2024-01-15",
  supplierInfo: {
    name: "Medical Supplies Co.",
    contact: "+1 (555) 987-6543",
    email: "orders@medsupplies.com",
  },
};

const getStatusColor = (status: "in-stock" | "low-stock" | "out-of-stock") => {
  const colors = {
    "in-stock": "bg-green-100 text-green-800",
    "low-stock": "bg-yellow-100 text-yellow-800",
    "out-of-stock": "bg-red-100 text-red-800",
  };
  return colors[status];
};

async function MedicineDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <Link href={"/pharmacy"}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pharmacy
        </Button>
      </Link>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="h-48 w-48 overflow-hidden rounded-lg">
              <Image
                width={200}
                height={200}
                src={medicine.image}
                alt={medicine.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold">
                {medicine.name} ({id})
              </h2>
              <p className="text-muted-foreground">{medicine.description}</p>

              <div className="mt-2 flex items-center gap-2">
                <Badge className={getStatusColor(medicine.status)}>{medicine.status}</Badge>
                <Badge variant="outline">{medicine.category}</Badge>
                <Badge variant="outline">${medicine.price.toFixed(2)}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="usage">Usage & Safety</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div>
                <span className="font-medium">Manufacturer:</span> {medicine.manufacturer}
              </div>

              <div>
                <span className="font-medium">Batch Number:</span> {medicine.batchNumber}
              </div>

              <div>
                <span className="font-medium">Expiry Date:</span> {medicine.expiryDate}
              </div>

              <div>
                <span className="font-medium">Storage:</span> {medicine.storageConditions}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div>
                <span className="font-medium">Supplier:</span> {medicine.supplierInfo.name}
              </div>

              <div>
                <span className="font-medium">Contact:</span> {medicine.supplierInfo.contact}
              </div>

              <div>
                <span className="font-medium">Email:</span> {medicine.supplierInfo.email}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dosage Instructions</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="list-inside list-disc space-y-1">
                {medicine.dosageInstructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Side Effects</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2">
                {medicine.sideEffects.map((effect) => (
                  <Badge key={effect} variant="outline">
                    {effect}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Current Stock</div>
                  <div className="text-2xl font-bold">{medicine.stock}</div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Reorder Point</div>
                  <div className="text-2xl font-bold">{medicine.reorderPoint}</div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Reorder Quantity</div>
                  <div className="text-2xl font-bold">{medicine.reorderQuantity}</div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Last Restocked</div>
                  <div className="text-2xl font-bold">{medicine.lastRestocked}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MedicineDetailPage;
