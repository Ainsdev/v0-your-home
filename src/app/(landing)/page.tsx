import { type Metadata } from "next";
import { NextjsLight, NextjsDark } from "./_components/feature-icons";
import { HeroScrollDemo } from "./_components/hero-scroll";

export const metadata: Metadata = {
  title: "Next.js Lucia Auth Starter Template",
  description:
    "A Next.js starter template with nextjs and Lucia auth. Includes drizzle, trpc, react-email, tailwindcss and shadcn-ui",
};

const HomePage = () => {
  return (
    <main className="flex flex-col justify-center">
      <section className="h-full w-full">
        <HeroScrollDemo />
      </section>
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-neutral-100 px-3 py-1 text-sm dark:bg-neutral-800">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Faster iteration. More innovation.
              </h2>
              <p className="max-w-[900px] text-neutral-500 dark:text-neutral-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The platform for rapid progress. Let your team focus on shipping
                features instead of managing infrastructure with automated
                CI/CD.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
            <div className="mx-auto aspect-video overflow-hidden rounded-xl bg-neutral-100 object-cover object-center dark:bg-neutral-800 sm:w-full lg:order-last" />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Collaboration</h3>
                    <p className="text-neutral-500 dark:text-neutral-400">
                      Make collaboration seamless with built-in code review
                      tools.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Automation</h3>
                    <p className="text-neutral-500 dark:text-neutral-400">
                      Automate your workflow with continuous integration.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Scale</h3>
                    <p className="text-neutral-500 dark:text-neutral-400">
                      Deploy to the cloud with a single click and scale with
                      ease.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-t py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Sign Up for Updates
              </h2>
              <p className="max-w-[600px] text-neutral-500 dark:text-neutral-400 md:text-xl">
                Stay updated with the latest product news and updates.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <input
                  className="max-w-lg flex-1 rounded-md border border-border px-4 py-2 "
                  placeholder="Enter your email"
                  type="email"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                >
                  Sign Up
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

function NextjsIcon({ className }: { className?: string }) {
  return (
    <>
      <NextjsLight className={className + " dark:hidden"} />
      <NextjsDark className={className + " hidden dark:block"} />
    </>
  );
}
