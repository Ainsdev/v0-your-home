import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirects } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";
import YourProfileComponent from "../_components/profile-component";



export default async function AccountPage() {
  const { user } = await validateRequest();
  if (!user) redirect(redirects.toLogin);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <YourProfileComponent user={user}></YourProfileComponent>
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
                  value={user.name ?? undefined}
                />
              </div>
              <div>
                <label className="font-medium" htmlFor="email">
                  Email{" "}
                  {/* {user.emailVerified ? "(Verificado)" : "(No Verificado)"} */}
                </label>
                <Input
                  disabled={user.email ? true : false}
                  value={user.email ?? undefined}
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
