"use server";
import { createLinkAction, updateLinkActionAction } from "./links.action";

export const upsertLinkAction = async (formData: FormData) => {
  const status = formData.get("actionType") as string;
  console.log(status, formData);
  const result = await (status === "modifier"
    ? updateLinkActionAction(formData)
    : createLinkAction(formData));
  return result;
};
