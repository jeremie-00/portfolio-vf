import { toast } from "@/hooks/use-toast";
import { SectionPage } from "@prisma/client";

export function ToastSectionAction(res: {
  actionType?: "creer" | "modifier" | "supprimer";
  data?: SectionPage;
  serverError?: string;
  validationErrors?: {
    _errors?: string[] | undefined;
    medias?: { _errors?: string[] | undefined } | undefined;
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
      ...(res.validationErrors.medias?._errors || []),
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
    message = `Section ${res.data.type} ${res.actionType} avec succès.`;
  }

  // Affichage du toast
  return toast({
    description: message,
    variant: res.data ? "default" : "destructive",
  });
}

export function ToastDeleteFormSectionAction(res: {
  data?: {
    id: string;
    text: string;
    sectionPageId: string | null;
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
    message = `Suppression ${res.data.text} avec succès.`;
  }

  // Affichage du toast
  return toast({
    description: message,
    variant: res.data ? "default" : "destructive",
  });
}
