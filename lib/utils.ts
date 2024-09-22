import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type BaseError = {
  statusCode: number;
  message: string;
};

export function isBaseError(error: unknown): error is BaseError {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof (error as BaseError).statusCode === "number" &&
    "message" in error &&
    typeof (error as BaseError).message === "string"
  );
}

export function getErrorMessage(error: unknown): string {
  let messageError = "";
  if (!isBaseError(error) || error.statusCode === 500) {
    messageError = "An unknown error occurred. Please try again later.";
  } else {
    messageError = error.message;
  }

  return messageError;
}
