"use client";
import { buttonVariants } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { FullLink } from "@/types/prismaTypes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DynamicIcon } from "../dashboard/icons/components/DynamicIcon";

export function GithubButton({ link }: { link: FullLink | null | undefined }) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-10 w-10 rounded" />;
  }

  return (
    <Link
      className={buttonVariants({
        variant: "outline",
        size: isMobile ? "iconSideBar" : "icon",
      })}
      href={link?.url || "/"}
      target={link?.target || "__blank"}
      onClick={isMobile ? toggleSidebar : undefined}
      aria-label="Lien vers Github"
    >
      <DynamicIcon name={link?.icon?.name || "Github"} size={24} />
    </Link>
  );
}
