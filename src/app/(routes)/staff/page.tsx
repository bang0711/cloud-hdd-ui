import { instance } from "@/lib/instance";

import StaffView from "./_components/staff-view";
import StaffPagination from "./_components/staff-pagination";

import { StaffResponse } from "@/types";

import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    department?: string;
    page?: string;
  }>;
};

async function StaffPage({ searchParams }: Props) {
  const { department, page } = await searchParams;

  const currentPage = page ? parseInt(page, 10) : 1;
  const currentDepartment = department ? department : "All";

  // Redirect if page is less than 1
  if (currentPage < 1) {
    redirect(`/staff?department=${currentDepartment}&page=1`);
  }

  // Fetch staff data
  const res = await instance.get("/staff", {
    params: {
      department: currentDepartment,
      page: currentPage,
    },
  });

  console.log(res.data);

  const staffRes = res.data as StaffResponse;

  const { data, pagination } = staffRes;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold md:text-2xl">Staff</h2>
      <StaffView staff={data} currentDepartment={currentDepartment} />
      <StaffPagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        currentDepartment={currentDepartment}
      />
    </div>
  );
}

export default StaffPage;
