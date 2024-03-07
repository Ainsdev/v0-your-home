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
import { numberToClp } from "@/lib/utils";
import { getFromRange } from "@/lib/utils/slugify";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const priceBeutify =
    numberToClp(getFromRange(excerpt)[0] ?? "0") +
    " - " +
    numberToClp(getFromRange(excerpt)[1] ?? "0");
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
      <CardContent className="line-clamp-3 text-sm">{priceBeutify}</CardContent>
      <CardFooter className="flex-row-reverse gap-2">
        <Button variant="secondary" size="sm" asChild>
          <Link href={`/dashboard/editor/${postId}`}>
            <Pencil2Icon className="mr-1 h-4 w-4" />
            <span>Edit</span>
          </Link>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 text-destructive"
            >
              <TrashIcon className="h-5 w-5" />
              <span className="sr-only">Eliminar</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Estas Seguro?</DialogTitle>
              <DialogDescription>
                Esta accion no se puede deshacer
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center space-x-2">
              <Button
              className="w-full"
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
                variant="destructive"
              >
                Eliminar Definitvamente
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Badge variant="outline" className="mr-auto rounded-lg capitalize">
          {status ? "Activo" : "Innactivo"}
        </Badge>
      </CardFooter>
    </Card>
  );
};
