"use server";
import { handleFileUpload } from "@/lib/fileManager";
import prisma from "@/lib/prisma";
import { ActionError, authentificationAction } from "@/lib/safe-action";
import { LinkIdSchema, LinkSchema } from "@/types/zodType";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function getAllLinksAction() {
  const links = await prisma.link.findMany({
    orderBy: {
      order: "asc",
    },
    include: { project: true, icon: true, image: true },
  });
  return links;
}

export async function getAllLinksClientAction() {
  const links = await prisma.link.findMany({
    where: {
      inNav: true,
    },
    orderBy: {
      order: "asc",
    },
    include: { project: true, icon: true, image: true },
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
    include: { project: true, icon: true, image: true },
  });
  return links;
}

export async function getLinkByIdAction(id: string) {
  const link = await prisma.link.findUnique({
    where: {
      id,
    },
    include: { icon: true, project: true, image: true },
  });

  if (!link) {
    throw new ActionError("Link not found");
  }

  return link;
}

export async function getLinkByTitleAction(title: string) {
  const links = await prisma.link.findMany({
    where: {
      title: title,
    },
    include: { icon: true, project: true, image: true },
  });

  if (!links) {
    throw new ActionError("Link not found");
  }

  return links;
}

export const createLinkAction = authentificationAction
  .schema(LinkSchema)
  .action(async ({ parsedInput: { ...link } }) => {
    const inNav = link.inNav === "on";
    const isAdmin = link.isAdmin === "on";

    const coverUrl =
      link.cover && link.cover.size > 0
        ? await handleFileUpload({ file: link.cover, folder: "link-cover" })
        : null;

    const createdLink = await prisma.link.create({
      data: {
        url: link.url,
        type: link.type || undefined,
        title: link.title,
        order: parseInt(link?.order || "1"),
        inNav,
        isAdmin,
        iconId: link.iconId || undefined,
        projectId: link.projectId || undefined,
        image: coverUrl
          ? {
              create: {
                url: coverUrl?.data as string,
                alt: `Lien ${link.title}`,
              },
            }
          : undefined,
      },
    });
    revalidatePath("/", "layout");
    return createdLink;
  });

export const updateLinkActionAction = authentificationAction
  .schema(LinkSchema)
  .action(async ({ parsedInput: { ...link } }) => {
    const inNav = link.inNav === "on";
    const isAdmin = link.isAdmin === "on";

    const existingLink = link.ID ? await getLinkByIdAction(link.ID) : null;

    if (!existingLink) {
      throw new ActionError("Lien introuvable.");
    }

    if (link.cover && link.cover.size > 0 && existingLink.image)
      await del(existingLink.image.url);

    const coverUrl =
      link.cover &&
      link.cover.size > 0 &&
      (await handleFileUpload({ file: link.cover, folder: "link-cover" }));

    const updatedLink = await prisma.link.update({
      where: { id: link.ID },
      data: {
        url: link.url,
        type: link.type || undefined,
        title: link.title,
        order: parseInt(link?.order || "1"),
        inNav: inNav,
        isAdmin: isAdmin,
        iconId: link.iconId || undefined,
        projectId: link.projectId || undefined,
        image: coverUrl
          ? {
              upsert: {
                update: {
                  url: coverUrl?.data as string,
                  alt: `Lien ${link.title}`,
                },
                create: {
                  url: coverUrl?.data as string,
                  alt: `Lien ${link.title}`,
                },
              },
            }
          : undefined,
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
