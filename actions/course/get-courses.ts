"use server";

import { isBaseError } from "@/lib/utils";
import { Course } from "@/types/course";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;

export type ListCourseWithSubjects = { subjectName: string; listCourse: Course[] }[];

export const getCourses = async () => {
  try {
    const response = await fetch(`${ServerURL}/course`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }).then((res) => res.json());
    return response.result?.listCourseWithSubjects as ListCourseWithSubjects;
  } catch (error: any) {
    let messageError = "";
    if (!isBaseError(error) || error.statusCode === 500) {
      messageError = "Something went wrong";
    } else {
      messageError = error.message;
    }
    throw new Error(messageError);
  }
};
