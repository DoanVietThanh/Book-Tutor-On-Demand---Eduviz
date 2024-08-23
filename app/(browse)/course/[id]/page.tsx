import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BrowseFooter from "@/layouts/browse/browse-footer";

type CourseDetailPageProps = {
  params: {
    id: string;
  };
};

const CourseDetailPage = ({ params }: CourseDetailPageProps) => {
  return (
    <div>
      <div className="flex w-full flex-1 overflow-hidden">
        <div className="w-1/5 border p-8 text-2xl">
          <p className="text-center font-semibold">Filter</p>
          <Input type="text" placeholder="Search tutor name" className="my-4 w-full" />
          <div className="flex items-center gap-4">
            <Label>Year of Experience</Label>
            <Input type="number" placeholder="10" className="my-4 w-1/3" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#F5F7F8] p-8">
          <h1 className="text-3xl font-semibold">Course Name {params.id} </h1>
          <div className="my-8 grid gap-8 md:grid-cols-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <Link href={`/tutor/${index + 1}`} key={index}>
                <div
                  key={index}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-md border bg-white p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-105"
                >
                  <Image src="/assets/avatar-tutor.png" alt="Avatar" width={200} height={200} className="rounded-md" />
                  <p className="m-2 text-xl font-medium">Tutor Name {index + 1}</p>
                  <p className="text-sm text-muted-foreground">
                    Exp {index + 30} years - Age {index + 70}
                  </p>
                  <p className="my-2 text-yellow-500">Price $7 / hours</p>
                  <p className="my-2 flex items-center gap-2 text-sm font-medium text-[#f59e0b]">
                    <Star size={18} fill="#f59e0b" />
                    <Star size={18} fill="#f59e0b" />
                    <Star size={18} fill="#f59e0b" />
                    <Star size={18} fill="#f59e0b" />
                    <Star size={18} fill="#f59e0b" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Button>More</Button>
          </div>
        </div>
      </div>
      <BrowseFooter />
    </div>
  );
};

export default CourseDetailPage;
