export type PatientResponse = {
  data: Patient[];
  pagination: Pagination;
};

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  bloodType: string;
  cid: string;
  address: Address;
  insurance: Insurance;
  treatmentHistories: TreamentHistory[];
  patientAllergies: PatientAllergy[];
  appointments: Appointment[];
};

export type Address = {
  id: string;
  addressLine: string;
  ward: string;
  district: string;
  city: string;
};

export type Insurance = {
  code: string;
  expiredDate: string;
};

export type PatientAllergy = {
  severity: string;
  allergy: Allergy;
};
export type Allergy = {
  allergen: string;
  category: string;
  symptoms: string;
};

export type Appointment = {
  id: string;
  purpose: string;
  status: string;
  startTime: string;
  endTime: string;
  staff: Staff;
};

export type Staff = {
  id: string;
  firstName: string;
  lastName: string;
  jobType: string;
};

export type TreamentHistory = {
  id: string;
  type: string;
  disease: string;
  visitedDate: string;
  procedures: Procedure[];
};

export type Procedure = {
  id: string;
  medicine: Medicine;
  staff: Staff;
};

export type Pagination = {
  total: number;
  page: number;
  count: number;
  totalPages: number;
};
