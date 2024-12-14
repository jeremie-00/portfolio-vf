"use server";
import prisma from "@/lib/prisma";
import { ActionError, authentificationAction } from "@/lib/safe-action";
import { LinkSchema } from "@/types/zodType";
import { revalidatePath } from "next/cache";

export async function getAllLinksClientAction() {
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

export async function getAllLinksAdminAction() {
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

export async function getLinkByIdAction(id: string) {
  const link = await prisma.link.findUnique({
    where: {
      id,
    },
    include: { icon: true, project: true },
  });

  if (!link) {
    throw new ActionError("Link not found");
  }

  return link;
}

export const createLinkAction = authentificationAction
  .schema(LinkSchema)
  .action(async ({ parsedInput: { ...link } }) => {
    const createdLink = await prisma.link.create({
      data: {
        ...link,
        iconId: link.iconId || undefined,
        projectId: link.projectId || undefined,
      },
    });
    revalidatePath("/", "layout");
    return createdLink;
  });

export const updateLinkActionAction = authentificationAction
  .schema(LinkSchema)
  .action(async ({ parsedInput: { ...link } }) => {
    await prisma.link.update({
      where: { id: link.id },
      data: {
        ...link,
        iconId: link.iconId || undefined,
        projectId: link.projectId || undefined,
      },
    });
    revalidatePath("/", "layout");
    //return { success: "Lien modifié avec succès" } as ActionPrismaResponse;
  });
