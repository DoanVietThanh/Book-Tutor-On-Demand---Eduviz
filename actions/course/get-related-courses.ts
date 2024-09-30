"use server";

import { isBaseError } from "@/lib/utils";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;

export const getRelatedCourses = async (courseId: string) => {
  try {
    const response = await fetch(`${ServerURL}/course/relative-courses/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }).then((res) => res.json());
    return response?.result?.listRelativeCourse;
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
