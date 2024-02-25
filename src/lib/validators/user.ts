import { z } from "zod";
import { validateRut } from "../utils";

export const UserFormSchema = z.object({
    name: z.string(),
    rut: z.string().refine((v) => validateRut(v), { message: "Rut invalido" }),
    email: z.string().email(),
    phone: z.string().refine(
      (v) => {
        // Comprueba que el teléfono solo contenga números
        const isNumeric = /^\d+$/.test(v);
        // Comprueba que el teléfono no comience con "56" ni con "+56"
        const doesNotStartWith56 = !/^(\+56)/.test(v);
        return isNumeric && doesNotStartWith56;
      },
      {
        message:
          "No incluyas el +56, solo el numero",
      },
    ),
  });