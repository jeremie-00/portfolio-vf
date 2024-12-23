import { toast } from "@/hooks/use-toast";
import { SentMessageInfo } from "nodemailer";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";

export function ToastContactAction(res: {
  data?: SentMessageInfo | { error: string };
  serverError?: string;
  validationErrors?:
    | {
        email?:
          | {
              _errors?: string[] | undefined;
            }
          | undefined;
        lastName?:
          | {
              _errors?: string[] | undefined;
            }
          | undefined;
        firstName?:
          | {
              _errors?: string[] | undefined;
            }
          | undefined;
        message?:
          | {
              _errors?: string[] | undefined;
            }
          | undefined;
        _errors?: string[] | undefined;
      }
    | undefined;
}) {
  // Déclaration du message à afficher
  let title:
    | string
    | (string & ReactElement<unknown, string | JSXElementConstructor<string>>)
    | (string & Iterable<ReactNode>)
    | (string & ReactPortal)
    | (string & Promise<string>)
    | undefined;
  let message: string | string[] | undefined;

  // Gestion des erreurs serveur
  if (res.serverError) {
    title = "😒Oups... ";
    message = res.serverError;
  }
  // Gestion des erreurs de validation
  else if (res.validationErrors) {
    title = "⚠️ Attention... ";
    const errors = [
      ...(res.validationErrors.email?._errors || []),
      ...(res.validationErrors.lastName?._errors || []),
      ...(res.validationErrors.firstName?._errors || []),
      ...(res.validationErrors.message?._errors || []),
      ...(res.validationErrors._errors || []),
    ];

    message =
      errors.length > 0
        ? errors.join(" ")
        : "Des erreurs de validation sont survenues.";
  }
  // Message de succès
  else if (res.data) {
    title = `🎉 Votre e-mail a été envoyé avec succès ! 🚀`;
    message = `Merci de m'avoir contacté, je reviendrai vers vous très vite ! 😊`;
  }

  // Affichage du toast
  return toast({
    title: title,
    description: message,
    variant: res.data ? "default" : "destructive",
  });
}
