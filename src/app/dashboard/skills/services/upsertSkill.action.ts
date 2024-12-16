"use server";

import { revalidatePath } from "next/cache";
import { createSkillAction, updateSkillAction } from "./skill.action";

export const upsertSkillAction = async (formData: FormData) => {
  const result = await (formData.get("actionType") === "modifier"
    ? updateSkillAction(formData)
    : createSkillAction(formData));
  revalidatePath("/dashboard/skill");
  revalidatePath("/pages/skill");
  return result;
};
