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
import { LoaderCircle } from "lucide-react";

interface ImageDeleteButtonProps {
  url: string;
  file: File | null | [];
  isCreate: boolean;
  isLoading: boolean;
  fn: (url: string, mediaFiles: File | null | []) => void;
}

export function PreviewDeleteButton({ url, file, fn }: ImageDeleteButtonProps) {
  return (
    <Button
      variant={"outline"}
      size={"round"}
      onClick={() => fn(url, file)}
      className="absolute right-2 top-2"
    >
      X
    </Button>
  );
}

export function ImageDeleteButton({
  url,
  file,
  isLoading,
  fn,
}: ImageDeleteButtonProps) {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"destructive"}
            size={"round"}
            className="absolute right-2 top-2"
          >
            X
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
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
                onClick={() => fn(url, file)}
                disabled={isLoading}
                variant="destructive"
                size="default"
              >
                {isLoading ? (
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
    </div>
  );
}
