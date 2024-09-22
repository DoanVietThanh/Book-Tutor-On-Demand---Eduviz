"use server";
const ServerURL = process.env.NEXT_PUBLIC_API_URL;

export const getCourses = async () => {
  try {
    const response = await fetch(`${ServerURL}/course`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return response.result?.listCourseWithSubjects;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
