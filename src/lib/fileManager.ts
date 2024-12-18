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

// Fonction pour valider le type et la taille du fichier
const isValidFile = (file: File) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/webp",
  ]; // Adaptable selon vos besoins
  const maxSize = 5 * 1024 * 1024; // Taille maximale (5 Mo)
  return allowedTypes.includes(file.type) && file.size <= maxSize;
};

// Fonction de gestion du téléchargement
export async function handleFileUpload2(
  file: File,
  folder: string
): Promise<string | null> {
  if (!isValidFile(file)) {
    throw new Error(
      "Le fichier n'est pas valide. Types autorisés : JPEG, PNG, GIF, SVG. Taille max : 5 Mo."
    );
  }
  const filename = generateUniqueFileName(file.name);
  const blob = await put(`${folder}/${filename}`, file, { access: "public" });
  if (!blob.url) {
    throw new Error("Erreur lors de la création de l'image avec Vercel.");
  }
  return blob.url;
}

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
