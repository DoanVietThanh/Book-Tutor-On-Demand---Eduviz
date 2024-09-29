import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

const StudentProfile = () => {
  return (
    <div className="p-4 min-h-[100vh] bg-slate-50 overflow-y-auto">
      <div className="bg-white p-4 rounded-lg">
        <section className="relative font-semibold">
          <div className="relative my-4 flex h-[440px] w-full items-center justify-center overflow-hidden rounded-3xl text-3xl shadow-lg">
            <Image src="/assets/background.jpg" alt="banner" fill />
          </div>
          <Avatar className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 border-8 rounded-full border-white">
            <AvatarImage
              src="https://github.com/shadcn.png"
              width={100}
              height={100}
              className="rounded-full overflow-hidden"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </section>
        <section className="container flex flex-col gap-4 mt-14 font-semibold text-xl text-center">
          <p className="flex items-center justify-center gap-2">
            <User /> Thanh Doan
          </p>
        </section>
      </div>
    </div>
  );
};

export default StudentProfile;
