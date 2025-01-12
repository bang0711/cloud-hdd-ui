import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  currentDepartment: string;
};

function StaffPagination({ currentPage, totalPages, currentDepartment }: Props) {
  // Calculate if the buttons should be disabled
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="mt-3 flex items-center justify-end gap-3">
      {/* Previous Button */}
      <Link
        href={
          isPrevDisabled
            ? `/staff?department=${currentDepartment}&page=1`
            : `/staff?department=${currentDepartment}&page=${currentPage - 1}`
        }
        passHref
      >
        <Button disabled={isPrevDisabled}>
          <ArrowLeftCircle />
        </Button>
      </Link>

      {/* Next Button */}
      <Link
        href={
          isNextDisabled
            ? `/staff?department=${currentDepartment}&page=${currentPage}`
            : `/staff?department=${currentDepartment}&page=${currentPage + 1}`
        }
        passHref
      >
        <Button disabled={isNextDisabled}>
          <ArrowRightCircle />
        </Button>
      </Link>
    </div>
  );
}

export default StaffPagination;
