/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User } from "lucia";
import Link from "next/link";

export default function YourProfileComponent({ user }: { user: User }) {
  
  return (
    <section
      aria-labelledby="your-profile-header"
      className="rounded-lg bg-secondary p-4 shadow"
    >
      <h2 className="mb-4 text-lg font-semibold" id="your-profile-header">
        Tu Perfil
      </h2>
      <div className="mb-4 flex items-center justify-between">
        <Avatar>
          <AvatarImage alt="Profile picture" src={user.avatar ?? ""} />
          <AvatarFallback>
            {user.name ? user.name[0] : user.email ? user.email[0] : "YH"}
          </AvatarFallback>
        </Avatar>
        <Button disabled variant="outline">
          Cambiar Imagen (Proximamente)
        </Button>
      </div>
      {/* <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Cambiar a Inmobilario</h3>
          <p className="text-sm">
            Cambia tu cuenta a inmobiliaria y obtén beneficios exclusivos.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Desactivar Publicidad</h3>
          <p className="text-sm">
            Desactiva la publicidad de tu cuenta y navega sin interrupciones.
          </p>
        </div>
      </div> */}
      <div
        className={cn(
          "mt-6 rounded-lg bg-card p-4",
          user.verificationLevel == undefined &&
            "bg-destructive/60 ease-in-out  ",
        )}
      >
        <div className="flex items-center justify-between">
          Nivel de verificacion
          <Button
          // disabled={user.verificationLevel == undefined  }
          variant="secondary" asChild>
            <Link href="#initial-verification">Subir Verificacion</Link>
            </Button>
        </div>
        <h3 className="mt-2 font-semibold">
          {user.verificationLevel ? "nivel " + user.verificationLevel : "No Verificado"}
        </h3>
        <p className="text-sm text-muted-foreground">
          Verificate y Aparece primero en los resultados de busqueda.
        </p>
      </div>
    </section>
  );
}
