import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
};

function PatientPagination({ currentPage, totalPages }: Props) {
  // Calculate if the buttons should be disabled
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="mt-3 flex items-center justify-end gap-3">
      {/* Previous Button */}
      <Link
        href={isPrevDisabled ? `/patients?page=1` : `/patients?page=${currentPage - 1}`}
        passHref
      >
        <Button disabled={isPrevDisabled}>
          <ArrowLeftCircle />
        </Button>
      </Link>

      {/* Next Button */}
      <Link
        href={
          isNextDisabled ? `/patients?page=${currentPage}` : `/patients?page=${currentPage + 1}`
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

export default PatientPagination;
