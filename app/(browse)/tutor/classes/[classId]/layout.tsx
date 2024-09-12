import SearchClass from "@/components/search-class";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";

type ClassDetailLayoutProps = {
  children: ReactNode;
  params: { classId: string };
};

const ClassDetailLayout = ({ children, params }: ClassDetailLayoutProps) => {
  return (
    <div className="px-4 overflow-y-auto">
      <div className="flex justify-between items-center border-b-2">
        <div>
          <SearchClass />
        </div>
        <div className="flex gap-8">
          <Button asChild variant={"secondary"}>
            <Link href={`/tutor/classes/${params.classId}`}>Overview</Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href={`/tutor/classes/${params.classId}/post`}>Post</Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href={`/tutor/classes/${params.classId}/quizz`}>Quiz</Link>
          </Button>
          <Button asChild variant={"destructive"}>
            <Link href={`/tutor/classes/${params.classId}/result`}>Result test</Link>
          </Button>
        </div>
      </div>
      <div className="pt-2 min-h-[100vh]">{children}</div>
    </div>
  );
};

export default ClassDetailLayout;
