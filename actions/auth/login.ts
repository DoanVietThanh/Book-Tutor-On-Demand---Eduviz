"use server";

import { isBaseError } from "@/lib/utils";

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
    let messageError = "";
    if (!isBaseError(error) || error.statusCode === 500) {
      messageError = "Something went wrong";
    } else {
      messageError = error.message;
    }
    throw new Error(messageError);
  }
};
