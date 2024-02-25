/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User } from "lucia";
import { toast } from "sonner";

export default function YourProfileComponent({ user }: { user: User }) {
  const clickButton = () => {
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">CODIGO NASHE</code>
      </pre>,
      { duration: 5000, icon: "👀" },
    );
  };
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
        <Button onClick={clickButton} variant="outline">
          Cambiar Imagen
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
          user.verificationLevel == 0 &&
            "animate-pulse bg-destructive ease-in-out hover:animate-none ",
        )}
      >
        <div className="flex items-center justify-between">
          Nivel de verificacion
          <Button variant="secondary">Subir Verificacion</Button>
          {/* Si el nivel de verificacion es 0  que complet elos datos de abajo (#public-profile-header)*/}
        </div>
        <h3 className="mt-2 font-semibold">
          {user.verificationLevel ? user.verificationLevel : "No Verificado"}
        </h3>
        <p className="text-sm">
          Verificate y Aparece primero en los resultados de busqueda.
        </p>
      </div>
    </section>
  );
}
