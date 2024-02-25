import { z } from "zod";

export const PostSchema = z
  .object({
    image: z.string().optional(),
    city: z.string(),
    communes: z
      .array(z.string())
      .min(1, {
        message: "Selecciona al menos una comuna",
      })
      .max(5, {
        message: "Selecciona hasta 5 comunas",
      }),
    tags: z.string().array().optional(),
    publicContact: z.boolean(),
    rooms: z.array(z.number()).default([1, 2]),
    people: z.number().optional(),
    bathrooms: z.array(z.number()).default([1, 2]),
    parking: z.boolean().optional(),
    furnished: z.boolean().optional(),
    meters: z.array(z.number()).default([50, 100]),
    apartamenetType: z.boolean().optional().default(true),
    houseType: z.boolean().optional(),
    aditionalInfo: z.string().optional(),
    //The next values dont accept letters
    maxPrice: z.string().min(1, { message: "Ingresa un valor" }),
    minPrice: z.string().min(1, { message: "Ingresa un valor" }),
    maxCost: z.string().min(1, { message: "Ingresa un valor" }),
    minCost: z.string().min(1, { message: "Ingresa un valor" }),
  })
  // .refine(
  //   (data) => data.maxPrice > data.minPrice && data.maxCost > data.minCost,
  //   { message: "El valor maximo debe ser mayor al minimo",path: ["maxPrice", "minPrice", "maxCost", "minCost"]},
  // );
