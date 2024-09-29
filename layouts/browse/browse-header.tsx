"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLES } from "@/enum";
import { studentDropdownRoutes } from "@/constants/student-routes";
import { tutorDropdownRoutes } from "@/constants/tutor-routes";
import { useAuthContext } from "@/context/auth-provider";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import UpgradePremiumDialog from "@/components/dialogs/upgrade-premium-dialog";

const BrowseHeader = () => {
  const router = useRouter();
  const { role, user, isLoadingAuth } = useAuthContext();

  if (isLoadingAuth) return null;

  const handleLogout = () => {
    localStorage.clear();
    router.push("/signin");
  };

  return (
    <div className="fixed z-50 flex w-full items-center justify-between gap-4 p-2 border bg-white font-semibold shadow-lg">
      <div className="flex items-center gap-8">
        <Link href="/home" className="flex items-center gap-4">
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={30}
            height={30}
            className="rounded-xl transition-all duration-300 ease-in-out hover:scale-110"
          />
          <div className="text-[#7A37FF]">Home Page</div>
        </Link>
      </div>
      <div className="mr-8 flex items-center gap-4">
        {user && role == ROLES.MENTOR && <UpgradePremiumDialog />}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center justify-center gap-2 h-full">
              <User /> {user?.name}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-32">
            {role == ROLES.MENTOR &&
              tutorDropdownRoutes.map((route) => (
                <Link key={route.name} href={route.href}>
                  <DropdownMenuItem>{route.name}</DropdownMenuItem>
                </Link>
              ))}

            {role == ROLES.STUDENT &&
              studentDropdownRoutes.map((route) => (
                <Link key={route.name} href={route.href}>
                  <DropdownMenuItem>{route.name}</DropdownMenuItem>
                </Link>
              ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BrowseHeader;
