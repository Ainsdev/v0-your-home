"use server";

import { regions } from "@/config/regions";
import { validateRequest } from "@/lib/auth/validate-request";
import { delay } from "@/lib/security";

import { setFromRange } from "@/lib/utils/slugify";
import { type PostSchema } from "@/lib/validators/post";

import { db } from "@/server/db";
import { type Post, posts } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { type z } from "zod";

function mapIndices(selectedList: string[], listAll: string[]): string {
  // Create a map for faster lookup
  const map = new Map<string, number>();
  listAll.forEach((element, index) => {
    map.set(element, index);
  });
  // Map elements of P to their indices in O
  return selectedList.map((element) => map.get(element)).join("");
}
function cleanClp(monto: string): string {
  return monto.toString().replace(/\D/g, "");
}
 function formatDateForSQL(date: Date) {
  // Date Type returned: '2024-02-28 21:31:16'
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

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
    revalidatePath("/dashboard");
    return delay();
  } catch (error) {
    console.error("ERROR TYPE:", error);
    throw new Error("No se pudo realizar la verificacion");
  }
};

export const deletePostAction = async (id: number) => {
  const { user } = await validateRequest();
  try {
    if (!user) {
      throw new Error("No puedes realizar esta accion");
    }
    await db.delete(posts).where(eq(posts.id, id));
    return delay();
  } catch (error) {
    console.error("ERROR TYPE:", error);
    throw new Error("No se pudo realizar la verificacion");
  }
};
