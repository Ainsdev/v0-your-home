import { env } from "@/env";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getExceptionType = (error: unknown) => {
  const UnknownException = {
    type: "UnknownException",
    status: 500,
    message: "An unknown error occurred",
  };

  if (!error) return UnknownException;

  if ((error as Record<string, unknown>).name === "DatabaseError") {
    return {
      type: "DatabaseException",
      status: 400,
      message: "Duplicate key entry",
    };
  }

  return UnknownException;
};

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  },
) {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
  }).format(new Date(date));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

// Function for convert [a, b, c] to [{ label: "0", value: "a" }, { label: "1", value: "b" }, { label: "2", value: "c" }]
export function convertArrayToSelectOptions(array: string[]) {
  return array.map((value, index) => ({
    label: index.toString(),
    value,
  }));
}

// Function for convert [{ label: "0", value: "a" }, { label: "1", value: "b" }, { label: "2", value: "c" }] to number 012
export function convertSelectOptionsToArray(
  options: { label: string; value: string }[],
) {
  const cleanArr = options.map((option) => option.label);
  // Convert array to number with leading zero preserved
  return cleanArr.join("").padStart(options.length, "0");
}

//Function to convert 012 to in array ["a", "b", "c"]
export function convertNumberToArray(number: string, list: string[]) {
  const digits = number.split("");
  const convertedArray = digits.map((digit) => list[parseInt(digit, 10)]);
  return convertedArray;
}

//SELECT * FROM demo WHERE nname GLOB '*[4]'; -> THIS IS HOW  TO SELECT ALL ROWS WHERE nname CONTAINS 4
