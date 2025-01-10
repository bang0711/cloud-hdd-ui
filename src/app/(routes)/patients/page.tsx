import { instance } from "@/lib/instance";

import PatientsView from "./_components/patients-view";

import { PatientResponse } from "@/types";

async function PatientsPage() {
  const res = await instance.get("/patients");

  const patientsRes = res.data as PatientResponse;

  const { data } = patientsRes;
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold md:text-2xl">Patients</h2>
      <PatientsView patients={data} />
    </div>
  );
}

export default PatientsPage;
