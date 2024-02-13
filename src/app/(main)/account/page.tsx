import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirects } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AccountPage() {
  const { user } = await validateRequest();
  if (!user) redirect(redirects.toLogin);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
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
              <Button variant="outline">Cambiar Imagen</Button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Edit</h3>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Blandit facilisis sed tellus vel velit.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Disable ads</h3>
                <p className="text-sm">
                  With a Pro or Pro Business account, you can disable ads across
                  the site.
                </p>
              </div>
            </div>
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
                {user.verificationLevel
                  ? user.verificationLevel
                  : "No Verificado"}
              </h3>
              <p className="text-sm">
                Verificate y Aparece primero en los resultados de busqueda.
              </p>
            </div>
          </section>
        </div>
        <div className="lg:col-span-2">
          <section aria-labelledby="public-profile-header">
            <h2
              className="mb-4 text-xl font-semibold"
              id="public-profile-header"
            >
              Tus Datos
            <p className="text-sm text-muted">
              Tus datos privados no seran compartidos, solo son visibles para
              ti.
            </p>
            </h2>
            <div className="space-y-6">
              <div>
                <label className="font-medium" htmlFor="name">
                  Nombre
                </label>
                <Input
                  disabled={user.name ? true : false}
                  id="name"
                  placeholder="Coloca tu nombre aqui"
                  value={user.name}
                />
              </div>
              <div>
                <label className="font-medium" htmlFor="email">
                  Email{" "}
                  {/* {user.emailVerified ? "(Verificado)" : "(No Verificado)"} */}
                </label>
                <Input
                  disabled={user.email ? true : false}
                  value={user.email}
                  id="email"
                  placeholder="account@yourhome.cl"
                />
              </div>
              <div>
                <label className="font-medium" htmlFor="rut">
                  RUT
                </label>
                <Input id="url" placeholder="Lorem ipsum dolor sit amet" />
              </div>
              <div>
                <label className="font-medium" htmlFor="description">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Tell us a little bit about yourself"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
