import { Address, PatientAllergy } from "@/types";

type Props = {
  address: Address;
  patientAllergies: PatientAllergy[];
};

function PatientOverview({ address, patientAllergies }: Props) {
  return (
    <>
      {address && (
        <>
          <div>
            <span className="font-medium">Address:</span> {address.addressLine}, {address.ward}
          </div>
          <div>
            <span className="font-medium">City:</span> {address.city}, {address.district}
          </div>
        </>
      )}

      <div>
        <span className="font-medium">Allergies:</span>
        <ul className="ml-4 mt-1 list-inside list-disc">
          {patientAllergies.map((allergy) => (
            <li key={allergy.allergy.allergen}>
              {allergy.allergy.allergen} <span className="font-semibold">({allergy.severity})</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default PatientOverview;
