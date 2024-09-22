"use server";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;

type LoginRequest = {
  email: string;
  password: string;
};
export const loginUser = async ({ email, password }: LoginRequest) => {
  try {
    const response = await fetch(`${ServerURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
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
