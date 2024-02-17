import { PostCard } from "./_components/post-card";
import { z } from "zod";
import { type Metadata } from "next";
import { env } from "@/env";

import NewPostForm from "@/components/forms/new-post";
import { Button } from "@/components/ui/button";
import { DrawerDialog } from "@/components/ui/drawer-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Posts",
  description: "Manage your posts here",
};

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

const schmea = z.object({
  page: z.coerce.number().default(1).optional(),
  perPage: z.coerce.number().default(12).optional(),
});

export default async function DashboardPage({ searchParams }: Props) {
  const { page } = schmea.parse(searchParams);

  // const [posts, subscriptionPlan] = await Promise.all([
  //   api.post.myPosts.query({ page }),
  //   api.stripe.getSubscriptionPlan.query(),
  // ]);

  return (
    <div className="py-10 md:py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold md:text-4xl">Publicaciones</h1>
        <p className="text-sm text-muted-foreground">
          Administra tus publicaciones
        </p>
      </div>
      <Drawer>
        <DrawerTrigger>
          <Button variant="default">Crear Publicacion</Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh] w-full">
          <DrawerHeader className="flex flex-col items-center justify-center">
            <DrawerTitle>Crea tu publicacion</DrawerTitle>
            <DrawerDescription>No te tomara mucho tiempo :)</DrawerDescription>
          </DrawerHeader>
          <NewPostForm />
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* {posts.map((post) => (
          <PostCard
            key={post.id}
            postId={post.id}
            title={post.title}
            status={post.status}
            createdAt={post.createdAt.toJSON()}
            excerpt={post.excerpt}
          />
        ))} */}
      </div>
    </div>
  );
}
