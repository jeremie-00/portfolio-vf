import { getServerSession } from "next-auth";
import { createSafeActionClient, SafeActionClientOpts } from "next-safe-action";
import { authOptions } from "./authOptions";

export const actionClient = createSafeActionClient();

// Middleware pour vérifier l'authentification
export const authentificationAction = createSafeActionClient({
  middleware: async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      throw new Error("User not authenticated");
    }

    return session.user.id;
  },
  // Ajoutez d'autres propriétés que vous souhaitez configurer ici
} as SafeActionClientOpts<string, undefined, undefined>);
