"use server";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;

export const getSubjectName = async () => {
  try {
    const response = await fetch(`${ServerURL}/subject`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return response?.result?.listSubject;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
