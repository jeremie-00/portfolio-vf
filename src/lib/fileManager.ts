"use server";
import { ImageDeleteSchema, ImageUploadSchema } from "@/types/zodType";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { extname } from "path";
import prisma from "./prisma";
import { ActionError, authentificationAction } from "./safe-action";

// Fonction pour générer un nom de fichier unique
const generateUniqueFileName = (originalName: string) => {
  const fileExtension = extname(originalName);
  return `${Date.now()}-${Math.round(Math.random() * 1e4)}${fileExtension}`;
};

export const handleFileUpload = authentificationAction
  .schema(ImageUploadSchema)
  .action(async ({ parsedInput: { ...fileUpload } }): Promise<string> => {
    const { file, folder } = fileUpload;
    const filename = generateUniqueFileName(file.name);
    const blob = await put(`${folder}/${filename}`, file, {
      access: "public",
    });
    if (!blob.url) {
      throw new ActionError(
        "Erreur lors de la création de l'image avec Vercel."
      );
    }
    return blob.url;
  });

export const handleImageDelete = authentificationAction
  .schema(ImageDeleteSchema)
  .action(async ({ parsedInput: { ...image } }) => {
    if (image.url) await del(image.url);
    const deletedImage = await prisma.imageFile.delete({
      where: { id: image.ID },
    });
    revalidatePath("/");
    return deletedImage;
  });
