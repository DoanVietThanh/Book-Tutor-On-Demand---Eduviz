import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const WelcomePage = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Button asChild variant={"outline"}>
        <Link href="/home">Welcome to EduViz</Link>
      </Button>
    </div>
  );
};

export default WelcomePage;
