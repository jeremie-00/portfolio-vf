"use server";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { extname } from "path";
import prisma from "./prisma";

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
export async function handleFileUpload(
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

export async function handleImageDelete(image: {
  id?: string | undefined;
  url?: string | undefined;
}) {
  try {
    const { url, id } = image;
    // Supprimer l'image du stockage Vercel
    if (url) await del(url);
    await prisma.imageFile.delete({
      where: { id },
    });
    console.log("Image supprimée avec succès");
    revalidatePath("/");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image:", error);
  }
}
