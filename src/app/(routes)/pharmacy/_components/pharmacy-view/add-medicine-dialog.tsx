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

import { ImagePlus } from "lucide-react";

import { categories } from "@/lib/constants";

import Image from "next/image";

function AddMedicineDialog() {
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>(categories[0]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        alert("File size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Medicine</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Medicine</DialogTitle>
          <DialogDescription>Enter the medicine information below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            <div className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed hover:border-primary">
              {image ? (
                <Image
                  width={100}
                  height={100}
                  src={image}
                  alt="Medicine"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
              )}
              <Input
                type="file"
                accept="image/*"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" placeholder="e.g. Amoxicillin 500mg" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input id="stock" type="number" className="col-span-3" min="0" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price ($)
            </Label>
            <Input id="price" type="number" className="col-span-3" min="0" step="0.01" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Medicine</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddMedicineDialog;
