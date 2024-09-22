"use client";
import { ROLES } from "@/enum";
import { studentDropdownRoutes } from "@/constants/student-routes";
import { tutorDropdownRoutes } from "@/constants/tutor-routes";
import { useAuthContext } from "@/context/auth-provider";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const BrowserSidebar = () => {
  const { role, isLoadingAuth } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  if (isLoadingAuth) return null;
  let dropdownRoutes = role == ROLES.MENTOR ? tutorDropdownRoutes : studentDropdownRoutes;

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        {dropdownRoutes.map((route) => (
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

export default BrowserSidebar;
