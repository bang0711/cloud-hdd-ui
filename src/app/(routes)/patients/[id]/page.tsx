import { instance } from "@/lib/instance";

import { Patient } from "@/types";
import PatientDetailView from "./_components";

type Props = {
  params: Promise<{ id: string }>;
};

async function PatientDetailPage({ params }: Props) {
  const { id } = await params;

  const res = await instance.get(`/patients/${id}`);

  const patient = res.data as Patient;

  return <PatientDetailView patient={patient} />;
}

export default PatientDetailPage;
