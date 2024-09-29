"use client";
import { getCourseByMentorId } from "@/actions/course/get-course-by-mentorId";
import CreateClassDialog from "@/components/dialogs/create-class-dialog";
import SearchClass from "@/components/search-class";
import { Badge } from "@/components/ui/badge";
import { useAuthContext } from "@/context/auth-provider";
import { formatStartDate } from "@/lib/utils";
import { Course } from "@/types/course";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ClassPage = () => {
  const { user, accessToken } = useAuthContext();
  const router = useRouter();
  const [coursesList, setCoursesList] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCourseByMentorId(user?.mentorId, accessToken);

        if (!res.success) {
          toast.error("Get courses failed");
          return;
        }

        setCoursesList(res?.result?.listRelativeCourse as Course[]);
      } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
      }
    }
    fetchData();
  }, []);

  console.log({ courses: coursesList });

  return (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <SearchClass />
        <CreateClassDialog />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {coursesList?.map((courseItem, index) => (
          <div
            key={index}
            onClick={() => router.push(`/tutor/classes/${index + 1}`)}
            className="flex cursor-pointer rounded-md border bg-white p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-105"
          >
            <Image
              src={courseItem?.picture || "/assets/avatar-tutor.png"}
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-md"
            />
            <div className="flex-1 flex flex-col items-end justify-between h-full">
              <p className="font-semibold">{courseItem?.courseName}</p>
              <Badge variant={"green"}>{courseItem?.subjectName}</Badge>
              <p>{courseItem?.numOfStudents} students</p>
              <p className="text-sm">
                📅 {formatStartDate(courseItem?.startDate)}{" "}
                <Badge variant={"secondary"}>{courseItem?.duration} month</Badge>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassPage;
