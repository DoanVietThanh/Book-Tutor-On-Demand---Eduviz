"use client";
import { getCourseByMentorId } from "@/actions/course/get-course-by-mentorId";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthContext } from "@/context/auth-provider";
import { Course } from "@/types/course";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

type ClassDetailLayoutProps = {
  children: ReactNode;
  params: { classId: string };
};

const ClassDetailLayout = ({ children, params }: ClassDetailLayoutProps) => {
  const router = useRouter();
  const { user, accessToken } = useAuthContext();
  const [coursesList, setCoursesList] = useState<Course[]>([]);

  // Ensure user is logged in before accessing user properties
  useEffect(() => {
    async function fetchData() {
      try {
        if (user && user.mentorId) {
          const res = await getCourseByMentorId(user.mentorId, accessToken);
          if (!res.success) {
            toast.error("Get courses failed");
            return;
          }
          setCoursesList(res?.result?.listRelativeCourse as Course[]);
        }
      } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
      }
    }

    if (user && accessToken) {
      fetchData();
    }
  }, [user, accessToken]);

  return (
    <div className="overflow-y-auto p-4">
      <div className="flex justify-between items-center ">
        <Select
          onValueChange={(value) => {
            router.push(`/tutor/classes/${value}`);
          }}
        >
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Move to other courses" />
          </SelectTrigger>
          <SelectContent>
            {coursesList.map((course) => (
              <SelectItem key={course.courseId} value={course.courseId}>
                {course.courseName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-8">
          <Button asChild variant={"secondary"}>
            <Link href={`/tutor/classes/${params.classId}`}>Overview</Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href={`/tutor/classes/${params.classId}/post`}>Post</Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href={`/tutor/classes/${params.classId}/quizz`}>Quiz</Link>
          </Button>
          <Button asChild variant={"destructive"}>
            <Link href={`/tutor/classes/${params.classId}/result`}>Result test</Link>
          </Button>
        </div>
      </div>
      <div className="pt-2 min-h-[100vh]">{children}</div>
    </div>
  );
};

export default ClassDetailLayout;
