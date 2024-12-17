import { toast } from "@/hooks/use-toast";
import { Project } from "@prisma/client";

export function ToastProjectAction(res: {
  actionType?: "creer" | "modifier" | "supprimer";
  data?: Project;
  serverError?: string;
  validationErrors?:
    | {
        url?: { _errors?: string[] };
        title?: { _errors?: string[] };
        _errors?: string[] | undefined;
        cover?:
          | {
              _errors?: string[] | undefined;
              id?:
                | {
                    _errors?: string[] | undefined;
                  }
                | undefined;
              url?:
                | {
                    _errors?: string[] | undefined;
                  }
                | undefined;
            }
          | undefined;
        medias?:
          | {
              _errors?: string[] | undefined;
            }
          | undefined;
        ID?:
          | {
              _errors?: string[] | undefined;
            }
          | undefined;
      }
    | undefined;
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
    message = `Projet ${res.data.title} ${res.actionType} avec succès.`;
  }

  // Affichage du toast
  return toast({
    description: message,
    variant: res.data ? "default" : "destructive",
  });
}
