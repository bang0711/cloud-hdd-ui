import { instance } from "@/lib/instance";
import StaffView from "./_components/staff-view";
import { StaffResponse } from "@/types";

type Props = {
  searchParams: Promise<{
    department: string;
  }>;
};

async function StaffPage({ searchParams }: Props) {
  const { department } = await searchParams;

  const res = await instance.get("/staff", {
    params: {
      department: department ? department : "All",
    },
  });

  const staffRes = res.data as StaffResponse;

  const { data } = staffRes;

  const currentDepartment = department ? department : "All";
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold md:text-2xl">Staff</h2>
      <StaffView staff={data} currentDepartment={currentDepartment} />
    </div>
  );
}

export default StaffPage;
