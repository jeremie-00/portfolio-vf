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
import { Check, LoaderCircle, Pencil, Trash2 } from "lucide-react";
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
        <LoaderCircle
          className="animate-spin"
          style={{ width: "26px", height: "26px" }}
        />
      ) : (
        <Check
          style={{ width: "26px", height: "26px" }}
          color="#ffffff"
          strokeWidth={1.5}
          absoluteStrokeWidth
        />
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
        <LoaderCircle
          className="animate-spin"
          style={{ width: "26px", height: "26px" }}
        />
      ) : (
        <Pencil
          style={{ width: "26px", height: "26px" }}
          color="#ffffff"
          strokeWidth={1.5}
          absoluteStrokeWidth
        />
      )}
    </Button>
  );
}

export function DeleteAlerteButton({
  actionButtonDelete,
  pendingDelete,
}: {
  actionButtonDelete: () => void;
  pendingDelete: boolean;
}) {
  const handleDelete = async () => {
    actionButtonDelete();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" disabled={pendingDelete}>
          {pendingDelete ? (
            <LoaderCircle
              className="animate-spin"
              style={{ width: "26px", height: "26px" }}
            />
          ) : (
            <Trash2
              style={{ width: "26px", height: "26px" }}
              color="#ffffff"
              strokeWidth={1}
            />
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
                <LoaderCircle
                  className="animate-spin"
                  style={{ width: "26px", height: "26px" }}
                />
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
