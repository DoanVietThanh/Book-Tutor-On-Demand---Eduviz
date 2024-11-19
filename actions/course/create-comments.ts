"use server";

import { isBaseError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;
export const createCommentCourse = async (data: any, accessToken: string, courseId: string) => {
  try {
    const response = await fetch(`${ServerURL}/course/${courseId}/comment`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
    revalidatePath(`/course/${courseId}`);
    return response;
  } catch (error) {
    let messageError = "";
    if (!isBaseError(error) || error.statusCode === 500) {
      messageError = "Something went wrong";
    } else {
      messageError = error.message;
    }
    throw new Error(messageError);
  }
};
