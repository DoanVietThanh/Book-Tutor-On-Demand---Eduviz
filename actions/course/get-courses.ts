"use server";
const ServerURL = process.env.NEXT_PUBLIC_API_URL;

export const getCourses = async () => {
  console.log(`${ServerURL}/course`);
  return fetch(`${ServerURL}/course`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
