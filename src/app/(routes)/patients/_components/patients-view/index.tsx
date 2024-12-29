import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import AddPatientModal from "./add-patient-modal";
import Link from "next/link";
import { Patient } from "@/types";

type Props = {
  patients: Patient[];
};

function PatientsView({ patients }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddPatientModal />
      </div>

      <div className="flex flex-col space-y-4">
        {patients.map((patient) => (
          <Link href={`/patients/${patient.id}`} key={patient.id}>
            <Card className="cursor-pointer transition-shadow hover:shadow-lg">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={"https://api.dicebear.com/7.x/avataaars/svg?seed=John"} />
                    <AvatarFallback>
                      {patient.lastName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-medium">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(patient.dob).toDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <p>
                      Gender: <span className="capitalize">{patient.gender}</span>
                    </p>
                    <p className="text-muted-foreground">Blodd Type: {patient.bloodType}</p>
                  </div>

                  <Badge variant={patient.gender === "male" ? "outline" : "default"}>
                    {patient.gender}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PatientsView;
