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
