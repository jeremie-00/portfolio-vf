"use server";

import { createSkillAction, updateSkillAction } from "./skill.action";

export const upsertSkillAction = async (formData: FormData) => {
  const result = await (formData.get("actionType") === "modifier"
    ? updateSkillAction(formData)
    : createSkillAction(formData));
  return result;
};
