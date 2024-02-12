"use server";

/* eslint @typescript-eslint/no-explicit-any:0, @typescript-eslint/prefer-optional-chain:0 */

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId, Scrypt } from "lucia";
import { isWithinExpirationDate, TimeSpan, createDate } from "oslo";
// import { generateRandomString, alphabet } from "oslo/crypto";
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/auth";
import { db } from "@/server/db";
import {
  loginSchema,
  signupSchema,
  type LoginInput,
  type SignupInput,
  resetPasswordSchema,
} from "@/lib/validators/auth";
import {
  // emailVerificationCodes,
  passwordResetTokens,
  users,
} from "@/server/db/schema";
import { sendMail } from "@/server/send-mail";
// import { renderVerificationCodeEmail } from "@/lib/email-templates/email-verification";
import { renderResetPasswordEmail } from "@/lib/email-templates/reset-password";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirects } from "../constants";
import { env } from "@/env";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function login(
  _: any,
  formData: FormData,
): Promise<ActionResponse<LoginInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = loginSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { email, password } = parsed.data;

  // const existingUser = await db.query.users.findFirst({
  //   where: (table, { eq }) => eq(table.email, email),
  // });
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  const user = existingUser[0];
  console.log(user);
  if (!user) {
    return {
      formError: "Email incorrecto o contraseña incorrecta",
    };
  }

  if (!user || !user?.hashedPassword) {
    return {
      formError: "Incorrect email or password",
    };
  }

  const validPassword = await new Scrypt().verify(
    user.hashedPassword,
    password,
  );
  if (!validPassword) {
    return {
      formError: "Incorrect email or password",
    };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect(redirects.afterLogin);
}

export async function signup(
  _: any,
  formData: FormData,
): Promise<ActionResponse<SignupInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = signupSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { email, password } = parsed.data;

  // const existingUser = await db.query.users.findFirst({
  //   where: (table, { eq }) => eq(table.email, email),
  //   columns: { email: true },
  // });
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser[0]?.email === email) {
    return {
      formError: "Este email ya está en uso",
    };
  }

  const userId = generateId(21);
  const hashedPassword = await new Scrypt().hash(password);
  await db.insert(users).values({
    id: userId,
    email,
    hashedPassword,
  });

  // const verificationCode = await generateEmailVerificationCode(userId, email);
  // await sendMail({
  //   to: email,
  //   subject: "Verify your account",
  //   body: renderVerificationCodeEmail({ code: verificationCode }),
  // });
  // await db
  //   .update(users)
  //   .set({ emailVerified: true })
  //   .where(eq(users.id, user.id));
  const { user } = await validateRequest();
  if (!user) {
    return redirect(redirects.toLogin);
  }
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  redirect(redirects.afterLogin);
}

export async function logout(): Promise<{ error: string } | void> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Hubo un error con tu sesion",
    };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}

// export async function resendVerificationEmail(): Promise<{
//   error?: string;
//   success?: boolean;
// }> {
//   const { user } = await validateRequest();
//   if (!user) {
//     return redirect(redirects.toLogin);
//   }
//   const lastSent = await db.query.emailVerificationCodes.findFirst({
//     where: (table, { eq }) => eq(table.userId, user.id),
//     columns: { expiresAt: true },
//   });

//   if (lastSent && isWithinExpirationDate(lastSent.expiresAt)) {
//     return {
//       error: `Please wait ${timeFromNow(lastSent.expiresAt)} before resending`,
//     };
//   }
//   const verificationCode = await generateEmailVerificationCode(
//     user.id,
//     user.email,
//   );
//   await sendMail({
//     to: user.email,
//     subject: "Verify your account",
//     body: renderVerificationCodeEmail({ code: verificationCode }),
//   });

//   return { success: true };
// }

// export async function verifyEmail(
//   _: any,
//   formData: FormData,
// ): Promise<{ error: string } | void> {
//   const code = formData.get("code");
//   if (typeof code !== "string" || code.length !== 8) {
//     return { error: "Invalid code" };
//   }
//   const { user } = await validateRequest();
//   if (!user) {
//     return redirect(redirects.toLogin);
//   }

