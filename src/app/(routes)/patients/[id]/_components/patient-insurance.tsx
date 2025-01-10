import { Insurance } from "@/types";
import React from "react";

type Props = {
  insurance: Insurance;
};

function PatientInsurance({ insurance }: Props) {
  return (
    <>
      {insurance && (
        <>
          <div>
            <span className="font-medium">Code:</span> {insurance.code}
          </div>
          <div>
            <span className="font-medium">Expired Date:</span>{" "}
            {new Date(insurance.expiredDate).toLocaleDateString()}
          </div>
        </>
      )}
    </>
  );
}

export default PatientInsurance;
