"use client";

import { Button } from "@/components/ui/button";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Settings, LogOut } from "lucide-react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { Fragment } from "react";

type Props = {
  className?: string;
};

function Sidebar({ className }: Props) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className={cn("min-h-screen pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Link href={"/"}>
            <h2 className="mb-2 px-4 text-lg font-semibold">Hospital Admin</h2>
          </Link>

          <div className="flex flex-col space-y-1">
            {ROUTES.map((route, index) => (
              <Fragment key={index}>
                {/* @ts-expect-error: route.href is a valid path */}
                <Link href={`/${route.href}`} prefetch={false}>
                  <Button
                    variant={isActive(`/${route.href}`) ? "secondary" : "ghost"}
                    className="w-full justify-start font-bold"
                    //   onClick={() => navigate("/patients")}
                  >
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.title}
                  </Button>
                </Link>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <div className="flex flex-col space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <p>Logout</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
