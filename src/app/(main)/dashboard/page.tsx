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
import { validateRequest } from "@/lib/auth/validate-request";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { User } from "lucia";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Tus Publicaciones",
  description: "Administra y crea tus publicaciones",
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
  const { user } = (await validateRequest()) as { user: User };

  const userPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.userId, user?.id));

  return (
    <div className="py-10 md:py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold md:text-4xl">Publicaciones</h1>
        <p className="text-sm text-muted-foreground">
          Administra tus publicaciones
        </p>
      </div>
      <Drawer>
        <DrawerTrigger disabled={user?.verificationLevel == 0 || !user?.phone}>
          <Button
            disabled={user?.verificationLevel == 0 || !user?.phone}
            variant="default"
          >
            Crear Publicacion
          </Button>
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-10">
        {userPosts.map((post) => (
          <PostCard
            key={post.id}
            postId={post.id}
            title={post.city}
            status={post.active}
            createdAt={post.createdAt}
            excerpt={post.name}
          />
        ))}
      </div>
    </div>
  );
}
