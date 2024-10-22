import { getCourseClassDetail } from "@/actions/course/get-course-class-detail";
import { getCourseDetail } from "@/actions/course/get-course-detail";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatStartDate } from "@/lib/utils";
import { Course } from "@/types/course";
import Image from "next/image";

type TutorClassDetailProps = {
  params: { classId: string };
};

const TutorClassDetail = async ({ params }: TutorClassDetailProps) => {
  const courseDetail: Course = await getCourseDetail(params.classId);

  const courseClassDetail = await getCourseClassDetail(params.classId);

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
            priority
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
              <div className="text-md ml-2">{courseDetail.duration} months</div>
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
            <TableHead>Num of tests</TableHead>
            <TableHead className="text-right">Average Point</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseClassDetail?.studentInfoList?.map((student: any, index: number) => (
            <TableRow key={student?.studentId}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.numOfTry}</TableCell>
              <TableCell className="text-right">{student?.score || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TutorClassDetail;
