import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(1, "Ingresa una contraseña valida").max(255),
});
export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z
    .string()
    .min(8, "La contraseña es muy corta")
    .max(255),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Invalid token"),
  password: z.string().min(8, "Password is too short").max(255),
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
