"use server";

import { isBaseError } from "@/lib/utils";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;

type Request = {
  mentorDetailID: string;
  monthDuration: number;
};

export const upgradePremiumAccount = async (request: Request, accessToken: string) => {
  try {
    const response = await fetch(`${ServerURL}/payment/upgrade-to-vip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        mentorDetailID: request.mentorDetailID,
        cancelUrl: process.env.PAYMENT_CANCEL_URL || "/localhost:3000",
        returnUrl: process.env.PAYMENT_RETURN_URL || "/localhost:3000",
        monthDuration: request.monthDuration,
      }),
    }).then((res) => res.json());

    return response;
  } catch (error) {
    let messageError = "";
    if (!isBaseError(error) || error.statusCode === 500) {
      messageError = "Something went wrong 123";
    } else {
      messageError = error.message;
    }
    throw new Error(messageError);
  }
};
