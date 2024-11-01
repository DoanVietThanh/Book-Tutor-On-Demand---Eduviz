import { isBaseError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;
export const createQuiz = async (values: any, accessToken: string) => {
  try {
    const formData = new FormData();
    formData.append("quizTitle", values.quizTitle);
    formData.append("duration", values.duration);
    formData.append("courseId", values.courseId);
    formData.append("file", values.file);

    const response = await fetch(`${ServerURL}/quiz/upload-questions`, {
      method: "POST",
      body: formData,
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
