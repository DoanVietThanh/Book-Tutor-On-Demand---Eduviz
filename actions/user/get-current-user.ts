"use server";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;

export const getCurrentUser = async (accessToken: string) => {
  try {
    const response = await fetch(`${ServerURL}/user/my-account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.result?.message || "An unexpected error occurred";
      throw new Error(errorMessage);
    }

    return data.result;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while logging in");
  }
};
