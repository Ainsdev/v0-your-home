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

// // Function for convert [a, b, c] to [{ label: "0", value: "a" }, { label: "1", value: "b" }, { label: "2", value: "c" }]
// export function convertArrayToSelectOptions(array: string[]) {
//   return array.map((value, index) => ({
//     label: index.toString(),
//     value,
//   }));
// }


//Function to convert 012 to in array ["a", "b", "c"]
export function convertNumberToArray(number: string, list: string[]) {
  const digits = number.split("");
  const convertedArray = digits.map((digit) => list[parseInt(digit, 10)]);
  return convertedArray;
}

export function convertArrayToNumber(selectedArray: string[], list: string[]) {
  const positions: number[] = [];
  selectedArray.forEach((element) => {
    const position = list.indexOf(element);
    if (position !== -1) {
      positions.push(position);
    }
  });
  return positions;
}

//SELECT * FROM demo WHERE nname GLOB '*[4]'; -> THIS IS HOW  TO SELECT ALL ROWS WHERE nname CONTAINS 4
