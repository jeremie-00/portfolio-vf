"use server";
import { handleFileUpload, handleImageDelete } from "@/lib/fileManager";
import prisma from "@/lib/prisma";
import { authentificationAction } from "@/lib/safe-action";
import {
  SectionDeleteSchema,
  SectionSchema,
  TextSectionDeleteSchema,
} from "@/types/zodType";

import { revalidatePath } from "next/cache";

const revalidatePaths = () => {
  revalidatePath("/dashboard/sectionPage");
  revalidatePath("/");
};

export const getAllSectionsAction = async () => {
  const allSectionsPages = await prisma.sectionPage.findMany({
    orderBy: {
      order: "asc",
    },
    include: { images: true, titles: true, contents: true },
  });
  return allSectionsPages;
};

export const getSectionByIdAction = async (id: string) => {
  const sectionPage = await prisma.sectionPage.findFirst({
    where: { id },
    include: { images: true, titles: true, contents: true },
  });
  return sectionPage;
};

export const getSectionByTypeAction = async (type: string) => {
  const sectionPage = await prisma.sectionPage.findFirst({
    where: { type },
    include: { images: true, titles: true, contents: true },
  });
  return sectionPage;
};

export const createSectionPageAction = authentificationAction
  .schema(SectionSchema)
  .action(async ({ parsedInput: { ...section } }) => {
    const mediasUrls = await Promise.all(
      section.medias?.map(async (media) => {
        if (media.size > 0) {
          const res = await handleFileUpload({ file: media, folder: "medias" });
          return res?.data as string;
        }
        return null;
      }) ?? []
    );

    const createdSection = await prisma.sectionPage.create({
      data: {
        type: section.type,
        order: parseInt(section.order),
        titles: {
          create: section.titles.map((text: string) => ({
            text,
          })),
        },
        contents: {
          create: section.contents.map((text: string) => ({
            text,
          })),
        },
        images: {
          create: mediasUrls
            ? mediasUrls
                .filter((url) => url !== null)
                .map((url) => ({
                  url: url,
                  alt: `Image section`,
                }))
            : undefined,
        },
      },
    });
    revalidatePaths();
    return createdSection;
  });

export const updateSectionPageAction = authentificationAction
  .schema(SectionSchema)
  .action(async ({ parsedInput: { ...section } }) => {
    const existingdataSectionPage = section.id
      ? await getSectionByIdAction(section.id)
      : null;
    if (!existingdataSectionPage) {
      throw new Error("Section non trouvé.");
    }

    const mediasUrls = await Promise.all(
      section.medias?.map(async (media) => {
        if (media.size > 0) {
          const res = await handleFileUpload({ file: media, folder: "medias" });
          return res?.data as string;
        }
        return null;
      }) ?? []
    );

    const updatedSection = await prisma.sectionPage.update({
      where: { id: section.id },
      data: {
        type: section.type,
        order: parseInt(section.order),
        titles: {
          upsert: section.titles.map((text, index) => ({
            where: {
              id: existingdataSectionPage.titles[index]?.id || "0",
            },
            update: {
              text,
            },
            create: {
              text,
            },
          })),
        },
        contents: {
          upsert: section.contents.map((text, index) => ({
            where: {
              id: existingdataSectionPage.contents[index]?.id || "0",
            },
            update: {
              text,
            },
            create: {
              text,
            },
          })),
        },
        images: {
          create: mediasUrls
            ? mediasUrls
                .filter((url) => url !== null)
                .map((url) => ({
                  url: url,
                  alt: `Image ${section.type}`,
                }))
            : undefined,
        },
      },
    });
    revalidatePaths();
    return updatedSection;
  });

export const deleteSectionAction = authentificationAction
  .schema(SectionDeleteSchema)
  .action(async ({ parsedInput: { ...section } }) => {
    if (section?.medias && section.medias.length > 0) {
      await Promise.all(
        section.medias.map(async (media) => {
          await handleImageDelete(media);
        })
      );
    }
    const deletedSection = await prisma.sectionPage.delete({
      where: { id: section.ID },
    });
    revalidatePaths();
    return deletedSection;
  });

export const deleteTitleSectionAction = authentificationAction
  .schema(TextSectionDeleteSchema)
  .action(async ({ parsedInput: { ID } }) => {
    const deletedTitle = await prisma.title.delete({
      where: { id: ID },
    });
    revalidatePaths();
    return deletedTitle;
  });

export const deleteContentSectionAction = authentificationAction
  .schema(TextSectionDeleteSchema)
  .action(async ({ parsedInput: { ID } }) => {
    const deletedContent = await prisma.content.delete({
      where: { id: ID },
    });
    revalidatePaths();
    return deletedContent;
  });
