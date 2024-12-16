"use server";
import prisma from "@/lib/prisma";
import { ActionError, authentificationAction } from "@/lib/safe-action";
import { LinkIdSchema, LinkSchema } from "@/types/zodType";
import { revalidatePath } from "next/cache";

export async function getAllLinksAction() {
  const links = await prisma.link.findMany({
    orderBy: {
      order: "asc",
    },
    include: { project: true, icon: true },
  });
  return links;
}

export async function getAllLinksClientAction() {
  const links = await prisma.link.findMany({
    where: {
      inNav: "on",
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
      isAdmin: "on",
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
    console.log(link);
    const updatedLink = await prisma.link.update({
      where: { id: link.ID },
      data: {
        url: link.url,
        type: link.type || undefined,
        title: link.title,
        order: link.order || undefined,
        inNav: link.inNav || undefined,
        isAdmin: link.isAdmin || undefined,
        iconId: link.iconId || undefined,
        projectId: link.projectId || undefined,
      },
    });
    revalidatePath("/", "layout");
    return updatedLink;
  });

export const deleteLinkByIdAction = authentificationAction
  .schema(LinkIdSchema)
  .action(async ({ parsedInput: { ID } }) => {
    const deletedLink = await prisma.link.delete({
      where: { id: ID },
    });
    revalidatePath("/", "layout");
    return deletedLink;
  });
