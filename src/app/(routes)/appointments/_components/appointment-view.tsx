"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { appointments } from "@/lib/constants";

import BookAppointmentDialog from "../../../../components/shared/book-appointment-dialog";

import { format } from "date-fns";

const getStatusColor = (status: Appointment["status"]) => {
  const colors = {
    scheduled: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return colors[status];
};

function AppointmentView() {
  const [date, setDate] = useState<Date>(new Date());
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment>();

  const appointmentsForDate = appointments.filter(
    (apt) => format(apt.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  const handleCancelAppointment = (appointment: Appointment) => {
    console.log("Cancelling appointment:", appointment);
    // In a real app, this would make an API call to cancel the appointment
    setAppointmentToCancel(undefined);
  };
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold md:text-2xl">Appointments</h2>
      <div className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold md:text-2xl">Appointments</h2>
          <BookAppointmentDialog />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[350px_1fr]">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="w-full rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                Appointments for {format(date, "MMMM d, yyyy")}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {appointmentsForDate.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">
                  No appointments scheduled for this date
                </p>
              ) : (
                appointmentsForDate.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                          <div className="flex -space-x-4">
                            <Avatar className="border-2 border-background">
                              <AvatarImage src={appointment.patient.avatar} />
                              <AvatarFallback>
                                {appointment.patient.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <Avatar className="border-2 border-background">
                              <AvatarImage src={appointment.doctor.avatar} />
                              <AvatarFallback>
                                {appointment.doctor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <div className="font-medium">
                              {appointment.patient.name} with {appointment.doctor.name}
                            </div>

                            <div className="text-sm text-muted-foreground">
                              {appointment.type} • {appointment.doctor.department}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
                          <div className="order-1 text-sm font-medium sm:order-none">
                            {appointment.timeRange.start} - {appointment.timeRange.end}
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>

                            {appointment.status === "scheduled" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-red-500 hover:bg-red-50 hover:text-red-600 sm:w-auto"
                                onClick={() => setAppointmentToCancel(appointment)}
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <AlertDialog
          open={!!appointmentToCancel}
          onOpenChange={() => setAppointmentToCancel(undefined)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this appointment? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="flex-col gap-2 sm:flex-row sm:gap-0">
              <AlertDialogCancel className="w-full sm:w-auto">
                No, keep appointment
              </AlertDialogCancel>

              <AlertDialogAction
                className="w-full bg-red-500 hover:bg-red-600 sm:w-auto"
                onClick={() => appointmentToCancel && handleCancelAppointment(appointmentToCancel)}
              >
                Yes, cancel appointment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default AppointmentView;
