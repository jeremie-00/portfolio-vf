import { z } from "zod";
import { zfd } from "zod-form-data";

// Définir le schéma Zod pour valider les données du lien
export const LinkSchema = zfd.formData({
  url: z
    .string()
    .refine((url) => /^\/.*$/.test(url) || /^https?:\/\//.test(url), {
      message: "L'URL doit être une URL valide ou un chemin relatif",
    }),
  title: z.string().min(1, { message: "Le titre est requis" }),
  inNav: z.string().default("off"),
  isAdmin: z.string().default("off"),
  id: z.string().optional(),
  type: z.string().optional(),
  order: z.string().optional(),
  iconId: z.string().optional(),
  projectId: z.string().optional(),
});

export const LinkIdSchema = z.object({
  id: z.string(),
});
