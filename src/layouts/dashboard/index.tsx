"use client";

import React, { useState } from "react";

import Sidebar from "./sidebar";
import TopBar from "./top-bar";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Props = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden w-64 border-r bg-white md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="w-64 p-0">
            {/* For accessible bugs */}
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <Sidebar />
          </SheetContent>
        </Sheet>

        <div className="flex-1">
          <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
          <main className="space-y-4 p-4 md:space-y-6 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
