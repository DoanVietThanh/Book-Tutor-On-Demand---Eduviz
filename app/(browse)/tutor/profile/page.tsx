"use client";

import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuthContext } from "@/context/auth-provider";
import { formatStartDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import Image from "next/image";

const ProfilePage = () => {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <div className="p-4 min-h-[100vh] bg-slate-50 overflow-y-auto">
      <div className="bg-white p-4 rounded-lg">
        <section className="relative font-semibold">
          <div className="relative my-4 flex h-[440px] w-full items-center justify-center overflow-hidden rounded-3xl text-3xl shadow-lg">
            <Image src="/assets/background.jpg" alt="banner" fill priority />
          </div>
          <Avatar className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 border-4 rounded-full border-white">
            <AvatarImage
              src="https://github.com/shadcn.png"
              width={0} // Adjusted size
              height={0} // Adjusted size
              className="rounded-full overflow-hidden h-32 w-32"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </section>
        <section className="container flex flex-col gap-4 mt-14 font-semibold text-xl text-center">
          <div className="flex items-center justify-center gap-2">
            <User /> Thanh Doan
          </div>
          {!user?.isVip && (
            <div>
              <Badge variant={"green"}> Normal Account </Badge>
            </div>
          )}
          {user?.isVip && (
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant={"yellow"}>⭐ VIP ACCOUNT ⭐</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Expire Date: {formatStartDate(user?.expiredDate.toString())}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
