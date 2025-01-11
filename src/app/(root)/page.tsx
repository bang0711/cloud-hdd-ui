import React from "react";
import { getServerSession } from "next-auth";

import SignIn from "./_components/sign-in";

import { authOptions } from "../api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";

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
