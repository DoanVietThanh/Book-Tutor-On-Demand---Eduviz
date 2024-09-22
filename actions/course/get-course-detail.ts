"use server";
const ServerURL = process.env.NEXT_PUBLIC_API_URL;

export const getCourseDetail = async (courseId: string) => {
  try {
    const response = await fetch(`${ServerURL}/course/detail/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return response.result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
