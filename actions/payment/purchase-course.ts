"use server";

import { isBaseError } from "@/lib/utils";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;
export const purchaseCourse = async (courseId: string, accessToken: string) => {
  try {
    const response = await fetch(`${ServerURL}/payment/purchase-course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        courseId: courseId,
        cancelUrl: process.env.PAYMENT_CANCEL_URL || "/localhost:3000",
        returnUrl: process.env.PAYMENT_RETURN_URL || "/localhost:3000",
      }),
    }).then((res) => res.json());
    return response;
  } catch (error) {
    let messageError = "";
    if (!isBaseError(error) || error.statusCode === 500) {
      messageError = "Something went wrong";
    } else {
      messageError = error.message;
    }
    throw new Error(messageError);
  }
};
