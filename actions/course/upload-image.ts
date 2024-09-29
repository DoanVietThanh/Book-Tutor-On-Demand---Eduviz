import { isBaseError } from "@/lib/utils";

const ServerURL = process.env.NEXT_PUBLIC_API_URL;
export const uploadImage = async (picture: File, accessToken: string) => {
  try {
    const formData: FormData = new FormData();
    formData.append("image", picture);
    const response = await fetch(`${ServerURL}/picture/upload-image`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
