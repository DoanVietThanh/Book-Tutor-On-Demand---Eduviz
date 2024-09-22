"use client";
import CreateClassDialog from "@/components/dialogs/create-class-dialog";
import SearchClass from "@/components/search-class";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ClassPage = () => {
  const router = useRouter();
  return (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <SearchClass />
        <CreateClassDialog />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {Array.from({ length: 11 }).map((_, index) => (
          <div
            key={index}
            onClick={() => router.push(`/tutor/classes/${index + 1}`)}
            className="flex cursor-pointer rounded-md border bg-white p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-105"
          >
            <Image src="/assets/avatar-tutor.png" alt="Avatar" width={100} height={100} className="rounded-md" />
            <div className="flex-1 flex flex-col items-end justify-between h-full">
              <p className="font-semibold">Class Name {index + 1}</p>
              <p>{1 + Math.floor(Math.random() * 50)} students</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassPage;
