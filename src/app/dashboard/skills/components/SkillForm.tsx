"use client";

import { SubmitButton, UpdateButton } from "@/app/components/Buttons";
import { CardForm, CardSwitch } from "@/app/components/Cards";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageFile, Skill } from "@prisma/client";
import Form from "next/form";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { upsertSkillAction } from "../services/upsertSkill.action";
import { ToastSkillAction } from "./ToastSkill";

interface SkillFormProps {
  skill: Skill | null;
  image: ImageFile | null;
  isCreate: boolean;
}

export default function SkillForm({ skill, image, isCreate }: SkillFormProps) {
  const { id, title, display } = skill || {};

  const [url, setUrl] = useState(image?.url || "");

  const BtnSubmit = () => {
    const { pending } = useFormStatus();

    return isCreate ? (
      <SubmitButton pending={pending} />
    ) : (
      <UpdateButton pending={pending} />
    );
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await upsertSkillAction(formData);
    const actionType = isCreate ? "creer" : "modifier";
    if (result?.serverError || result?.validationErrors) {
      ToastSkillAction({
        actionType,
        serverError: result?.serverError,
        validationErrors: result?.validationErrors,
      });
    }
    if (result?.data) {
      ToastSkillAction({ data: result.data, actionType });
    }
  };

  useEffect(() => {
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  // Fonction pour gérer l'affichage de l'aperçu de l'image sélectionnée
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newUrl = URL.createObjectURL(file);
      setUrl(newUrl); // Mise à jour de l'URL pour afficher l'aperçu
    }
  };

  return (
    <div className="flex">
      <CardForm
        title={
          isCreate
            ? "Création d'une compétence"
            : "Modification de la compétence"
        }
        href="/dashboard/skill"
      >
        <Form
          action={handleSubmit}
          className="flex flex-col w-full items-left gap-4 relative"
        >
          <div
            className={`w-[100px] h-[100px] flex border-2 ${
              url ? "border-primary" : "border-input"
            } rounded-lg p-1 `}
          >
            {url ? (
              <Image
                src={url}
                alt="Aperçu de l'image"
                width={80}
                height={80}
                className="rounded-sm object-cover w-full h-full"
              />
            ) : null}
          </div>
          {!isCreate && (
            <span className="text-primary text-2xl font-bold">
              {skill?.title}
            </span>
          )}
          <input type="hidden" name="ID" defaultValue={id} />
          <input
            type="hidden"
            name="status"
            defaultValue={isCreate ? "create" : "edit"}
          />

          <Label htmlFor="title">Nom de la compétence</Label>
          <Input
            required
            type="text"
            name="title"
            id="title"
            placeholder="Nom"
            className="w-full"
            defaultValue={title}
          />

          <Label htmlFor="file">Image</Label>
          <Input
            type="file"
            name="file"
            id="file"
            onChange={handleImageChange}
          />

          <CardSwitch
            title="Afficher"
            desc="Contrôle de l'affichage de la compétence sur la page."
          >
            <Switch
              id="display"
              name="display"
              defaultChecked={display ?? true}
            />
          </CardSwitch>

          <div className="w-full flex flex-col justify-center items-center p-0 mt-2">
            <BtnSubmit />
          </div>
        </Form>
      </CardForm>
    </div>
  );
}
