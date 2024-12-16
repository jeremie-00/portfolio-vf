import { toast } from "@/hooks/use-toast";
import { Skill } from "@prisma/client";

export function ToastSkillAction(res: {
  actionType?: "creer" | "modifier" | "supprimer";
  data?: Skill;
  serverError?: string;
  validationErrors?: {
    ID?: { _errors?: string[] };
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
    const errors = [...(res.validationErrors.title?._errors || [])];

    message =
      errors.length > 0
        ? errors.join(" ")
        : "Des erreurs de validation sont survenues.";
  }
  // Message de succès
  else if (res.data) {
    message = `Compétence ${res.data.title} ${res.actionType} avec succès.`;
  }

  // Affichage du toast
  return toast({
    description: message,
    variant: res.data ? "default" : "destructive",
  });
}
