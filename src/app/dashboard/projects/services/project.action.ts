"use server";

import { handleFileUpload, handleImageDelete } from "@/lib/fileManager";
import prisma from "@/lib/prisma";
import { ActionError, authentificationAction } from "@/lib/safe-action";
import { ProjectDeleteSchema, ProjectSchema } from "@/types/zodType";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function getAllProjectsAction() {
  const allProjects = await prisma.project.findMany({
    orderBy: {
      order: "asc",
    },
    include: { skills: true, links: true, cover: true, medias: true },
  });
  return allProjects;
}

export async function getProjectByIdAction(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { skills: true, links: true, cover: true, medias: true },
  });
  return project;
}

export const createProjectAction = authentificationAction
  .schema(ProjectSchema)
  .action(async ({ parsedInput: { ...project } }) => {
    const {
      title,
      shortDesc,
      longDesc,
      order,
      type,
      cover,
      medias,
      skills,
      links,
    } = project;

    const coverUrl =
      cover && (await handleFileUpload({ file: cover, folder: "cover" }));

    const mediasUrls = await Promise.all(
      medias?.map(async (media) => {
        if (media.size > 0) {
          const res = await handleFileUpload({ file: media, folder: "medias" });
          return res?.data as string;
        }
        return null;
      }) ?? []
    );

    const createdProject = await prisma.project.create({
      data: {
        title,
        shortDesc,
        longDesc,
        order: parseInt(order),
        type,

        cover: coverUrl
          ? {
              create: {
                url: coverUrl.data as string,
                alt: `Projet ${project.title} capture d'écran`,
              },
            }
          : undefined,
        medias: {
          create: mediasUrls
            ? mediasUrls
                .filter((url) => url !== null)
                .map((url) => ({
                  url: url,
                  alt: `Projet ${project.title} capture d'écran`,
                }))
            : undefined,
        },
        links: {
          create: links?.map((link, index) => ({
            url: link.url,
            title: link.title,
            inNav: link.inNav === "on",
            iconId: link.iconId || null,
            order: index + 1,
          })),
        },
        skills: {
          connect: skills?.map((id) => ({ id })),
        },
      },
    });
    revalidatePath("/dashboard/projects");
    revalidatePath("/pages/projects");
    return createdProject;
  });

export const updateProjectAction = authentificationAction
  .schema(ProjectSchema)
  .action(async ({ parsedInput: { ...project } }) => {
    const {
      ID,
      title,
      shortDesc,
      longDesc,
      order,
      type,
      cover,
      medias,
      skills,
      links,
    } = project;

    const existingProject = ID ? await getProjectByIdAction(ID) : null;

    if (!existingProject) {
      throw new ActionError("Projet non trouvé.");
    }

    const coverUrl = cover
      ? await handleFileUpload({ file: cover, folder: "cover" })
      : null;

    const mediasUrls = await Promise.all(
      medias?.map(async (media) => {
        if (media.size > 0) {
          const res = await handleFileUpload({
            file: media,
            folder: "medias",
          });
          return res?.data as string;
        }
        return null;
      }) ?? []
    );

    if (cover && cover.size > 0 && existingProject.cover)
      await del(existingProject.cover.url);

    const existingSkills = existingProject?.skills.map((skill) => skill.id);
    const skillDisconnect = existingSkills?.filter(
      (skillId) => !skills?.includes(skillId)
    );

    const updatedProject = await prisma.project.update({
      where: { id: ID },
      data: {
        title,
        shortDesc,
        longDesc,
        order: parseInt(order),
        type,
        cover: coverUrl
          ? {
              upsert: {
                update: {
                  url: coverUrl.data as string,
                  alt: `Projet ${title} capture d'écran`,
                },
                create: {
                  url: coverUrl.data as string,
                  alt: `Projet ${title} capture d'écran`,
                },
              },
            }
          : undefined,
        medias: {
          create: mediasUrls
            ? mediasUrls
                .filter((url) => url !== null)
                .map((url) => ({
                  url: url,
                  alt: `Projet ${project.title} capture d'écran`,
                }))
            : undefined,
        },
        links: {
          deleteMany: {
            projectId: ID,
            url: { notIn: links?.map((link) => link.url) },
          },
          upsert: links?.map((link, index) => ({
            where: { url: link.url }, // Pas besoin d'utiliser l'index ici
            update: {
              url: link.url,
              title: link.title,
              inNav: link.inNav === "on", // Convertit "on" en un booléen
              iconId: link.iconId || null,
              order: index + 1, // Utilise l'index pour attribuer un ordre
            },
            create: {
              url: link.url,
              title: link.title,
              inNav: link.inNav === "on", // Idem ici
              iconId: link.iconId || null,
              order: index + 1, // Utilise l'index pour attribuer un ordre
            },
          })),
        },
        skills: {
          connect: skills?.map((id) => ({ id })),
          disconnect: skillDisconnect?.map((id) => ({ id })),
        },
      },
    });
    revalidatePath("/dashboard/projects");
    revalidatePath("/pages/projects");
    return updatedProject;
  });

export const deleteProjectAction = authentificationAction
  .schema(ProjectDeleteSchema)
  .action(async ({ parsedInput: { ...project } }) => {
    if (project?.cover && project.cover.url) {
      await handleImageDelete(project.cover);
    }
    if (project?.medias && project.medias.length > 0) {
      await Promise.all(
        project.medias.map(async (media) => {
          await handleImageDelete(media);
        })
      );
    }
    const deletedProject = await prisma.project.delete({
      where: { id: project.ID },
    });
    revalidatePath("/dashboard/projects");
    revalidatePath("/pages/projects");
    return deletedProject;
  });
