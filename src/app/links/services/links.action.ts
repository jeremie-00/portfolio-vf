"use server";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getAllLinksClient() {
  const links = await prisma.link.findMany({
    where: {
      inNav: true,
    },
    orderBy: {
      order: "asc",
    },
    include: { project: true, icon: true },
  });
  return links;
}

export async function getAllLinksAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error("User not authenticated");
  }

  const links = await prisma.link.findMany({
    where: {
      isAdmin: true,
    },
    orderBy: {
      order: "asc",
    },
    include: { project: true, icon: true },
  });
  return links;
}
