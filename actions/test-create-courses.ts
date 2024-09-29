"use server";

import { isBaseError } from "@/lib/utils";

export const testCreateCourse = async (newFormData: FormData) => {
  console.log("🚀 ~ testCreateCourse ~ newFormData:", newFormData);
  try {
    const response = await fetch("http://localhost:8000/api/user/test-image", {
      method: "POST",
      body: newFormData,
    });

    const data = await response.json();
    return data;
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

// use server có hay ko đều được
// KO được set header Content-Type -> vì browser sẽ tự làm điều đó
// FormData chỉ có 2 loại type là String vs File
