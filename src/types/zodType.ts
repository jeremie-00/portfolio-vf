import prisma from "@/lib/prisma";
import { ActionError } from "@/lib/safe-action";
import { z } from "zod";
import { zfd } from "zod-form-data";

// Définir le schéma Zod pour valider les données du lien
export const LinkSchema = zfd.formData({
  // Validation de l'URL : doit être soit une URL valide (commençant par http/https), soit un chemin relatif
  url: z
    .string() // L'URL doit être une chaîne de caractères
    .refine((url) => /^\/.*$/.test(url) || /^https?:\/\//.test(url), {
      // Vérification de l'URL : doit commencer par '/' (chemin relatif) ou 'http'/'https'
      message: "L'URL doit être une URL valide ou un chemin relatif", // Message d'erreur si l'URL ne correspond pas au format
    }),
  title: z.string().min(1, { message: "Le titre est obligatoire" }),
  inNav: z.string().default("off"),
  isAdmin: z.string().default("off"),
  ID: z.string().optional(),
  type: z.string().optional(),
  order: z.string().optional(),
  iconId: z.string().optional(),
  projectId: z.string().optional(),
});

export const LinkIdSchema = z
  .object({
    ID: z.string(),
    url: z.string().optional(),
    title: z.string().optional(),
    inNav: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
    type: z.string().optional(),
    order: z.string().optional(),
    iconId: z.string().optional(),
    projectId: z.string().optional(),
  })
  .refine(async (data) => {
    const existingLink = await prisma.link.findUnique({
      where: { id: data.ID },
    });

    if (!existingLink) throw new ActionError("Lien introuvable.");

    return true;
  });

export const IconSchema = zfd
  .formData({
    // Champ "ID" : optionnel, utilisé pour les mises à jour
    ID: z.string().optional(),
    // Champ "action" : optionnel, utilisé pour définir l'action (ex : "supprimer")
    actionType: z.string().optional(),
    // Champ "name" : le nom de l'icône
    name: z
      .string() // Le nom doit être une chaîne de caractères
      .min(1, { message: "Le nom est obligatoire." }) // Le nom ne doit pas être vide
      .transform((name) => {
        // Transformation du nom : on enlève les espaces inutiles et on met la première lettre en majuscule
        const trimmedName = name.trim();
        return trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);
      }),
  })
  .refine(
    async (data) => {
      if (data.actionType === "creer") {
        const existingIconName = await prisma.icon.findFirst({
          where: { name: { equals: data.name, mode: "insensitive" } },
        });

        if (existingIconName)
          throw new ActionError("Le nom existe déjà pour une autre icône.");

        return true;
      }
      // Recherche l'icône existante dans la base de données à partir de l'ID
      const existingIcon = await prisma.icon.findUnique({
        where: { id: data.ID },
      });

      // Si aucune icône n'est trouvée, une erreur est levée
      if (!existingIcon) throw new ActionError("Icône introuvable.");

      if (data.actionType === "supprimer") return true;

      if (existingIcon?.name.toLowerCase() === data.name.toLowerCase())
        throw new ActionError("Aucun changement de nom n'a été effectué.");
      // Vérifie que le nouveau nom n'existe pas déjà pour une autre icône
      return existingIcon.name.toLowerCase() !== data.name.toLowerCase();
    },
    { message: "Le nom existe déjà pour une autre icône." }
  );

export const IconIdSchema = z
  .object({
    ID: z.string(),
    action: z.string().optional(),
    name: z.string().optional(),
  })
  .refine(async (data) => {
    const existingIcon = await prisma.icon.findUnique({
      where: { id: data.ID },
    });

    if (!existingIcon) throw new ActionError("Icône introuvable.");

    return true;
  });

export const SkillSchema = zfd
  .formData({
    // Champ "ID" : optionnel, utilisé pour les mises à jour
    ID: z.string().optional(),
    // Champ "action" : optionnel, utilisé pour définir l'action (ex : "supprimer")
    actionType: z.string().optional(),
    // Champ "title" : le titre de la compétence
    title: z
      .string() // Le titre doit être une chaîne de caractères
      .min(1, { message: "Le titre est obligatoire." }), // Le titre ne doit pas être vide
    display: z.string().optional(),
    file: z.instanceof(File).optional(),
  })
  .refine(async (data) => {
    if (data.actionType === "creer") {
      const existingSkillName = await prisma.skill.findFirst({
        where: { title: { equals: data.title, mode: "insensitive" } },
      });

      if (existingSkillName)
        throw new ActionError(
          "Le titre existe déjà pour une autre compétence."
        );

      return true;
    }
    // Recherche la compétence existante dans la base de données à partir de l'ID
    const existingSkill = await prisma.skill.findUnique({
      where: { id: data.ID },
    });

    // Si aucune compétence n'est trouvée, une erreur est levée
    if (!existingSkill) throw new ActionError("Compétence introuvable.");

    if (data.actionType === "supprimer") return true;

    /*       if (existingSkill?.title.toLowerCase() === data.title.toLowerCase())
        throw new ActionError("Aucun changement de titre n'a été effectué."); */
    // Vérifie que le nouveau titre n'existe pas déjà pour une autre compétence
    return true;
  });

export const SkillIdSchema = z
  .object({
    // Champ "ID" : optionnel, utilisé pour les mises à jour
    ID: z.string().optional(),
    imageUrl: z.string().optional(),
    imageId: z.string().optional(),
  })
  .refine(async (data) => {
    const existingSkill = await prisma.skill.findUnique({
      where: { id: data.ID },
    });

    if (!existingSkill) throw new ActionError("Compétence introuvable.");

    return true;
  });
