"use server";

import { isBaseError } from "@/lib/utils";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;
export const submitQuiz = async (submitData: any, accessToken: string) => {
  console.log("🚀 ~ submitQuiz ~ submitData:", submitData);
  try {
    const response = await fetch(`${ServerURL}/quiz/submit-quiz`, {
      method: "POST",
      body: JSON.stringify(submitData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
    console.log("🚀 ~ submitQuiz ~ response:", response);

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
