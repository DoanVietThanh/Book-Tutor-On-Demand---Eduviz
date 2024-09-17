import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import React from "react";

const StudentProfile = () => {
  return (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto">
      <div>
        <h1 className="bg-white p-4 rounded-lg font-semibold">
          <div className="relative my-4 flex h-[440px] w-full items-center justify-center overflow-hidden rounded-3xl text-3xl shadow-lg">
            <Image src="/assets/background.jpg" alt="banner" fill />
          </div>
          <div>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                width={100}
                height={100}
                className="rounded-full overflow-hidden"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>Thanh Doan</p>
          </div>
        </h1>
      </div>
    </div>
  );
};

export default StudentProfile;
