"use client";
import { SubmitButton, UpdateButton } from "@/app/components/Buttons";
import { CardForm, CardSwitch } from "@/app/components/Cards";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { SingleImageUpload } from "@/app/components/UploadImage/SingleImageUpload";
import { ToastLinkAction } from "@/app/dashboard/links/components/ToastLink";
import { FullIcon, FullLink } from "@/types/prismaTypes";
import Form from "next/form";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { IconPicker } from "../../icons/components/IconPicker";
import { upsertLinkAction } from "../services/upsertLink.action";
interface LinksProps {
  isCreate: boolean;
  link: FullLink | null;
  icons: FullIcon[];
}

export default function LinkForm({ isCreate, link, icons }: LinksProps) {
  const singleImageUploadRef = useRef<{ resetFile: () => void } | null>(null);
  const [linkCount, setLinkCount] = useState(1);

  const [iconId, setIconId] = useState<string>(
    isCreate ? "" : link?.icon?.id || ""
  );

  const [iconName, setIconName] = useState<string>(
    isCreate ? "" : link?.icon?.name || ""
  );

  const [inNavToggle, setInNavToggle] = useState<boolean | undefined | null>(
    true
  );

  const [isAdminToggle, setIsAdminToggle] = useState<
    boolean | undefined | null
  >(false);

  useEffect(() => {
    if (link) {
      setInNavToggle(link?.inNav);
      setIsAdminToggle(link?.isAdmin);
    }
  }, [link?.inNav, link?.isAdmin, link]);

  const BtnSubmit = () => {
    const { pending } = useFormStatus();

    return isCreate ? (
      <SubmitButton pending={pending} />
    ) : (
      <UpdateButton pending={pending} />
    );
  };

  const toggleInNav = () => {
    setInNavToggle((prev) => !prev);
    if (isAdminToggle) setIsAdminToggle(false);
  };

  const toggleIsAdmin = () => {
    setIsAdminToggle((prev) => !prev);
    if (inNavToggle) setInNavToggle(false);
  };

  const handleIconChange = (value: string) => {
    const selectedIcon = icons.find((icon) => icon.name === value);
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setIconName(formattedValue);
    setIconId(selectedIcon?.id || iconId);
  };

  const handleSubmit = async (formData: FormData) => {
    console.log(formData.get("cover"));
    const result = await upsertLinkAction(formData);
    const actionType = isCreate ? "creer" : "modifier";
    // Vérification des erreurs spécifiques (serveur et validation)
    if (result?.serverError || result?.validationErrors) {
      ToastLinkAction({
        actionType,
        serverError: result?.serverError,
        validationErrors: result?.validationErrors,
      });
      return;
    }

    // Affichage du message de succès
    if (result?.data) {
      ToastLinkAction({ data: result.data, actionType });
      if (isCreate) {
        setLinkCount(linkCount + 1);
        setIconName("");
        setIconId("");
      }
    }
  };

  return (
    <CardForm
      title={isCreate ? "Création d'un lien" : "Modification du lien"}
      name={link?.title}
    >
      <Form action={handleSubmit} className="grid w-full items-center gap-4">
        {!isCreate && <input type="hidden" name="ID" value={link?.id} />}

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
        <SingleImageUpload
          ref={singleImageUploadRef}
          label="Image du lien"
          image={link ? link.image : null}
          isCreate={isCreate}
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
          type="number"
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
            checked={inNavToggle === true}
            onCheckedChange={toggleInNav}
          />
        </CardSwitch>
        <CardSwitch
          title="Afficher (Admin)"
          desc="Contrôle de l'affichage du lien dans le dashboard."
        >
          <Switch
            id="isAdmin"
            name="isAdmin"
            checked={isAdminToggle === true}
            onCheckedChange={toggleIsAdmin}
          />
        </CardSwitch>
        <div className="w-full flex justify-center p-0">
          <BtnSubmit />
        </div>
      </Form>
    </CardForm>
  );
}
