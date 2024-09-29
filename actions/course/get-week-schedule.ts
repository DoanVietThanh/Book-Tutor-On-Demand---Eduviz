"use server";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;

export const getWeekSchedule = async () => {
  try {
    const response = await fetch(`${ServerURL}/course/get-week-schedule`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return response.result?.weekSchedule;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
