"use client";

import { CardForm } from "@/app/components/Cards";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, Trash2 } from "lucide-react";
import Form from "next/form";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  DeleteAlerteButton,
  SubmitButton,
  UpdateButton,
} from "@/app/components/Buttons";
import { MultiImageUpload } from "@/app/components/UploadImage/MultiImageUpload";
import { Button } from "@/components/ui/button";
import { FullSectionPage } from "@/types/prismaTypes";
import {
  deleteContentSectionAction,
  deleteTitleSectionAction,
} from "../services/section.action";
import { upsertSection } from "../services/upsertSection";
import {
  ToastDeleteFormSectionAction,
  ToastSectionAction,
} from "./ToastSection";

export default function SectionForm({
  section,
}: {
  section: FullSectionPage | null;
}) {
  const multiImageUploadRef = useRef<{ resetFiles: () => void } | null>(null);

  const [fieldsTitle, setFieldsTitle] = useState([{ title: "", id: "" }]);

  const handleAddFieldTitle = () => {
    setFieldsTitle([...fieldsTitle, { title: "", id: "" }]);
  };

  const [pendingDelete, setPendingDelete] = useState(false);
  const handleRemoveFieldTitle = (index: number, id: string) => {
    setPendingDelete(true);
    const removeTitle = async (id: string) => {
      const result = await deleteTitleSectionAction({
        ID: id,
      });

      if (result?.serverError || result?.validationErrors) {
        ToastDeleteFormSectionAction({
          serverError: result?.serverError,
          validationErrors: result?.validationErrors,
        });
        return;
      }

      // Affichage du message de succès
      if (result?.data) {
        ToastDeleteFormSectionAction({ data: result.data });
      }
    };
    if (section) {
      removeTitle(id);
    }
    const updatedFields = fieldsTitle.filter((_, i) => i !== index);
    setFieldsTitle(updatedFields);
    setPendingDelete(false);
  };

  const handleFieldChangeTitle = (index: number, value: string) => {
    const updatedFields = fieldsTitle.map((field, i) =>
      i === index ? { ...field, title: value } : field
    );
    setFieldsTitle(updatedFields);
  };

  const [fieldsContent, setFieldsContent] = useState([{ content: "", id: "" }]);

  const handleAddFieldContent = () => {
    setFieldsContent([...fieldsContent, { content: "", id: "" }]);
  };

  const handleRemoveFieldContent = (index: number, id: string) => {
    setPendingDelete(true);
    const removeContent = async (id: string) => {
      const result = await deleteContentSectionAction({
        ID: id,
      });

      if (result?.serverError || result?.validationErrors) {
        ToastDeleteFormSectionAction({
          serverError: result?.serverError,
          validationErrors: result?.validationErrors,
        });
        return;
      }

      // Affichage du message de succès
      if (result?.data) {
        ToastDeleteFormSectionAction({ data: result.data });
      }
    };
    if (section) {
      removeContent(id);
    }
    const updatedFields = fieldsContent.filter((_, i) => i !== index);
    setFieldsContent(updatedFields);
    setPendingDelete(false);
  };

  const handleFieldChangeContent = (index: number, value: string) => {
    const updatedFields = fieldsContent.map((field, i) =>
      i === index ? { ...field, content: value } : field
    );
    setFieldsContent(updatedFields);
  };

  useEffect(() => {
    if (section?.titles) {
      setFieldsTitle(
        section.titles.map((title) => ({ title: title.text, id: title.id }))
      );
    }
    if (section?.contents) {
      setFieldsContent(
        section.contents.map((content) => ({
          content: content.text,
          id: content.id,
        }))
      );
    }
  }, [section]);

  const handleFieldReset = () => {
    setFieldsTitle([{ title: "", id: "" }]);
    setFieldsContent([{ content: "", id: "" }]);
  };

  const BtnSubmit = () => {
    const { pending } = useFormStatus();
    return !section ? (
      <SubmitButton pending={pending} />
    ) : (
      <UpdateButton pending={pending} />
    );
  };

  const handleSubmit = async (formData: FormData) => {
    const sectionData = {
      id: String(formData.get("ID")),
      titles: formData.getAll("titles").map((v) => v.toString()),
      contents: formData.getAll("contents").map((v) => v.toString()),
      medias: formData.getAll("medias") as File[] | undefined,
      order: String(formData.get("order")) || undefined,
      type: String(formData.get("type")),
      actionType: String(formData.get("actionType")),
    };

    const result = await upsertSection(sectionData);

    const actionType = !section ? "creer" : "modifier";
    if (result?.serverError || result?.validationErrors) {
      ToastSectionAction({
        actionType,
        serverError: result?.serverError,
        validationErrors: result?.validationErrors,
      });
      return;
    }

    // Affichage du message de succès
    if (result?.data) {
      ToastSectionAction({ data: result.data, actionType });
      if (!section) {
        handleFieldReset();
        // REMISE A ZERO DES LIENS ET DES IMAGES
      }
      if (multiImageUploadRef.current) {
        multiImageUploadRef.current.resetFiles();
      }
    }
  };

  return (
    <div className="flex w-full justify-center max-w-[700px]">
      <CardForm
        title={
          section
            ? `Modifier la section ${section.type} de page`
            : "Création d'une section de page"
        }
      >
        <Form action={handleSubmit}>
          <input type="hidden" name="ID" value={section?.id} />
          <div className="flex flex-col items-left gap-4">
            <Label htmlFor="type">Type page</Label>
            <Input
              required
              type="text"
              name="type"
              id="type"
              placeholder="type"
              className="w-full"
              defaultValue={section?.type || ""}
            />
            <div className="flex items-center justify-start gap-2">
              <Label htmlFor="titles">Titre page</Label>
              <button
                type="button"
                onClick={handleAddFieldTitle}
                className="text-primary text-sm"
              >
                <CirclePlus className="w-6 h-6" />
              </button>
            </div>

            {fieldsTitle.map((field, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  required
                  type="text"
                  name="titles"
                  id={`title-${index}`}
                  placeholder={`Titre ${index + 1}`}
                  value={field.title}
                  onChange={(e) =>
                    handleFieldChangeTitle(index, e.target.value)
                  }
                  className="w-full"
                />

                {field.id ? (
                  <DeleteAlerteButton
                    actionButtonDelete={() =>
                      handleRemoveFieldTitle(index, field.id)
                    }
                    pendingDelete={pendingDelete}
                    variant="unstyled"
                  />
                ) : (
                  <Button
                    variant="unstyled"
                    size="icon"
                    //type="button"
                    onClick={() => handleRemoveFieldTitle(index, field.id)}
                  >
                    <Trash2
                      style={{ width: "26px", height: "26px" }}
                      strokeWidth={1}
                      color={"red"}
                    />
                  </Button>
                )}
              </div>
            ))}

            <div className="flex items-center justify-start gap-2">
              <Label htmlFor="contents">Contenu page</Label>
              <button
                type="button"
                onClick={handleAddFieldContent}
                className="text-primary text-sm"
              >
                <CirclePlus className="w-6 h-6" />
              </button>
            </div>

            {fieldsContent.map((field, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  name="contents"
                  className="w-full"
                  id={`content-${index}`}
                  placeholder={`Contenu ${index + 1}`}
                  value={field.content}
                  onChange={(e) =>
                    handleFieldChangeContent(index, e.target.value)
                  }
                />
                {field.id ? (
                  <DeleteAlerteButton
                    actionButtonDelete={() =>
                      handleRemoveFieldContent(index, field.id)
                    }
                    pendingDelete={pendingDelete}
                    variant="unstyled"
                  />
                ) : (
                  <Button
                    variant="unstyled"
                    size="icon"
                    //type="button"
                    onClick={() => handleRemoveFieldContent(index, field.id)}
                  >
                    <Trash2
                      style={{ width: "26px", height: "26px" }}
                      strokeWidth={1}
                      color={"red"}
                    />
                  </Button>
                )}
              </div>
            ))}

            <Label htmlFor="order">Ordre d&apos;affichage</Label>
            <Input
              type="number"
              name="order"
              id="order"
              className="w-full"
              defaultValue={section?.order || 1}
            />

            <div className="flex flex-col col-span-2 gap-4">
              <MultiImageUpload
                ref={multiImageUploadRef}
                label="Images de la section"
                images={section ? section.images : []}
                isCreate={section ? false : true}
              />
            </div>

            <div className="w-full flex justify-center items-center p-0">
              <BtnSubmit />
            </div>
          </div>
        </Form>
      </CardForm>
    </div>
  );
}
