"use client";
import { getCourseByMentorId } from "@/actions/course/get-course-by-mentorId";
import { Button } from "@/components/ui/button";
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

  if (!user) {
    return router.push("/signin");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCourseByMentorId(user.mentorId, accessToken);
        if (!res.success) {
          toast.error("Get courses failed");
          return;
        }
        setCoursesList(res?.result?.listRelativeCourse as Course[]);
      } catch (error: any) {
        console.log(error?.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="overflow-y-auto p-4">
      <div className="flex justify-between items-center ">
        <div></div>
        <div className="flex gap-8">
          <Button asChild variant={"secondary"}>
            <Link href={`/student/registered-classes/${params.classId}`}>Overview</Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href={`/student/registered-classes/${params.classId}/post`}>Post</Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href={`/student/registered-classes/${params.classId}/quizz`}>Quiz</Link>
          </Button>
          <Button asChild variant={"destructive"}>
            <Link href={`/student/registered-classes/${params.classId}/result`}>Result test</Link>
          </Button>
        </div>
      </div>
      <div className="pt-2 min-h-[100vh]">{children}</div>
    </div>
  );
};

export default ClassDetailLayout;
