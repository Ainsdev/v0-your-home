import { type Metadata } from "next";
import { HeroScrollDemo } from "./_components/hero-scroll";
import { FeaturesComponent } from "./_components/features";

export const metadata: Metadata = {
  title: "YourHome",
  description:
    "La forma mas facil de encontrar arrendatario",
};

const HomePage = () => {
  return (
    <main className="flex flex-col justify-center">
      <section className="h-full w-full">
        <HeroScrollDemo />
      </section>
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <FeaturesComponent/>
      </section>
      <section className="w-full border-t py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Crea tu cuenta
              </h2>
              <p className="max-w-[600px] text-secondary-foreground md:text-xl">
                Es muy simple, Pruebalo Ya!!!
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <input
                  className="max-w-lg flex-1 rounded-md border border-border px-4 py-2 "
                  placeholder="Ingresa tu  email"
                  type="email"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                >
                  Crear Cuenta
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

