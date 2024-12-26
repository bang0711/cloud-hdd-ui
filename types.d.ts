type Department = {
  id: string;
  name: string;
  manager: {
    name: string;
    avatar: string;
    role: string;
  };
  staffCount: number;
  status: "active" | "busy" | "maintenance";
};

type Patient = {
  id: string;
  name: string;
  age: number;
  condition: "stable" | "critical" | "recovering";
  room: string;
  avatar: string;
  admissionDate: string;
};

type Staff = {
  id: string;
  name: string;
  role: string;
  department: string;
  status: "on-duty" | "off-duty" | "on-leave";
  avatar: string;
  specialty: string;
  isManager?: boolean;
  managingDepartment?: string;
};

type Shift = {
  id: string;
  staffId: string;
  date: Date;
  shift: "morning" | "afternoon" | "night";
};

interface StaffShift extends Staff {
  shifts: Shift[];
}

type TimeRange = {
  start: string;
  end: string;
  available: boolean;
  reason?: string;
};

type Doctor = {
  id: string;
  name: string;
  department: string;
  avatar: string;
  schedule: {
    [key: string]: string;
  };
};

type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  timeRange: {
    start: string;
    end: string;
  };
  status: "scheduled" | "completed" | "cancelled";
  type: string;
  patient: {
    name: string;
    avatar: string;
  };
  doctor: {
    name: string;
    avatar: string;
    department: string;
  };
};

type Bill = {
  id: string;
  patientName: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
  description: string;
};

type Medicine = {
  id: string;
  name: string;
  stock: number;
  category: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
  price: number;
  image: string;
};
