import DepartmentView from "@/app/(root)/_components/department-view";
import { instance } from "@/lib/instance";
import { DepartmentRepsonse } from "@/types";

async function DepartmentPage() {
  const res = await instance.get("/department");

  const { data } = res;

  const departmentsResponse: DepartmentRepsonse = data;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold md:text-2xl">Departments</h2>
      <DepartmentView departments={departmentsResponse.data} />
    </div>
  );
}

export default DepartmentPage;
