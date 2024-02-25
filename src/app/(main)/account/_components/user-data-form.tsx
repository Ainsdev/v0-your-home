"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatterRut, validateRut } from "@/lib/utils";
import { type User } from "lucia";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
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

export default function UserForm({ user }: { user: User }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: user.email!,
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>,
      {
        duration: 5000,
        closeButton: true,
      },
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="lg:col-span-2">
        <section aria-labelledby="public-profile-header">
          <h2 className="mb-4 text-xl font-semibold" id="public-profile-header">
            Tus Datos
            <p className="text-xs text-muted-foreground">
              Tus datos privados no seran compartidos, solo son visibles para
              ti.
            </p>
          </h2>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Alfonso Cuadrado Valenzuela"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Nombre de tu cedula de identidad
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={user.email ? true : false}
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Tu email no puede ser cambiado
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rut</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="11301789-3"
                      onChange={(e) => {
                        e.target.value = formatterRut(e.target.value);
                        field.onChange(e);
                      }}
                      maxLength={12}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input
                      maxLength={9}
                      placeholder="9 1234 5678"
                      {...field}
                      type="tel"
                    />
                  </FormControl>
                  <FormDescription>No incluyas el +56</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
                disabled={!!user.personalId ?? false}
                type="submit"
                variant="default"
            >
                Guardar
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
}
