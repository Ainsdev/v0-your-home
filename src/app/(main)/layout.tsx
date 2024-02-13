import { type ReactNode } from "react";
import { redirect } from "next/navigation";

import { Footer } from "./_components/footer";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirects } from "@/lib/constants";
import { Header } from "@/components/header";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const { user } = await validateRequest();

  if (!user) redirect(redirects.toLogin);

  return (
    <>
      <Header user={user} />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
