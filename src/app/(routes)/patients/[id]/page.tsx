import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";

import Link from "next/link";
import { instance } from "@/lib/instance";

import { Patient } from "@/types";

type Props = {
  params: Promise<{ id: string }>;
};

async function PatientDetailPage({ params }: Props) {
  const { id } = await params;

  const res = await instance.get(`/patients/${id}`);

  const patient = res.data as Patient;

  const { address, insurance, appointments, patientAllergies, treatmentHistories } = patient;

  const { addressLine, city, district, ward } = address;

  const { code, expiredDate } = insurance;

  return (
    <div className="space-y-6">
      <Link href={"/patients"}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patients List
        </Button>
      </Link>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={"https://api.dicebear.com/7.x/avataaars/svg?seed=John"} />
              <AvatarFallback>
                {patient.firstName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold">
                {patient.firstName} {patient.lastName}
              </h2>
              <p className="text-muted-foreground">
                Age {new Date().getFullYear() - new Date(patient.dob).getFullYear()}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <Badge>{patient.gender}</Badge>

                <Badge variant="outline">Blood Type: {patient.bloodType}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="treatmentHistory">Treament History</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="font-medium">Address:</span> {addressLine}, {ward}
              </div>

              <div>
                <span className="font-medium">City:</span> {city}, {district}
              </div>

              <div>
                <span className="font-medium">Allergies:</span>
                <ul className="ml-4 mt-1 list-inside list-disc">
                  {patientAllergies.map((allergy) => (
                    <li key={allergy.allergy.allergen}>
                      {allergy.allergy.allergen}{" "}
                      <span className="font-semibold">({allergy.severity})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance">
          <Card>
            <CardHeader>
              <CardTitle>Current Insurance</CardTitle>
            </CardHeader>

            <CardContent>
              <div>
                <span className="font-medium">Code:</span> {code}
              </div>

              <div>
                <span className="font-medium">Expired Date:</span>{" "}
                {new Date(expiredDate).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatmentHistory">
          <Card>
            <CardHeader>
              <CardTitle>Treament History</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {treatmentHistories.map((t) => (
                  <div key={t.id} className="space-y-2 rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">
                          {new Date(t.visitedDate).toLocaleDateString()}
                        </div>

                        <div className="text-sm text-muted-foreground">Type: {t.type}</div>

                        <div className="text-sm text-muted-foreground">Disease: {t.disease}</div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-2 font-semibold">Medicines</p>
                        <div className="space-y-2">
                          {t.procedures.map((procedure) => (
                            <div key={procedure.id} className="text-sm">
                              {procedure.medicine.name} - {procedure.medicine.category}
                              <span className="text-muted-foreground">
                                {" "}
                                ({procedure.medicine.price})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 font-medium">Staff Involved</p>
                        <div className="flex flex-wrap gap-2">
                          {t.procedures.map((procedure) => (
                            <div
                              key={procedure.id}
                              className="flex flex-wrap items-center gap-2 rounded-lg border p-2"
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={"https://api.dicebear.com/7.x/avataaars/svg?seed=John"}
                                />
                                <AvatarFallback>
                                  {procedure.staff.lastName +
                                    " " +
                                    procedure.staff.firstName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-sm">
                                <p>
                                  {procedure.staff.firstName} {procedure.staff.lastName}
                                </p>
                                <p className="text-muted-foreground">{procedure.staff.jobType}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-2">
                      <Badge
                        variant={
                          apt.status === "Cancelled"
                            ? "destructive"
                            : apt.status === "Completed"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {apt.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {apt.staff.firstName} {apt.staff.lastName}
                      </div>
                    </div>

                    <div className="text-left">
                      <div>From: {new Date(apt.startTime).toLocaleString()}</div>
                      <div>To: {new Date(apt.endTime).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PatientDetailPage;
