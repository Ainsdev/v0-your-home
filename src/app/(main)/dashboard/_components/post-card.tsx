"use client";

import { deletePostAction } from "@/app/_actions/post";
import { Pencil2Icon, TrashIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

interface Props {
  postId: number;
  title: string;
  excerpt: string;
  status: boolean;
  userName?: string;
  createdAt: string;
}

export const PostCard = ({
  postId,
  title,
  status,
  excerpt,
  createdAt,
  userName,
}: Props) => {
  const router = useRouter();
  const [isDeletePending, startDeleteTransition] = React.useTransition();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="line-clamp-2 text-base">{title}</CardTitle>
        <CardDescription className="line-clamp-1 text-sm">
          {userName ? <span>{userName} at</span> : null}
          {new Date(createdAt).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="line-clamp-3 text-sm">{excerpt}</CardContent>
      <CardFooter className="flex-row-reverse gap-2">
        <Button variant="secondary" size="sm" asChild>
          <Link href={`/editor/${postId}`}>
            <Pencil2Icon className="mr-1 h-4 w-4" />
            <span>Edit</span>
          </Link>
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 text-destructive"
          onClick={() => {
            startDeleteTransition(async () => {
              try {
                await deletePostAction(postId);
                toast.success("Post Eliminado");
                router.refresh();
              } catch (err) {
                toast.error("Algo salio mal");
              }
            });
          }}
          disabled={isDeletePending}
        >
          <TrashIcon className="h-5 w-5" />
          <span className="sr-only">Eliminar</span>
        </Button>
        <Badge variant="outline" className="mr-auto rounded-lg capitalize">
          {status ? "Activo" : "Innactivo"}
        </Badge>
      </CardFooter>
    </Card>
  );
};
