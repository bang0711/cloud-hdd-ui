"use client";

import { doctors } from "@/lib/constants";

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
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { format } from "date-fns";

import { cn, generateTimeRanges } from "@/lib/utils";

type Props = {
  doctorId?: string;
  doctorName?: string;
};

interface Patient {
  id: string;
  name: string;
  avatar: string;
}

const patients: Patient[] = [
  {
    id: "P001",
    name: "John Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "P002",
    name: "Emma Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
];

function BookAppointmentDialog({ doctorId, doctorName }: Props) {
  const [selectedDoctor, setSelectedDoctor] = useState<string>(doctorId || "");
  const [selectedPatient, setSelectedPatient] = useState<string>("");

  const [date, setDate] = useState<Date>();

  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>();

  const timeRanges = date && selectedDoctor ? generateTimeRanges(date, selectedDoctor) : [];

  const doctor = doctors.find((d) => d.id === selectedDoctor);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">Book Appointment</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Book Appointment
            {doctorName ? ` with ${doctorName}` : ""}
          </DialogTitle>

          <DialogDescription>
            Select a patient, date, and time for the appointment.
          </DialogDescription>
        </DialogHeader>

        {!doctorId && (
          <div className="mb-4 grid grid-cols-1 items-start gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
            <Label htmlFor="doctor" className="text-right">
              Doctor
            </Label>

            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>

              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id} className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={doctor.avatar} />
                        <AvatarFallback>
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {doctor.name} - {doctor.department}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="mb-4 grid grid-cols-1 items-start gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
          <Label htmlFor="patient" className="text-right">
            Patient
          </Label>

          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>

            <SelectContent>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={patient.avatar} />
                      <AvatarFallback>
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    {patient.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>

          {date && selectedDoctor && (
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">
                  Available Times for {format(date, "MMMM d, yyyy")}
                </h4>

                {doctor && (
                  <p className="mb-4 text-sm text-muted-foreground">
                    {format(date, "EEEE")}: {doctor.schedule[format(date, "EEEE").toLowerCase()]}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {timeRanges.length > 0 ? (
                  timeRanges.map((range) => (
                    <Button
                      key={`${range.start}-${range.end}`}
                      variant={selectedTimeRange?.start === range.start ? "default" : "outline"}
                      className={cn(
                        "justify-start",
                        !range.available && "cursor-not-allowed opacity-50"
                      )}
                      disabled={!range.available}
                      onClick={() => setSelectedTimeRange(range)}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span>
                          {range.start} - {range.end}
                        </span>
                      </div>
                    </Button>
                  ))
                ) : (
                  <p className="col-span-2 py-4 text-center text-muted-foreground">
                    No available slots for this date
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            disabled={!date || !selectedTimeRange || !selectedPatient || !selectedDoctor}
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointmentDialog;
