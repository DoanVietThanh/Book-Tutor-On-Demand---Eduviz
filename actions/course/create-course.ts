"use server";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;

export const createCourse = async (formData: FormData, accessToken: string) => {
  console.log("🚀 ~ createCourse ~ formData:", formData);
  try {
    const response = await fetch(`${ServerURL}/course/create-course`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    console.log("🚀 ~ createCourse ~ response:", response);
    console.log("🚀 ~ createCourse ~ data:", data);

    if (!response.ok) {
      const errorMessage = data.result?.message || "An unexpected error occurred";
      throw new Error(errorMessage);
    }

    return response;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
