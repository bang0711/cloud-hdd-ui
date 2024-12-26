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
