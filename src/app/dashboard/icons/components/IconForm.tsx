"use client";
import {
  DeleteButton,
  SubmitButton,
  UpdateButton,
} from "@/app/components/buttons/SubmitButton";
import { CardForm } from "@/app/components/Cards";
import { ToastIconAction } from "@/app/dashboard/icons/components/ToastIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FullIcon } from "@/types/prismaTypes";
import * as Icons from "lucide-react";
import Form from "next/form";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  createIconAction,
  deleteIconAction,
  updateIconAction,
} from "../services/icons.action";
import DynamicIcon from "./DynamicIcon";
import { IconPicker } from "./IconPicker";

interface IconSettingsProps {
  icons: FullIcon[];
  icon: FullIcon | null;
}

const ActionButtons = ({ iconId }: { iconId: string }) => {
  const { pending } = useFormStatus();
  if (iconId) {
    return (
      <>
        <UpdateButton pending={pending} />
        <DeleteButton pending={pending} />
      </>
    );
  }
  return <SubmitButton pending={pending} />;
};

export default function IconForm({ icons, icon }: IconSettingsProps) {
  const [iconName, setIconName] = useState<string>(icon?.name || "");
  const [iconId, setIconId] = useState<string>(icon?.id || "");
  const [isValidIcon, setIsValidIcon] = useState<boolean>(false);

  useEffect(() => {
    if (iconName) {
      const formattedValue =
        iconName.charAt(0).toUpperCase() + iconName.slice(1);
      const selectedIcon = icons.find((icon) => icon.name === formattedValue);
      setIsValidIcon(formattedValue in Icons);
      if (selectedIcon) {
        setIconId(selectedIcon.id);
        setIconName(selectedIcon.name);
      }
    }
  }, [iconName, icons]);

  const handleReset = () => {
    setIconName("");
    setIconId("");
    setIsValidIcon(false);
  };

  const handleInputChange = (value: string) => {
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setIsValidIcon(formattedValue in Icons);
    setIconName(formattedValue);
  };

  const handleSelectChange = (value: string) => {
    if (value !== "") {
      const selectedIcon = icons.find((icon) => icon.name === value);
      setIconName(value);
      setIconId(selectedIcon?.id || iconId);
      setIsValidIcon(selectedIcon ? selectedIcon.name in Icons : false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    const action = formData.get("action");
    if (
      !action ||
      !["creer", "modifier", "supprimer"].includes(action as string)
    ) {
      return;
    }

    let result;

    if (action === "creer" && isValidIcon) {
      result = await createIconAction(formData);
    } else if (action === "modifier" && isValidIcon) {
      result = await updateIconAction(formData);
    } else if (action === "supprimer") {
      result = await deleteIconAction(formData);
    }

    const isAction = action as "creer" | "modifier" | "supprimer";
    if (result?.serverError || result?.validationErrors) {
      ToastIconAction({
        isAction,
        serverError: result?.serverError,
        validationErrors: result?.validationErrors,
      });
    } else if (result?.data) {
      ToastIconAction({ data: result.data, isAction });
      handleReset();
    }
  };

  return (
    <div className="flex w-full h-full max-w-[400px]">
      <CardForm title="Gestion des icones">
        <Form
          action={handleSubmit}
          className="flex flex-col w-full items-left gap-12"
        >
          <div
            className={`w-[100px] h-[100px] flex items-center justify-center border-2 ${
              iconName ? "border-primary" : "border-input"
            } rounded-lg p-1`}
          >
            {iconName && isValidIcon && (
              <DynamicIcon name={iconName} size={40} className="text-primary" />
            )}
          </div>

          <Input
            type="hidden"
            name="ID"
            value={iconId}
            onChange={(e) => setIconId(e.target.value)}
            readOnly
          />

          <div className="flex items-center justify-center">
            <Input
              className={"border-r-1 rounded-r-none flex flex-1"}
              type="text"
              name="name"
              placeholder="Nom de l'icône"
              value={iconName}
              onChange={(e) => handleInputChange(e.currentTarget.value)}
              required
            />
            <Button
              type={"button"}
              variant={"outline"}
              className={
                "border-l-0 rounded-l-none hover:ring-1 hover:ring-ring"
              }
              onClick={handleReset}
            >
              <Icons.RotateCcw />
            </Button>
          </div>

          <IconPicker
            icons={icons}
            selectedIcon={isValidIcon ? iconName : ""}
            onChange={handleSelectChange}
          />

          <div className="w-full flex justify-center gap-24">
            <ActionButtons iconId={iconId} />
          </div>
        </Form>
      </CardForm>
    </div>
  );
}
