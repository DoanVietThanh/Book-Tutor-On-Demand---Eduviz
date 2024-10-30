import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const getCurrentTime = (increaseHours: number = 0) => {
  const date = new Date();

  // Calculate the adjusted hours, ensuring it wraps correctly between 0 and 23
  const totalHours = (date.getHours() + increaseHours) % 24;
  const hours = String(totalHours).padStart(2, "0");

  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export const getTimeDefault = () => {
  return "00:00:00";
};

export const formatStartDate = (date: string) => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

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
