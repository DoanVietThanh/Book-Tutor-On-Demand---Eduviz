"use server";

import { isBaseError } from "@/lib/utils";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;

type LoginRequest = {
  name: string;
  email: string;
  password: string;
};
export const signupUser = async ({ name, email, password }: LoginRequest) => {
  try {
    const response = await fetch(`${ServerURL}/user/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
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
