import { PatientsView } from "@/components/patients";

function PatientsPage() {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold md:text-2xl">Patients</h2>
      <PatientsView />
    </div>
  );
}

export default PatientsPage;
