import { Button } from "@/components/ui/button";
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
      name="action"
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

export function DeleteButton({ pending }: ButtonProps) {
  return (
    <Button
      type="submit"
      disabled={pending}
      size="icon"
      variant="destructive"
      name="action"
      value="supprimer"
    >
      {pending ? (
        <LoaderCircle
          className="animate-spin"
          style={{ width: "26px", height: "26px" }}
        />
      ) : (
        <Trash2
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
      name="action"
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
