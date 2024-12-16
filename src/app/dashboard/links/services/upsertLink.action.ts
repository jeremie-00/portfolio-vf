"use server";
import { createLinkAction, updateLinkActionAction } from "./links.action";

import { revalidatePath } from "next/cache";

export const upsertLinkAction = async (formData: FormData) => {
  const status = formData.get("actionType") as string;
  console.log(status, formData);
  const result = await (status === "modifier"
    ? updateLinkActionAction(formData)
    : createLinkAction(formData));
  revalidatePath("/", "layout");

  return result;
};
