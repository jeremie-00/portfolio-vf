import { toast } from "@/hooks/use-toast";
import { Icon } from "@prisma/client";

export function ToastIconAction(res: {
  isAction?: "creer" | "modifier" | "supprimer";
  data?: Icon;
  serverError?: string;
  validationErrors?: {
    name?: { _errors?: string[] };
    id?: { _errors?: string[] };
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
      ...(res.validationErrors.name?._errors || []),
      ...(res.validationErrors.id?._errors || []),
    ];

    message =
      errors.length > 0
        ? errors.join(" ")
        : "Des erreurs de validation sont survenues.";
  }
  // Message de succès
  else if (res.data) {
    message = `L'icone ${res.data.name} ${res.isAction} avec succès.`;
  }

  // Affichage du toast
  return toast({
    description: message,
    variant: res.data ? "default" : "destructive",
  });
}
