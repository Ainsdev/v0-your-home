import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirects } from "@/lib/constants";


import YourProfileComponent from "./_components/profile-component";
import UserForm from "./_components/user-data-form";


export default async function AccountPage() {
  const { user } = await validateRequest();
  if (!user) redirect(redirects.toLogin);
  

  return (
    <div className="container mx-auto px-5 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <YourProfileComponent user={user}></YourProfileComponent>
        </div>
        <UserForm user={user} />
      </div>
    </div>
  );
}
