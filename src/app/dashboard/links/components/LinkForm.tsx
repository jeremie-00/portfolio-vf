"use client";
import { SubmitButton } from "@/app/components/buttons/SubmitButton";
import { CardForm, CardSwitch } from "@/app/components/Cards";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { ToastLinkAction } from "@/app/dashboard/links/components/ToastLink";
import { FullIcon, FullLink } from "@/types/prismaTypes";
import Form from "next/form";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { IconPicker } from "../../icons/components/IconPicker";
import { upsertLinkAction } from "../services/upsertLink.action";
interface LinksProps {
  isCreate: boolean;
  link: FullLink | null;
  icons: FullIcon[];
}

export default function LinkForm({ isCreate, link, icons }: LinksProps) {
  const [linkCount, setLinkCount] = useState(1);

  const [iconId, setIconId] = useState<string>(
    isCreate ? "" : link?.icon?.name || ""
  );
  const [iconName, setIconName] = useState<string>(
    isCreate ? "" : link?.icon?.name || ""
  );

  const [inNavToggle, setInNavToggle] = useState<string>(link?.inNav || "on");
  const [isAdminToggle, setIsAdminToggle] = useState<string>(
    link?.isAdmin || ""
  );

  const BtnSubmit = () => {
    const { pending } = useFormStatus();
    return <SubmitButton pending={pending} />;
  };

  const toggleInNav = () => {
    setInNavToggle((prev) => (prev === "on" ? "" : "on"));
    if (isAdminToggle) setIsAdminToggle("");
  };

  const toggleIsAdmin = () => {
    setIsAdminToggle((prev) => (prev === "on" ? "" : "on"));
    if (inNavToggle) setInNavToggle("");
  };

  const handleIconChange = (value: string) => {
    const selectedIcon = icons.find((icon) => icon.name === value);
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setIconName(formattedValue);
    setIconId(selectedIcon?.id || iconId);
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await upsertLinkAction(formData);
    const isAction = isCreate ? "creer" : "modifier";
    // Vérification des erreurs spécifiques (serveur et validation)
    if (result?.serverError || result?.validationErrors) {
      ToastLinkAction({
        isAction,
        serverError: result?.serverError,
        validationErrors: result?.validationErrors,
      });
      return;
    }

    // Affichage du message de succès
    if (result?.data) {
      ToastLinkAction({ data: result.data, isAction });
      if (isCreate) {
        setLinkCount(linkCount + 1);
        setIconName("");
        setIconId("");
      }
    }
  };

  return (
    <div className="flex items-center justify-center p-6 gap-2">
      <CardForm
        title={isCreate ? "Création d'un lien" : "Modification du lien"}
        href="/dashboard/links"
      >
        <Form action={handleSubmit} className="grid w-full items-center gap-4">
          {!isCreate && (
            <span className="text-primary text-xl font-bold">{link?.url}</span>
          )}
          {!isCreate && <input type="hidden" name="ID" value={link?.id} />}
          <input
            type="hidden"
            name="status"
            defaultValue={isCreate ? "create" : "edit"}
          />
          <input
            type="hidden"
            name="projectId"
            value={link?.projectId || undefined}
          />
          <input type="hidden" name="iconId" value={iconId} />
          <IconPicker
            icons={icons}
            selectedIcon={iconName}
            onChange={handleIconChange}
          />
          <Input
            type="text"
            name="url"
            placeholder="URL du lien"
            defaultValue={link?.url}
          />
          <Input
            type="text"
            name="type"
            placeholder="Type du lien"
            defaultValue={link?.type || ""}
          />
          <Input
            type="text"
            name="title"
            placeholder="Title du lien"
            defaultValue={link?.title}
          />
          <Label htmlFor="order">Ordre</Label>
          <Input
            type="text"
            id="order"
            name="order"
            placeholder="Ordre"
            defaultValue={link?.order || linkCount}
          />
          <CardSwitch
            title="Afficher"
            desc="Contrôle de l'affichage du lien dans la navigation."
          >
            <Switch
              id="inNav"
              name="inNav"
              checked={inNavToggle === "on"}
              onCheckedChange={toggleInNav}
              value={inNavToggle}
            />
          </CardSwitch>
          <CardSwitch
            title="Afficher (Admin)"
            desc="Contrôle de l'affichage du lien dans le dashboard."
          >
            <Switch
              id="isAdmin"
              name="isAdmin"
              checked={isAdminToggle === "on"}
              onCheckedChange={toggleIsAdmin}
              value={isAdminToggle}
            />
          </CardSwitch>
          <div className="w-full flex justify-center p-0">
            <BtnSubmit />
          </div>
        </Form>
      </CardForm>
    </div>
  );
}
