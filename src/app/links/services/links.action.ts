"use server";
import prisma from "@/lib/prisma";

export async function getAllLinks() {
  const links = await prisma.link.findMany({
    orderBy: {
      order: "asc",
    },
    include: { project: true, icon: true },
  });
  return links;
}
