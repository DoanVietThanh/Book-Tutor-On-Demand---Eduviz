import { isBaseError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;
export const getQuizByClass = async (classId: any, accessToken: string) => {
  try {
    const response = await fetch(`${ServerURL}/course/${classId}/quizzes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
    revalidatePath("/tutor/quizes-list");
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
