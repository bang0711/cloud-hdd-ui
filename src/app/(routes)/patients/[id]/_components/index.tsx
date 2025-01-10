import { Patient } from "@/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ReturnButton from "@/components/shared/return-button";

import PatientOverview from "./patient-overview";
import PatientInsurance from "./patient-insurance";
import DeletePatient from "./delete-patient";

type Props = {
  patient: Patient;
};

async function PatientDetailView({ patient }: Props) {
  const { address, insurance, patientAllergies, firstName, lastName, gender, bloodType, dob } =
    patient;

  return (
    <div className="space-y-6">
      <ReturnButton href="/patients" title="Back to Patients List" />

      <Card>
        <CardContent className="flex justify-between p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={"https://api.dicebear.com/7.x/avataaars/svg?seed=John"} />
              <AvatarFallback>
                {firstName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold">
                {firstName} {lastName}
              </h2>
              <p className="text-muted-foreground">
                Age {new Date().getFullYear() - new Date(dob).getFullYear()}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <Badge>{gender}</Badge>

                <Badge variant="outline">Blood Type: {bloodType}</Badge>
              </div>
            </div>
          </div>

          <DeletePatient patientId={patient.id} />
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <PatientOverview address={address} patientAllergies={patientAllergies} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance">
          <Card>
            <CardHeader>
              <CardTitle>Current Insurance</CardTitle>
            </CardHeader>

            <CardContent>
              <PatientInsurance insurance={insurance} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PatientDetailView;
