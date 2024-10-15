"use server";

import { isBaseError } from "@/lib/utils";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;

export const getRegisteredClasses = async (studentId: string, accessToken: string) => {
  try {
    const response = await fetch(`${ServerURL}/course/student/${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }).then((res) => res.json());
    return response.result?.listRelativeCourse;
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
