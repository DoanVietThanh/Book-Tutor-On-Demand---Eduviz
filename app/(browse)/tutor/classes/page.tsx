"use client";

import { getCourseByMentorId } from "@/actions/course/get-course-by-mentorId";
import CreateClassDialog from "@/components/dialogs/create-class-dialog";
import { Badge } from "@/components/ui/badge";
import { useAuthContext } from "@/context/auth-provider";
import { formatStartDate } from "@/lib/utils";
import { Course } from "@/types/course";
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
          toast.error(res?.result?.message || "Get courses failed");
          return;
        }

        setCoursesList(res?.result?.listRelativeCourse as Course[]);
      } catch (error: any) {
        console.log(error);
      }
    }
    fetchData();
  }, [user?.mentorId, accessToken]);

  return (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto">
      <div className="w-full flex justify-end items-center mb-8">
        <CreateClassDialog />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {coursesList?.map((courseItem, index) => (
          <div
            key={index}
            onClick={() => router.push(`/tutor/classes/${courseItem.courseId}`)}
            className="flex cursor-pointer rounded-md border bg-white p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-105"
          >
            <img
              src={courseItem?.picture || "/assets/avatar-tutor.png"}
              alt="Avatar"
              className="rounded-md w-1/3 h-full object-cover"
            />
            <div className="flex-1 flex flex-col items-end justify-between h-full gap-2">
              <p className="font-semibold">{courseItem?.courseName}</p>
              <Badge variant={"green"}>{courseItem?.subjectName}</Badge>
              <p className="text-sm">{courseItem?.numOfStudents} students</p>
              <p className="text-sm">
                📅 {formatStartDate(courseItem?.startDate)} <span>{courseItem?.duration} month</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassPage;
