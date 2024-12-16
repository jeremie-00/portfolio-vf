"use client";
import {
  DeleteAlerteButton,
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
  deleteIconByIdAction,
  updateIconAction,
} from "../services/icons.action";
import DynamicIcon from "./DynamicIcon";
import { IconPicker } from "./IconPicker";

interface IconSettingsProps {
  icons: FullIcon[];
}

const ActionButtons = ({
  iconId,
  actionFn,
  pendingDelete,
}: {
  iconId: string;
  actionFn: () => void;
  pendingDelete: boolean;
}) => {
  const { pending } = useFormStatus();
  if (iconId) {
    return (
      <>
        <UpdateButton pending={pending} />
        <DeleteAlerteButton
          actionButtonDelete={actionFn}
          pendingDelete={pendingDelete}
        />
      </>
    );
  }
  return <SubmitButton pending={pending} />;
};

export default function IconForm({ icons }: IconSettingsProps) {
  const [iconName, setIconName] = useState<string>("");
  const [iconId, setIconId] = useState<string>("");
  const [isValidIcon, setIsValidIcon] = useState<boolean>(false);
  const [pendingDelete, setPendingDelete] = useState(false);

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
    const actionTypeForm = formData.get("actionType");
    if (
      !actionTypeForm ||
      !["creer", "modifier"].includes(actionTypeForm as string)
    ) {
      return;
    }

    let result;

    if (actionTypeForm === "creer" && isValidIcon) {
      result = await createIconAction(formData);
    } else if (actionTypeForm === "modifier" && isValidIcon) {
      result = await updateIconAction(formData);
    }

    const actionType = actionTypeForm as "creer" | "modifier";
    if (result?.serverError || result?.validationErrors) {
      ToastIconAction({
        actionType,
        serverError: result?.serverError,
        validationErrors: result?.validationErrors,
      });
    } else if (result?.data) {
      ToastIconAction({ data: result.data, actionType });
      handleReset();
    }
  };

  const handleDelete = async () => {
    setPendingDelete(true);
    const result = await deleteIconByIdAction({ ID: iconId });
    const actionType = "supprimer";
    if (!result || "errors" in result) {
      throw new Error("Erreur lors de la suppression.");
    }
    if (result?.serverError || result?.validationErrors) {
      ToastIconAction({
        actionType,
        serverError: result?.serverError,
        validationErrors: result?.validationErrors,
      });
    } else if (result?.data) {
      ToastIconAction({ data: result.data, actionType });
      handleReset();
    }
    setPendingDelete(false);
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
            type="text"
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
            <ActionButtons
              iconId={iconId}
              actionFn={handleDelete}
              pendingDelete={pendingDelete}
            />
          </div>
        </Form>
      </CardForm>
    </div>
  );
}
