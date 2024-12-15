"use client";

import { deleteLinkByIdAction } from "@/app/dashboard/links/services/links.action";
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
import { toast } from "@/hooks/use-toast";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteButtonProps {
  id: string[];
  setRowSelection: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

export function DeleteButton({ id, setRowSelection }: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true); // Active le mode chargement
    try {
      await Promise.all(id.map((id) => deleteLinkByIdAction({ id })));
    } catch {
      setIsLoading(false);
    } finally {
      setIsLoading(false); // Désactive le mode chargement après la suppression
      setRowSelection({});
      toast({
        description: "Les liens ont été supprimés avec succès",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2
            style={{ width: "26px", height: "26px" }}
            color="#ffffff"
            strokeWidth={1}
          />
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
              onClick={handleDelete}
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
  );
}
