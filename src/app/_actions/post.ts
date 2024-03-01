"use server";

import { regions } from "@/config/regions";
import { validateRequest } from "@/lib/auth/validate-request";
import { delay } from "@/lib/security";
import { cleanClp, formatDateForSQL, mapIndices } from "@/lib/utils";
import { setFromRange } from "@/lib/utils/slugify";
import { type PostSchema } from "@/lib/validators/post";

import { db } from "@/server/db";
import { type Post, posts } from "@/server/db/schema";
import { type z } from "zod";

export const NewPostAction = async (data: z.infer<typeof PostSchema>) => {
  const { user } = await validateRequest();
  const date = new Date();
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const getCommunes = regions.find((r) => r.region === data.city)
    ?.comunas as string[];
  const formattedComunes = mapIndices(data.communes, getCommunes);
  const appartamentType = data.apartamenetType ? 1 : 0;
  const houseType = data.houseType ? 2 : 0;

  try {
    if (!user) {
      throw new Error("No puedes realizar esta accion");
    }
    const cleanedData = {
      userId: user.id,
      name: user.name,
      image: data.image ?? "",
      city: data.city,
      communes: formattedComunes,
      verificationLevel: user.verificationLevel,
      aditionalInfo: data.aditionalInfo,
      publicContact: data.publicContact,
      phone: user.phone,
      rooms: setFromRange(data.rooms),
      people: data.people ?? 1,
      bathrooms: setFromRange(data.bathrooms),
      parking: data.parking,
      meters: setFromRange(data.meters),
      type: appartamentType + houseType,
      price: setFromRange([cleanClp(data.minPrice), cleanClp(data.maxPrice)]),
      costs: setFromRange([cleanClp(data.minCost), cleanClp(data.maxCost)]),
    } as Post;
    await db.insert(posts).values({
      ...cleanedData,
      updatedAt: formatDateForSQL(date),
    });
    console.log("POST DATA:", cleanedData);
    return delay();
  } catch (error) {
    console.error("ERROR TYPE:", error);
    throw new Error("No se pudo realizar la verificacion");
  }
};
