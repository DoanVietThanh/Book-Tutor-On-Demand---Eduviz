"use server";

import { isBaseError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;
export const createCourse = async (data: any, accessToken: string) => {
  try {
    const response = await fetch(`${ServerURL}/course/create-course`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
    revalidatePath("/tutor/classes");
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
