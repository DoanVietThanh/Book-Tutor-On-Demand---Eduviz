import { getCourses } from "@/actions/course/get-courses";
import { Badge } from "@/components/ui/badge";
import { formatStartDate } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CoursesList = async () => {
  const coursesList = await getCourses();

  if (!coursesList) return null;

  function isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <div>
      {coursesList?.map((courseItem: any) => (
        <div key={courseItem.subjectName} className="my-8">
          <section className="flex items-center justify-between">
            <p className="text-2xl font-semibold">
              {courseItem.subjectName} {`(${courseItem?.listCourse.length})`}
            </p>
          </section>

          <section className="my-4 grid gap-8 md:grid-cols-4">
            {courseItem?.listCourse?.map((course: any) => (
              <Link key={course.courseId} href={`/course/${course.courseId}`}>
                <div className="h-full flex cursor-pointer flex-col justify-between  gap-8 rounded-md border p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:font-semibold">
                  <div className="flex-1 flex items-center justify-center overflow-hidden">
                    <Image
                      src={isValidUrl(course.picture) ? course.picture : "/assets/avatar-tutor-2.png"}
                      alt="Avatar"
                      width={160}
                      height={160}
                      layout="intrinsic"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex flex-col justify-start gap-4 text-md">
                    <p className="text-xl font-semibold text-center">{course.courseName}</p>
                    <p className="flex items-center gap-2 text-sm justify-center font-semibold">
                      <User size={16} fill="#f59e0b" />
                      by {course.mentorName}
                    </p>
                    <div className="flex items-center gap-2 text-yellow-700 font-semibold">
                      <Image src="/icons/coin.png" width={24} height={24} className="object-cover" alt="coin" />
                      {course.price.toLocaleString()} / hour
                    </div>
                    <p className="flex justify-between font-medium">
                      <span>📅 {formatStartDate(course.startDate)}</span>
                      <Badge variant={"secondary"}>{course.duration} months</Badge>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </div>
      ))}
    </div>
  );
};

export default CoursesList;
