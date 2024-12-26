import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { patients } from "@/lib/constants";
import { getConditionColor } from "@/lib/utils";

import AddPatientModal from "./add-patient-modal";
import Link from "next/link";

function PatientsView() {
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
                    <AvatarImage src={patient.avatar} />
                    <AvatarFallback>
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">Room {patient.room}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <p>Age: {patient.age}</p>
                    <p className="text-muted-foreground">Admitted: {patient.admissionDate}</p>
                  </div>

                  <Badge className={getConditionColor(patient.condition)}>
                    {patient.condition}
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
