"use server";
import { createLinkAction, updateLinkActionAction } from "./links.action";

import { revalidatePath } from "next/cache";

export const upsertLinkAction = async (formData: FormData) => {
  const status = formData.get("status") as string;
  const result = await (status === "edit"
    ? updateLinkActionAction(formData)
    : createLinkAction(formData));
  revalidatePath("/", "layout");

  return result;
};
