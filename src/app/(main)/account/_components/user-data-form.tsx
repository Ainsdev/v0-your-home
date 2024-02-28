"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatterRut, parseSQLDate } from "@/lib/utils";
import { type User } from "lucia";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UserFormSchema } from "@/lib/validators/user";
import { type z } from "zod";
import React from "react";
import { AnimatedSpinner } from "@/components/icons";
import { basicVerification } from "@/app/_actions/verification";

export default function UserForm({ user }: { user: User }) {
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      email: user.email!,
      name: user.name!,
      phone: user.phone!,
    },
  });
  const [isPending, startTransition] = React.useTransition();

  function onSubmit(data: z.infer<typeof UserFormSchema>) {
    startTransition(async () => {
      try {
        await basicVerification(data);
        toast.success("Datos guardados correctamente");
      } catch (error) {
        toast.error("No se pudo guardar los datos");
      }
    });
  } 

  //Check if the date in updated at is more than 5 days from now
  // const updatedAt = parseSQLDate(user.updatedAt); // -> Returns a Date 
  // const now = new Date();
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="lg:col-span-2">
        <section
          id="initial-verification"
          aria-labelledby="public-profile-header"
        >
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
                      disabled={user.name ? true : false}
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
                      disabled={user.personalId ? true : false}
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
            // Check if the user have changed the data at least for 5 days
            disabled={isPending
              // || (updatedAt && now.getTime() - updatedAt.getTime() < 432000000)
            }
             type="submit" variant="default">
              {isPending ? <AnimatedSpinner /> : "Guardar"}
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
}
