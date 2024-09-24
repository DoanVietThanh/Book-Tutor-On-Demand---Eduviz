import BrowseFooter from "@/layouts/browse/browse-footer";
import React from "react";
import BreadcumCourse from "./_components/breadcrum-course";
import { getCourseDetail } from "@/actions/course/get-course-detail";
import InfoCourse from "./_components/info-course";
import { getRelatedCourses } from "@/actions/course/get-related-courses";

type CourseDetailProps = {
  params: {
    courseId: string;
  };
};

const CourseDetail = async ({ params }: CourseDetailProps) => {
  const courseDetail = await getCourseDetail(params.courseId);
  const relatedCourses = (await getRelatedCourses(params.courseId)) || [];

  return (
    <div>
      <div className="container my-4 flex flex-col gap-8">
        <BreadcumCourse tutorName={courseDetail.mentorName} />
        <InfoCourse courseDetail={courseDetail} relatedCourses={relatedCourses} />
      </div>
      <BrowseFooter />
    </div>
  );
};

export default CourseDetail;
