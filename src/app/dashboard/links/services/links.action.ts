"use server";
import prisma from "@/lib/prisma";
import { authentificationAction } from "@/lib/safe-action";
import { ActionPrismaResponse } from "@/types/prismaTypes";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

// Définir le schéma Zod pour valider les données du lien
const LinkSchema = zfd.formData({
  url: z
    .string()
    .refine((url) => /^\/.*$/.test(url) || /^https?:\/\//.test(url), {
      message: "L'URL doit être une URL valide ou un chemin relatif",
    }),
  title: z.string().min(1, { message: "Le titre est requis" }),
  id: z.string().optional(),
  type: z.string().optional(),
  order: z.string().optional(),
  iconId: z.string().optional(),
  projectId: z.string().optional(),
});

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

export async function getLinkById(id: string) {
  try {
    const link = await prisma.link.findUnique({
      where: {
        id,
      },
      include: { icon: true, project: true },
    });

    if (!link) {
      throw new Error("Link not found");
    }

    return link;
  } catch {
    return null;
  }
}

export const createLink = authentificationAction
  .schema(LinkSchema)
  .action(async ({ parsedInput: { ...link } }) => {
    await prisma.link.create({
      data: {
        ...link,
        iconId: link.iconId || undefined,
        projectId: link.projectId || undefined,
      },
    });
    revalidatePath("/", "layout");
    return { success: "Lien créé avec succès" } as ActionPrismaResponse;
  });

export const updateLink = authentificationAction
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
    return { success: "Lien modifié avec succès" } as ActionPrismaResponse;
  });
