import { CodeIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "@/components/theme-toggle";

const githubUrl = "https://github.com/iamtouha/next-lucia-auth";
const twitterUrl = "https://twitter.com/iamtouha";

export const Footer = () => {
  return (
    <footer className="mt-6 px-4 py-6">
      <div className="container flex items-center p-0">
        <CodeIcon className="mr-2 h-6 w-6" />
        <p className="text-sm">
          Creado en{" "}
          <a className="underline underline-offset-4" href={twitterUrl}>
            Chile
          </a>
          . Ayudanos{" "}
          <a className="underline underline-offset-4" href={githubUrl}>
            Compartiendo{" "}
          </a>
          con tu conocidos.
        </p>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};