//   const dbCode = await db.transaction(async (tx) => {
//     const item = await tx.query.emailVerificationCodes.findFirst({
//       where: (table, { eq }) => eq(table.userId, user.id),
//     });
//     if (item) {
//       await tx
//         .delete(emailVerificationCodes)
//         .where(eq(emailVerificationCodes.id, item.id));
//     }
//     return item;
//   });

//   if (!dbCode || dbCode.code !== code)
//     return { error: "Invalid verification code" };

//   if (!isWithinExpirationDate(dbCode.expiresAt))
//     return { error: "Verification code expired" };

//   if (dbCode.email !== user.email) return { error: "Email does not match" };

//   await lucia.invalidateUserSessions(user.id);
//   await db
//     .update(users)
//     .set({ emailVerified: true })
//     .where(eq(users.id, user.id));
//   const session = await lucia.createSession(user.id, {});
//   const sessionCookie = lucia.createSessionCookie(session.id);
//   cookies().set(
//     sessionCookie.name,
//     sessionCookie.value,
//     sessionCookie.attributes,
//   );
//   redirect(redirects.afterLogin);
// }

export async function sendPasswordResetLink(
  _: any,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get("email");
  const parsed = z.string().trim().email().safeParse(email);
  if (!parsed.success) {
    return { error: "Provided email is invalid." };
  }
  try {
    // const user = await db.query.users.findFirst({
    //   where: (table, { eq }) => eq(table.email, parsed.data),
    // });
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, parsed.data))
      .limit(1);

    if (!user[0] || !user[0].email) return { error: "Este Email no es valido" };

    const verificationToken = await generatePasswordResetToken(user[0].id);

    const verificationLink = `${env.NEXT_PUBLIC_APP_URL}/reset-password/${verificationToken}`;

    await sendMail({
      to: user[0].email,
      subject: "Reinica tu contraseña",
      body: renderResetPasswordEmail({ link: verificationLink }),
    });

    return { success: true };
  } catch (error) {
    return { error: "Algo salio mal, intenta mas tarde." };
  }
}

export async function resetPassword(
  _: any,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = resetPasswordSchema.safeParse(obj);

  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      error: err.fieldErrors.password?.[0] ?? err.fieldErrors.token?.[0],
    };
  }
  const { token, password } = parsed.data;

  const dbToken = await db.transaction(async (tx) => {
    const item = await tx
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.id, token))
      .limit(1);
    if (item[0]) {
      await tx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, item[0].id));
    }
    return item[0];
  });

  if (!dbToken) return { error: "Este link no es valido!!" };

  if (!isWithinExpirationDate(dbToken.expiresAt))
    return { error: "Este link expiro" };

  await lucia.invalidateUserSessions(dbToken.userId);
  const hashedPassword = await new Scrypt().hash(password);
  await db
    .update(users)
    .set({ hashedPassword })
    .where(eq(users.id, dbToken.userId));
  const session = await lucia.createSession(dbToken.userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  redirect(redirects.afterLogin);
}

// const timeFromNow = (time: Date) => {
//   const now = new Date();
//   const diff = time.getTime() - now.getTime();
//   const minutes = Math.floor(diff / 1000 / 60);
//   const seconds = Math.floor(diff / 1000) % 60;
//   return `${minutes}m ${seconds}s`;
// };

// async function generateEmailVerificationCode(
//   userId: string,
//   email: string,
// ): Promise<string> {
//   await db
//     .delete(emailVerificationCodes)
//     .where(eq(emailVerificationCodes.userId, userId));
//   const code = generateRandomString(8, alphabet("0-9")); // 8 digit code
//   await db.insert(emailVerificationCodes).values({
//     userId,
//     email,
//     code,
//     expiresAt: createDate(new TimeSpan(10, "m")), // 10 minutes
//   });
//   return code;
// }

async function generatePasswordResetToken(userId: string): Promise<string> {
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.userId, userId));
  const tokenId = generateId(40);
  await db.insert(passwordResetTokens).values({
    id: tokenId,
    userId,
    expiresAt: createDate(new TimeSpan(2, "h")),
  });
  return tokenId;
}
