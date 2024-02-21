import { z } from "zod";

export const PostSchema = z.object({
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
  apartamenetType: z.boolean().optional(),
  houseType: z.boolean().optional(),
  price: z.array(z.number()).default([100000, 500000]),
  costs: z.array(z.number()).default([10000, 70000]),
  aditionalInfo: z.string().optional(),
});
