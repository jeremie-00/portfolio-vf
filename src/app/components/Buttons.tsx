import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import DynamicIcon from "../dashboard/icons/components/DynamicIcon";
interface ButtonProps {
  pending: boolean;
}

export function SubmitButton({ pending }: ButtonProps) {
  return (
    <Button
      type="submit"
      disabled={pending}
      size="icon"
      name="actionType"
      value="creer"
    >
      {pending ? (
        <DynamicIcon name="LoaderCircle" className="animate-spin" />
      ) : (
        <DynamicIcon name="Check" />
      )}
    </Button>
  );
}

export function UpdateButton({ pending }: ButtonProps) {
  return (
    <Button
      type="submit"
      disabled={pending}
      size="icon"
      variant="secondary"
      name="actionType"
      value="modifier"
    >
      {pending ? (
        <DynamicIcon name="LoaderCircle" className="animate-spin" />
      ) : (
        <DynamicIcon name="Pencil" />
      )}
    </Button>
  );
}

export function DeleteAlerteButton({
  actionButtonDelete,
  pendingDelete,
  variant = "destructive",
}: {
  actionButtonDelete: () => void;
  pendingDelete: boolean;
  variant?:
    | "destructive"
    | "default"
    | "secondary"
    | "ghost"
    | "link"
    | "unstyled";
}) {
  const handleDelete = async () => {
    actionButtonDelete();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size="icon" disabled={pendingDelete}>
          {pendingDelete ? (
            <DynamicIcon name="LoaderCircle" className="animate-spin" />
          ) : (
            <DynamicIcon name="Trash2" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="AlertDialogContent">
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Cela supprimera définitivement les
            données du serveurs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDelete}
              disabled={pendingDelete}
              variant="destructive"
              size="default"
            >
              {pendingDelete ? (
                <DynamicIcon name="LoaderCircle" className="animate-spin" />
              ) : (
                "Supprimer"
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
