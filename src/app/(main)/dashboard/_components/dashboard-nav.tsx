"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileTextIcon, CreditCard } from "@/components/icons";

import { cn } from "@/lib/utils";

const items = [
  {
    title: "Publicaciones",
    href: "/dashboard",
    icon: FileTextIcon,
  },

  {
    title: "Mensajes",
    href: "/dashboard/messages",
    icon: CreditCard,
  }
];

interface Props {
  className?: string;
}

export function DashboardNav({ className }: Props) {
  const path = usePathname();

  return (
    <nav className={cn(className)}>
      {items.map((item) => (
        <Link href={item.href} key={item.href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              path === item.href ? "bg-accent" : "transparent",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
