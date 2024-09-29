"use server";

const ServerURL = "https://eduvizapi2.azurewebsites.net/api/picture/test-upload-image-1";

export const testCreateCourse = async (formData: FormData, accessToken: string) => {
  const response = await fetch(`${ServerURL}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data;
};
