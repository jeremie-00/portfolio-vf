import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { createSafeActionClient, SafeActionClientOpts } from "next-safe-action";
import { authOptions } from "./authOptions";

export class ActionError extends Error {}

export const contactAction = createSafeActionClient({
  handleContactError(error: ActionError) {
    if (error instanceof ActionError) {
      console.log("error gdfg", error.message);
      return error.message;
    }
    return "Oh no, une erreur est survenue.";
  },
} as SafeActionClientOpts<string, undefined, undefined>);

export const authentificationAction = createSafeActionClient({
  // Fonction de gestion des erreurs serveur
  handleServerError: (error) => {
    if (error instanceof ActionError) {
      return error.message;
    }

    // Gérer les erreurs Prisma ou autres erreurs spécifiques
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Gérer d'autres erreurs Prisma
      switch (error.code) {
        case "P2002":
          return `Le champ ${error?.meta?.target} existe déjà.`;
        case "P2000":
          return `Erreur de validation de la base de données : ${error.message}`;
        case "P2025":
          return `Enregistrement non trouvé : ${error.message}`;
        case "P2023":
          return `Erreur de relation entre les tables : ${error.message}`;
        default:
          return `Erreur Prisma : ${error.message}`;
      }
    }

    return "Oh no, generic error";
  },
  // Middleware pour vérifier l'authentification
  middleware: async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      throw new ActionError("User not authenticated.");
    }

    return session.user.id;
  },
  // Ajoutez d'autres propriétés que vous souhaitez configurer ici
} as SafeActionClientOpts<string, undefined, undefined>);
