"use server";

import { validateRequest } from "@/lib/auth/validate-request";
import { delay } from "@/lib/security";
import { UserFormSchema } from "@/lib/validators/user";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const basicVerification = async (
  data: z.infer<typeof UserFormSchema>,
) => {
  const { user } = await validateRequest();
  try {
    if (!user) {
      throw new Error("No puedes realizar esta accion");
    }
    await db
      .update(users)
      .set({
        verificationLevel: 1,
        personalId: data.rut,
        name: data.name,
        phone: data.phone,
      })
      .where(eq(users.id, user.id));
    revalidatePath("/account");
    return delay();
  } catch (error) {
    console.error("ERROR TYPE:", error);
    throw new Error("No se pudo realizar la verificacion");
  }
};
