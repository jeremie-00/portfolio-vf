import { toast } from "@/hooks/use-toast";
import { Link } from "@prisma/client";

export function Toast(res: {
  data?: Link;
  serverError?: string;
  validationErrors?: {
    url?: { _errors?: string[] };
    title?: { _errors?: string[] };
  };
}) {
  // Déclaration du message à afficher
  let message: string | string[] | undefined;

  // Gestion des erreurs serveur
  if (res.serverError) {
    message = res.serverError;
  }
  // Gestion des erreurs de validation
  else if (res.validationErrors) {
    const errors = [
      ...(res.validationErrors.url?._errors || []),
      ...(res.validationErrors.title?._errors || []),
    ];

    message =
      errors.length > 0
        ? errors.join(" ")
        : "Des erreurs de validation sont survenues.";
  }
  // Message de succès
  else if (res.data) {
    message = `Lien ${res.data.title} créé avec succès à l'URL ${res.data.url}.`;
  }

  // Affichage du toast
  return toast({
    description: message,
    variant: res.data ? "default" : "destructive",
  });
}
