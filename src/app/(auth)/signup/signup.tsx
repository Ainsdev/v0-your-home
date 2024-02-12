"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GoogleLogo } from "@/components/icons";
import { APP_TITLE } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/auth/actions";
import { SubmitButton } from "@/components/submit-button";

export function Signup() {
  const [state, formAction] = useFormState(signup, null);
  {
    /* <FormField
                  control={form.control}
                  name="rut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rut</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          required
                          maxLength={12}
                          placeholder="17.171.171-8"
                          {...field}
                          onChange={(e) => {
                            e.target.value = formatRut(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */
  }
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{APP_TITLE}: Crea tu cuenta</CardTitle>
        <CardDescription>Te damos la bienvenida </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/login/google">
            <GoogleLogo className="mr-2 h-5 w-5" />
            Inicia sesion con Google
          </Link>
        </Button>
        <div className="my-2 flex items-center">
          <div className="flex-grow border-t border-muted" />
          <div className="mx-2 text-muted-foreground">or</div>
          <div className="flex-grow border-t border-muted" />
        </div>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              required
              placeholder="email@example.com"
              autoComplete="email"
              name="email"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <PasswordInput
              name="password"
              required
              autoComplete="current-password"
              placeholder="********"
            />
          </div>

          {state?.fieldError ? (
            <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
              {Object.values(state.fieldError).map((err) => (
                <li className="ml-4" key={err}>
                  {err}
                </li>
              ))}
            </ul>
          ) : state?.formError ? (
            <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
              {state?.formError}
            </p>
          ) : null}
          <div>
            <Link href={"/login"}>
              <Button variant={"link"} size={"sm"} className="p-0">
                Ya tienes una cuenta? Inicia sesion
              </Button>
            </Link>
          </div>

          <SubmitButton className="w-full"> Crear Cuenta</SubmitButton>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Cancelar</Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
