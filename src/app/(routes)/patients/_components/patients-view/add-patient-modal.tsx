"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

function AddPatientModal() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "Male",
    bloodType: "O+",
    cid: "",
    image: "", // Add imageUrl to formData
  });
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Get the pre-signed URL for S3 upload
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });

      if (!response.ok) {
        throw new Error("Failed to get pre-signed URL.");
      }

      const { url, fields } = await response.json();

      // Step 2: Upload the image to S3
      const formDataS3 = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formDataS3.append(key, value as string);
      });
      formDataS3.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formDataS3,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image to S3.");
      }

      // Step 3: Get the uploaded image URL
      const imageUrl = `${url}/${fields.key}`;

      // Step 4: Submit the form data with the image URL to your backend
      const res = await instance.post("/patients", {
        ...formData,
        image: imageUrl,
      });

      console.log("Response:", res);

      if (res.status === 201) {
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Patient</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>Enter the patient&apos;s information below.</DialogDescription>
        </DialogHeader>

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
          <form className="grid gap-4 py-4" action="" onSubmit={handleSubmit}>
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
              />
            </div>

            {/* Gender */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Blood Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bloodType" className="text-right">
                Blood Type
              </Label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, bloodType: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CID */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cid" className="text-right">
                CID
              </Label>
              <Input
                id="cid"
                className="col-span-3"
                placeholder="Enter CID"
                value={formData.cid}
                onChange={handleChange}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Patient"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddPatientModal;
