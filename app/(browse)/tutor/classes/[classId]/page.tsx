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

  if (!courseDetail) {
    return <div>Course not found</div>;
  }
  console.log("🚀 ~ TutorClassDetail ~ courseDetail:", courseDetail);

  return (
    <div className="pt-4 overflow-y-auto">
      <div>Course ID {params.classId}</div>

      <div className="flex justify-center">
        <section className="w-1/2 flex items-center justify-center  gap-8 p-8 bg-slate-50 rounded-md overflow-hidden shadow-lg">
          <Image src={courseDetail.picture} alt="banner" width={180} height={300} className="rounded-md shadow-md" />
          <div>
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
          </div>
        </section>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">STT</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="text-right">Average Point</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>20</TableCell>
              <TableCell className="text-right">5.8</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TutorClassDetail;
