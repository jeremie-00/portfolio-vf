import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { createSafeActionClient, SafeActionClientOpts } from "next-safe-action";
import { authOptions } from "./authOptions";

export class ActionError extends Error {}

export const authentificationAction = createSafeActionClient({
  // Fonction de gestion des erreurs serveur
  handleServerError: (error) => {
    if (error instanceof ActionError) {
      return error.message;
    }

    // Gérer les erreurs Prisma ou autres erreurs spécifiques
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return `Le champs ${error?.meta?.target} existe déjà.`;
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
