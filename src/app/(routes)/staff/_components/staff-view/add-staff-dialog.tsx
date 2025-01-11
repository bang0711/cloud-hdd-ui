"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";
import { instance } from "@/lib/instance";
import axios from "axios";
import { uploadToS3 } from "@/lib/upload";

const roles = ["Doctor", "Nurse", "Specialist", "Technician"];

type Props = {
  departmentId?: string; // Optional prop for pre-selected department
};

function AddStaffDialog({ departmentId }: Props) {
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    jobType: "Doctor",
    salary: 0,
    departmentId: departmentId || "",
    image: "", // Add image URL field
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Fetch departments from the backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_GATE_WAY!);
        setDepartments(res.data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Update formData.departmentId if departmentId prop changes
  useEffect(() => {
    if (departmentId) {
      setFormData((prev) => ({ ...prev, departmentId }));
    }
  }, [departmentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!file) {
      alert("Please select an image to upload.");
      setLoading(false);
      return;
    }

    try {
      // Upload image to S3
      const imageRes = await uploadToS3(file);

      // Prepare the payload
      const payload = {
        ...formData,
        image: imageRes.url, // Include the image URL
      };

      // Submit form data with image URL
      const res = await instance.post("/staff", payload);

      if (res.status === 201) {
        setOpen(false);
        router.refresh(); // Refresh the page to reflect the new staff member
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Staff Member</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
          <DialogDescription>Enter the staff member&apos;s information below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Avatar Upload */}
            <div className="flex justify-center">
              <label className="relative cursor-pointer">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={file ? URL.createObjectURL(file) : formData.image} />
                  <AvatarFallback>
                    <ImagePlus className="h-8 w-8 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      setFile(files[0]);
                    }
                  }}
                />
              </label>
            </div>

            {/* First Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                className="col-span-3"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                className="col-span-3"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="text-right">
                Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                className="col-span-3"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            {/* Job Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jobType" className="text-right">
                Job Type
              </Label>
              <Select
                value={formData.jobType}
                onValueChange={(value) => handleSelectChange("jobType", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Salary */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary" className="text-right">
                Salary
              </Label>
              <Input
                id="salary"
                type="number"
                className="col-span-3"
                placeholder="Enter salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>

            {/* Department */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="departmentId" className="text-right">
                Department
              </Label>
              <Select
                value={formData.departmentId}
                onValueChange={(value) => handleSelectChange("departmentId", value)}
                disabled={!!departmentId} // Disable dropdown if departmentId is provided
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue
                    placeholder={
                      departmentId
                        ? departments.find((dept) => dept.id === departmentId)?.name ||
                          "Select department"
                        : "Select department"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Staff Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddStaffDialog;
