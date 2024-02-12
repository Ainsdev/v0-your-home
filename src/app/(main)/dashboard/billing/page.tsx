import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { CheckIcon, ExclamationTriangleIcon } from "@/components/icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subscriptionPlans } from "@/config/subscriptions";
import { env } from "@/env";
import { validateRequest } from "@/lib/auth/validate-request";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { APP_TITLE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Billing",
  description: "Manage your billing and subscription",
};

export default async function BillingPage() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/signin");
  }


  return (
    <div className="grid gap-8 py-10 md:py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold md:text-4xl">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your billing and subscription
        </p>
      </div>
      {
        <section>
          <Alert className="!pl-10">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <AlertTitle>This is a demo app.</AlertTitle>
            <AlertDescription>
              {APP_TITLE} app is a demo app using a Stripe test environment. You
              can find a list of test card numbers on the{" "}
              <a
                href="https://stripe.com/docs/testing#cards"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Stripe docs
              </a>
              .
            </AlertDescription>
          </Alert>
        </section>
      }
      <section>
        <Card className="space-y-2 p-6">
          <h3 className="text-lg font-semibold sm:text-xl">
             plan
          </h3>
          <p className="text-sm text-muted-foreground">
            {/* {!subscriptionPlan?.isPro
              ? "The free plan is limited to 3 posts. Upgrade to the Pro plan to unlock unlimited posts."
              : subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
            {subscriptionPlan?.stripeCurrentPeriodEnd
              ? formatDate(subscriptionPlan.stripeCurrentPeriodEnd)
              : null} */}
              "The free plan is limited to 3 posts. Upgrade to the Pro plan to unlock unlimited posts."
          </p>
        </Card>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader className="h-full">
              <CardTitle className="line-clamp-1">{plan.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full flex-1 place-items-start space-y-2">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="aspect-square shrink-0 rounded-full bg-foreground p-px text-background">
                    <CheckIcon className="size-4" aria-hidden="true" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-4">
              {plan.name === "Free" ? (
                <Button className="w-full" asChild>
                  <Link href="/dashboard">
                    Get started
                    <span className="sr-only">Get started</span>
                  </Link>
                </Button>
              ) : (
                // <ManageSubscriptionForm
                //   isPro={subscriptionPlan?.isPro ?? false}
                //   stripePriceId={plan.stripePriceId}
                //   stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                //   stripeSubscriptionId={subscriptionPlan?.stripeSubscriptionId}
                // />
                <h1>ManageSubscriptionForm</h1>
              )}
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
