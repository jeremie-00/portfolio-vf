"use server";
import prisma from "@/lib/prisma";
import { authentificationAction } from "@/lib/safe-action";
import { IconIdSchema, IconSchema } from "@/types/zodType";
import { revalidatePath } from "next/cache";

export const getAllIconsAction = async () => {
  const allIcons = await prisma.icon.findMany({
    include: { Link: true },
  });
  return allIcons;
};

export const getIconByIdAction = async (id: string) => {
  const icon = await prisma.icon.findUnique({
    where: { id },
    include: { Link: true },
  });
  return icon;
};

export const createIconAction = authentificationAction
  .schema(IconSchema)
  .action(async ({ parsedInput: { ...icon } }) => {
    const name = icon.name.charAt(0).toUpperCase() + icon.name.slice(1);
    const createdIcon = await prisma.icon.create({
      data: {
        name,
      },
    });
    revalidatePath("/", "layout");
    return createdIcon;
  });

export const updateIconAction = authentificationAction
  .schema(IconSchema)
  .action(async ({ parsedInput: { ...icon } }) => {
    const updatedIcon = await prisma.icon.update({
      where: { id: icon.ID },
      data: {
        name: icon.name,
      },
    });

    revalidatePath("/", "layout");
    return updatedIcon;
  });

export const deleteIconAction = authentificationAction
  .schema(IconSchema)
  .action(async ({ parsedInput: { ...icon } }) => {
    const deletedIcon = await prisma.icon.delete({
      where: { id: icon.ID },
    });
    revalidatePath("/", "layout");
    return deletedIcon;
  });

export const deleteIconByIdAction = authentificationAction
  .schema(IconIdSchema)
  .action(async ({ parsedInput: { ...icon } }) => {
    const deletedIcon = await prisma.icon.delete({
      where: { id: icon.ID },
    });
    revalidatePath("/", "layout");
    return deletedIcon;
  });
