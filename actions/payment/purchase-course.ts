"use server";

import { isBaseError } from "@/lib/utils";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;
export const purchaseCourse = async () => {
  try {
    const response = await fetch(`${ServerURL}/payment/premium-package`, {
      method: "GET",
    }).then((res) => res.json());
    return response?.result;
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
