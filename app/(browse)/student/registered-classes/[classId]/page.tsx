"use client";

import { getCourseClassDetail } from "@/actions/course/get-course-class-detail";
import { getCourseDetail } from "@/actions/course/get-course-detail";
import { getPersonalQuizScore } from "@/actions/quiz/get-personal-score";
import { getQuizScore } from "@/actions/quiz/get-quiz-score";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuthContext } from "@/context/auth-provider";
import { formatStartDate } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type TutorClassDetailProps = {
  params: { classId: string };
};

const TutorClassDetail = ({ params }: TutorClassDetailProps) => {
  const { user } = useAuthContext();

  const [courseDetail, setCourseDetail] = useState<any>();
  const [courseClassDetail, setCourseClassDetail] = useState<any>();
  const [quizScore, setQuizScore] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      const courseDetail = await getCourseDetail(params.classId);
      const courseClassDetail = await getCourseClassDetail(params.classId);
      const quizScore = await getPersonalQuizScore(user.userId, params.classId);

      setQuizScore(quizScore);
      setCourseDetail(courseDetail);
      setCourseClassDetail(courseClassDetail);
    }
    fetchData();
  }, []);

  if (!courseDetail || !courseClassDetail) {
    return <div>Course not found</div>;
  }

  return (
    <div className="pt-4 overflow-y-auto">
      <div className="flex justify-center mb-8">
        <section className="w-1/2 flex items-center justify-center  gap-8 p-8 bg-slate-50 rounded-md overflow-hidden shadow-lg">
          <Image
            src={courseDetail.picture || "/assets/avatar-tutor-2.png"}
            alt="banner"
            width={240}
            height={400}
            className="rounded-md shadow-md"
          />
          <div>
            <div className="text-2xl font-semibold"> {courseDetail.courseName}</div>
            <div>{courseDetail.weekSchedule.toString()}</div>
            <div>🧑‍🎓 {courseDetail.numOfStudents} (students)</div>
            <div className="font-semibold">
              ⏰ {courseDetail.beginingClass} - {courseDetail.endingClass}
            </div>
            <div className="flex items-center">
              📅 From {formatStartDate(courseDetail.startDate)}
              <Badge variant={"secondary"} className="text-md ml-2">
                {courseDetail.duration} months
              </Badge>
            </div>
            <Badge variant={"green"}>
              <a href={`https://${courseClassDetail?.meetUrl}`} target="_blank" rel="noopener noreferrer">
                {courseClassDetail?.meetUrl}
              </a>
            </Badge>
          </div>
        </section>
      </div>

      <Table>
        <TableCaption>A list of registered students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">STT</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-right">Point</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizScore?.map((quiz: any, index: number) => (
            <TableRow key={quiz?.quizId}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{quiz?.duration}</TableCell>
              <TableCell className="text-right">{quiz?.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TutorClassDetail;
