import Link from "next/link";
import { Route } from "next";

import { Button } from "../ui/button";

import { ArrowLeft } from "lucide-react";

type Props = {
  href: Route;
  title: string;
};

function ReturnButton({ href, title }: Props) {
  return (
    <Link href={href}>
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> {title}
      </Button>
    </Link>
  );
}

export default ReturnButton;
