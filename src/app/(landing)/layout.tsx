import { APP_TITLE } from "@/lib/constants";
import { type ReactNode } from "react";
import { type Metadata } from "next";
import { Header } from "../../components/header";
import { Footer } from "./_components/footer";
import { validateRequest } from "@/lib/auth/validate-request";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: "A Next.js starter with T3 stack and Lucia auth.",
};

async function LandingPageLayout({ children }: { children: ReactNode }) {
  const { user } = await validateRequest();
  return (
    <>
      <Header user={user} />
      {children}
      <div className="h-20"></div>
      <Footer />
    </>
  );
}

export default LandingPageLayout;
