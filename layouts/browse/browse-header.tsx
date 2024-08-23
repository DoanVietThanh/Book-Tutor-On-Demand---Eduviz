"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { tutorDropdownRoutes } from "@/constants/tutor-routes";
import { useAuthContext } from "@/context/auth-provider";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BrowseHeader = () => {
  const { role, user, isLoadingAuth } = useAuthContext();
  console.log("🚀 ~ BrowseHeader ~ :", { role, user, isLoadingAuth });

  // if (isLoadingAuth) return null;

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
      <div className="mr-8 flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center justify-center gap-2 h-full">
              <User /> {user?.name}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-32">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {tutorDropdownRoutes.map((route) => (
              <Link key={route.name} href={route.href}>
                <DropdownMenuItem>{route.name}</DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BrowseHeader;
