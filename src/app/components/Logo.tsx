"use client";
import { getLinkByTitleAction } from "@/app/dashboard/links/services/links.action";
import { Skeleton } from "@/components/ui/skeleton";
import { FullLink } from "@/types/prismaTypes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export function Logo() {
  const [link, setLink] = useState<FullLink | null>(null);

  useEffect(() => {
    async function fetchLink() {
      const data = await getLinkByTitleAction("logo");
      setLink(data[0]);
    }
    fetchLink();
  }, []);

  return (
    <Link href={link?.url || "/"}>
      {link?.image?.url ? (
        <Image
          src={link?.image?.url}
          alt="Logo"
          width={152}
          height={152}
          className="rounded-lg w-9 h-9"
          priority={true}
          unoptimized={true}
        />
      ) : (
        <Skeleton className="h-9 w-9 rounded" />
      )}
    </Link>
  );
}
