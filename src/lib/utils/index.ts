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

export function currencyFormat(number: string) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(parseInt(number, 10));
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat("en-CL", { notation: "compact" }).format(value);
}

export function formatterRut(rut: string): string {
  const actual = rut.toString().replace(/^0+/, "");
  if (actual != '' && actual.length > 1) {
      const sinPuntos = actual.replace(/\./g, "");
      const actualLimpio = sinPuntos.replace(/-/g, "");
      const inicio = actualLimpio.substring(0, actualLimpio.length - 1);
      let rutPuntos = "";
      let i = 0;
      let j = 1;
      for (i = inicio.length - 1; i >= 0; i--) {
          const letra = !/^([0-9])*$/.test(inicio.charAt(i)) ? '' : inicio.charAt(i);
          rutPuntos = letra + rutPuntos;
          if (j % 3 == 0 && j <= inicio.length - 1) {
              rutPuntos = "." + rutPuntos;
          }
          j++;
      }
      const dv = actualLimpio.substring(actualLimpio.length - 1);
      return rutPuntos = rutPuntos + "-" + dv;
  }
  return actual;
}

export function cleanRut(rut: string, withoutDv = false): string {
  const sinPuntos = rut.toString().replace(/\./g, "");
  const actualLimpio = sinPuntos.replace(/-/g, "");
  return withoutDv ? actualLimpio : actualLimpio.substring(0, actualLimpio.length - 1);
}

export function validateRut(rut: string): boolean {
  if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut.toString())) {
      return false
  }
  rut = cleanRut(rut, true)
  let t = parseInt(rut.slice(0, -1), 10)
  let m = 0
  let s = 1
  while (t > 0) {
      s = (s + (t % 10) * (9 - m++ % 6)) % 11
      t = Math.floor(t / 10)
  }
  const v = s > 0 ? '' + (s - 1) : 'K'
  return v === rut.slice(-1)
}

export function numberToClp(monto: string, separator = ".", symbol = "$"): string {
  const cleanValue = monto.replace(/\D/g, '');
  const valueConverted = cleanValue ? cleanValue.split("").reverse() : [];
  if (!cleanValue) return "";
  const length = valueConverted.length;
  const divs = Math.floor(length / 3);
  const sobr = length % 3;
  let finalValue: string | undefined;
  const array: string[] = [];

  valueConverted.reduce((previus: string, current: string, index: number) => {
    if (index % 3 === 0) {
      array.push(previus.split("").reverse().join(""));
      return current;
    }
    return previus + current;
  });

  if (sobr) {
    const valSobr = valueConverted.reverse().slice(0, sobr);
    const point = length < 3 ? '' : separator;
    finalValue = valSobr.join('') + point;
  } else {
    array.push(valueConverted.reverse().slice(0, 3).join(''));
  }

  return `${symbol}${finalValue ? finalValue : ''}${array.reverse().join(separator)}`;
}

export function cleanClp(monto: string): string {
  return monto.toString().replace(/\D/g, '');
}

export function getRutDv(cleanRut: string): string {
  const newCleanRut = cleanRut.toString().split("").reverse().join("");
  let suma = 0;
  for (let i = 0, j = 2; i < newCleanRut.length; i++, ((j === 7) ? j = 2 : j++)) {
    suma += (parseInt(newCleanRut.charAt(i), 10) * j);
  }
  const n_dv = 11 - (suma % 11);
  return ((n_dv === 11) ? "0" : ((n_dv === 10) ? "K" : n_dv.toString()));
}

