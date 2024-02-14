export const FeaturesComponent = () => {
  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm">
            Como funciona
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Facilitamos encontrar a tu arrendatario ideal
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Nuestra plataforma te permite subir tu perfil, para que otros puedan buscarte como arrendatario, comprador y mas.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
        <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last" />
        <div className="flex flex-col justify-center space-y-4">
          <ul className="grid gap-6">
            <li>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Verificacion</h3>
                <p className="text-secondary-foreground">
                  Buscamos la mejor opcion en base a su nivel de verificacion.
                </p>
              </div>
            </li>
            <li>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Facilidad</h3>
                <p className="text-secondary-foreground">
                  Es tan facil como subir tu perfil.
                </p>
              </div>
            </li>
            <li>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Scale</h3>
                <p className="text-secondary-foreground">
                  Deploy to the cloud with a single click and scale with ease.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
