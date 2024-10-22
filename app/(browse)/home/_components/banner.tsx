import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative my-4 flex h-[440px] w-full items-center justify-center overflow-hidden rounded-3xl text-3xl shadow-lg">
      <Image src="/assets/banner.jpg" alt="banner" fill priority />
    </div>
  );
};

export default Banner;
