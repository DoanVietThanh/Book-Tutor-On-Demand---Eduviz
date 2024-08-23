"use client";
import { tutorDropdownRoutes } from "@/constants/tutor-routes";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const TutorSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        {tutorDropdownRoutes.map((route) => (
          <div
            key={route.id}
            onClick={() => router.push(route.href)}
            className={`text-md font-semibold p-4 rounded-md cursor-pointer hover:bg-slate-300 ${
              route.href === pathname ? "bg-slate-300 text-purple-700" : "bg-slate-100"
            }`}
          >
            {route.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorSidebar;
