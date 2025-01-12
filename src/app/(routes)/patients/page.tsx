import { instance } from "@/lib/instance";

import PatientsView from "./_components/patients-view";
import PatientPagination from "./_components/patient-pagination";

import { PatientResponse } from "@/types";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    page: string;
  }>;
};

async function PatientsPage({ searchParams }: Props) {
  const { page } = await searchParams;

  const currentPage = page ? parseInt(page, 10) : 1;

  if (currentPage < 1) {
    redirect("/patients");
  }

  const res = await instance.get("/patients", {
    params: {
      page: currentPage,
    },
  });

  const patientsRes = res.data as PatientResponse;

  const { data, pagination } = patientsRes;

  if (currentPage > pagination.totalPages) {
    redirect("/patients");
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold md:text-2xl">Patients</h2>
      <PatientsView patients={data} />
      <PatientPagination currentPage={pagination.page} totalPages={pagination.totalPages} />
    </div>
  );
}

export default PatientsPage;
