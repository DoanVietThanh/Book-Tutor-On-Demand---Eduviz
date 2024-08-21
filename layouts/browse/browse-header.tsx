import Image from "next/image";
import Link from "next/link";
import React from "react";

const BrowseHeader = () => {
  return (
    <div className="fixed z-50 flex w-full items-center justify-between gap-4 border bg-white p-4 font-semibold shadow-lg">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="rounded-xl transition-all duration-300 ease-in-out hover:scale-110"
          />
          <div className="text-[#7A37FF]">Home Page</div>
        </Link>
      </div>
    </div>
  );
};

export default BrowseHeader;
