"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const WelcomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, [router]);

  return (
    <div className="flex flex-1 items-center justify-center">
      {/* This button will still be available as a fallback or for testing */}
      <Button asChild variant={"outline"}>
        <Link href="/home">Welcome to EduViz</Link>
      </Button>
    </div>
  );
};

export default WelcomePage;
