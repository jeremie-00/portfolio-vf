import { Button } from "@/components/ui/button";
import { Check, LoaderCircle } from "lucide-react";

interface SubmitButtonProps {
  pending: boolean;
}

export function SubmitButton({ pending }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={pending} size="icon">
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
