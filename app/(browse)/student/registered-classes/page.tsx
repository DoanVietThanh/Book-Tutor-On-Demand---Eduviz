"use client";
import SearchClass from "@/components/search-class";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const StudentRegisteredClasses = () => {
  const router = useRouter();
  return (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto">
      <div className="flex justify-center">
        <SearchClass />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            onClick={() => router.push(`/student/registered-classes/${index + 1}`)}
            className="flex cursor-pointer rounded-md border bg-white p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-105"
          >
            <Image src={"/assets/avatar-tutor.png"} alt="Avatar" width={100} height={100} className="rounded-md" />
            <div className="flex-1 flex flex-col items-end justify-between h-full">
              <p className="font-semibold">Course Name {index + 1}</p>
              <Badge variant={"green"}>Hóa</Badge>
              <p>14 students</p>
              <p className="text-sm">
                📅 12/12/2024 <Badge variant={"secondary"}>3 month</Badge>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentRegisteredClasses;
