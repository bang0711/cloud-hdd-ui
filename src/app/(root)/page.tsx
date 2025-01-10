import React from "react";
import { getServerSession } from "next-auth";

import SignIn from "./_components/sign-in";
import SignOut from "./_components/sign-out";

import { authOptions } from "../api/auth/[...nextauth]/route";

async function Homepage() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session) {
    return <SignOut />;
  }
  return <SignIn />;
}

export default Homepage;
