import { toast } from "@/hooks/use-toast";

export function ToastDeleteImagesAction(res: {
  data?: {
    id: string;
    url: string;
  };
  serverError?: string;
  validationErrors?: {
    _errors?: string[] | undefined;
    ID?: { _errors?: string[] | undefined } | undefined;
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
      ...(res.validationErrors.ID?._errors || []),
      ...(res.validationErrors._errors || []),
    ];

    message =
      errors.length > 0
        ? errors.join(" ")
        : "Des erreurs de validation sont survenues.";
  }
  // Message de succès
  else if (res.data) {
    message = `Suppression de l'image avec succès.`;
  }

  // Affichage du toast
  return toast({
    description: message,
    variant: res.data ? "default" : "destructive",
  });
}
