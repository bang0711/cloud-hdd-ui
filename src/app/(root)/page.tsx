import React from "react";
import { getServerSession } from "next-auth";

import SignIn from "./_components/sign-in";

import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOption";

async function Homepage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/patients");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}

export default Homepage;
