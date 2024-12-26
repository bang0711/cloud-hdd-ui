import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";
import { getConditionColor } from "@/lib/utils";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};
const patient = {
  id: "P001",
  name: "John Smith",
  age: 45,
  condition: "stable" as const,
  room: "201",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  admissionDate: "2024-01-15",
  bloodType: "A+",
  weight: "75 kg",
  height: "175 cm",
  primaryDoctor: "Dr. Sarah Wilson",
  allergies: ["Penicillin", "Peanuts"],
  diagnosis: "Acute Appendicitis",
  medications: [
    { name: "Amoxicillin", dosage: "500mg", frequency: "Every 8 hours" },
    { name: "Ibuprofen", dosage: "400mg", frequency: "As needed for pain" },
  ],
  vitalSigns: {
    bloodPressure: "120/80 mmHg",
    heartRate: "72 bpm",
    temperature: "37.2°C",
    oxygenSaturation: "98%",
  },
  upcomingAppointments: [
    {
      date: "2024-02-20",
      time: "10:00 AM",
      doctor: "Dr. Sarah Wilson",
      type: "Follow-up",
    },
    {
      date: "2024-02-25",
      time: "2:30 PM",
      doctor: "Dr. Michael Chen",
      type: "Cardiology Consultation",
    },
  ],
};
async function PatientDetailPage({ params }: Props) {
  const { id } = await params;
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
              <AvatarImage src={patient.avatar} />
              <AvatarFallback>
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold">
                {patient.name} ({id})
              </h2>
              <p className="text-muted-foreground">
                Room {patient.room} • Age {patient.age}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <Badge className={getConditionColor(patient.condition)}>{patient.condition}</Badge>

                <Badge variant="outline">Blood Type: {patient.bloodType}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="font-medium">Primary Doctor:</span> {patient.primaryDoctor}
              </div>

              <div>
                <span className="font-medium">Admission Date:</span> {patient.admissionDate}
              </div>

              <div>
                <span className="font-medium">Weight:</span> {patient.weight}
              </div>

              <div>
                <span className="font-medium">Height:</span> {patient.height}
              </div>

              <div>
                <span className="font-medium">Diagnosis:</span> {patient.diagnosis}
              </div>

              <div>
                <span className="font-medium">Allergies:</span>
                <ul className="ml-4 mt-1 list-inside list-disc">
                  {patient.allergies.map((allergy) => (
                    <li key={allergy}>{allergy}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals">
          <Card>
            <CardHeader>
              <CardTitle>Current Vital Signs</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Object.entries(patient.vitalSigns).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <span className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {patient.medications.map((med, index) => (
                  <div key={index} className="space-y-2 rounded-lg border p-4">
                    <div className="font-medium">{med.name}</div>
                    <div className="text-sm text-muted-foreground">Dosage: {med.dosage}</div>
                    <div className="text-sm text-muted-foreground">Frequency: {med.frequency}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {patient.upcomingAppointments.map((apt, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{apt.type}</div>
                      <div className="text-sm text-muted-foreground">{apt.doctor}</div>
                    </div>

                    <div className="text-right">
                      <div>{apt.date}</div>
                      <div className="text-sm text-muted-foreground">{apt.time}</div>
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
