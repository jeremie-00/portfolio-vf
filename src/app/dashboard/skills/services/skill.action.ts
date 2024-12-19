"use server";
import { handleFileUpload, handleImageDelete } from "@/lib/fileManager";
import prisma from "@/lib/prisma";
import { ActionError, authentificationAction } from "@/lib/safe-action";
import { SkillIdSchema, SkillSchema } from "@/types/zodType";
import { revalidatePath } from "next/cache";

export async function getAllSkillsAction() {
  const skills = await prisma.skill.findMany({
    include: { projects: true, image: true },
  });
  return skills;
}

export async function getSkillByIdAction(id: string) {
  const skill = await prisma.skill.findUnique({
    where: {
      id,
    },
    include: { projects: true, image: true },
  });

  if (!skill) {
    throw new ActionError("Skill not found");
  }

  return skill;
}

export const createSkillAction = authentificationAction
  .schema(SkillSchema)
  .action(async ({ parsedInput: { ...skill } }) => {
    const imageUrl =
      skill.file &&
      ((await handleFileUpload({
        file: skill.file,
        folder: "cover",
      })) as string);

    const display = skill.display === "on";
    const createdSkill = await prisma.skill.create({
      data: {
        title: skill.title,
        display: display,
        image: imageUrl
          ? { create: { url: imageUrl, alt: `Logo ${skill.title}` } }
          : undefined,
      },
    });
    revalidatePath("/dashboard/skill");
    revalidatePath("/pages/skill");
    return createdSkill;
  });

export const updateSkillAction = authentificationAction
  .schema(SkillSchema)
  .action(async ({ parsedInput: { ...skill } }) => {
    const exitingSkill =
      skill && skill.ID ? await getSkillByIdAction(skill.ID) : null;

    const imageUrl =
      skill.file &&
      ((await handleFileUpload({
        file: skill.file,
        folder: "cover",
      })) as string);

    if (exitingSkill?.image && imageUrl)
      await handleImageDelete(exitingSkill.image);

    const display = skill.display === "on";

    const updatedSkill = await prisma.skill.update({
      where: { id: skill.ID },
      data: {
        title: skill.title,
        display: display,
        image: imageUrl
          ? {
              upsert: {
                update: { url: imageUrl, alt: `Logo ${skill.title}` },
                create: { url: imageUrl, alt: `Logo ${skill.title}` },
              },
            }
          : undefined,
      },
    });
    revalidatePath("/dashboard/skill");
    revalidatePath("/pages/skill");
    return updatedSkill;
  });

export const deleteSkillAction = authentificationAction
  .schema(SkillIdSchema)
  .action(async ({ parsedInput: { ...skill } }) => {
    if (skill.imageId && skill.imageUrl) {
      await handleImageDelete({ ID: skill.imageId, url: skill.imageUrl });
    }
    const deletedSkill = await prisma.skill.delete({
      where: { id: skill.ID },
    });
    revalidatePath("/dashboard/skill");
    revalidatePath("/pages/skill");
    return deletedSkill;
  });
