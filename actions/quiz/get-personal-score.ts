"use server";

import { isBaseError } from "@/lib/utils";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;

export const getPersonalQuizScore = async (userId: string, courseId: string) => {
  try {
    console.log("🚀 ~ getPersonalQuizScore ~ userId:", userId);
    console.log("🚀 ~ getPersonalQuizScore ~ courseId:", courseId);
    const response = await fetch(`${ServerURL}/quiz/history?studentId=${userId}&courseId=${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }).then((res) => res.json());
    return response?.result?.quizHistory;
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
