"use client";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FullLink } from "@/types/prismaTypes";
import Link from "next/link";
import { useEffect, useState } from "react";
import DynamicIcon from "../dashboard/icons/components/DynamicIcon";

export function GithubButton({ link }: { link: FullLink | null | undefined }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-8 w-8 rounded" />;
  }

  return (
    <Link
      className={buttonVariants({
        variant: "outline",
        size: "iconSideBar",
      })}
      href={link?.url || "/"}
      target={link?.target || "__blank"}
    >
      <DynamicIcon name={link?.icon?.name || "Github"} size={12} />
    </Link>
  );
}