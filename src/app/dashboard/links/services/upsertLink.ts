"use server";
import { createLink, updateLink } from "./links.action";

import { revalidatePath } from "next/cache";

export const upsertLink = async (formData: FormData) => {
  const status = formData.get("status") as string;
  const res = await (status === "edit"
    ? updateLink(formData)
    : createLink(formData));
  revalidatePath("/", "layout");

  console.log("Résultat de l'action :", res);

  return res;
};
