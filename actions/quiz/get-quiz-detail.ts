"use server";

import { isBaseError } from "@/lib/utils";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;
export const getQuizDetail = async (quizId: string, accessToken: string) => {
  try {
    const response = await fetch(`${ServerURL}/quiz/${quizId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());

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
