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
