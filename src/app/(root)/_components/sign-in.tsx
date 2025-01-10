"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

function SignIn() {
  const handleSignIn = () => {
    signIn("cognito", {
      prompt: "select_account",
      callbackUrl: `${window.location.origin}/patients`,
    }); // Force re-authentication
  };

  return <Button onClick={handleSignIn}>SignIn</Button>;
}

export default SignIn;
