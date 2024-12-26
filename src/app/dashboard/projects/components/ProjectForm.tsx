"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SubmitButton, UpdateButton } from "@/app/components/Buttons";
import { CardForm } from "@/app/components/Cards";
import { MultiImageUpload } from "@/app/components/UploadImage/MultiImageUpload";
import { SingleImageUpload } from "@/app/components/UploadImage/SingleImageUpload";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Textarea } from "@/components/ui/textarea";
import { FullIcon, FullProject, FullSkill } from "@/types/prismaTypes";
import { Link } from "@prisma/client";
import Form from "next/form";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { upsertProject } from "../services/upsertProject";
import { LinksFormProject } from "./LinksFormProjet";
import { ToastProjectAction } from "./ToastProject";

interface ProjectFormProps {
  project: FullProject | null;
  allSkills: FullSkill[];
  links: Link[];
  isCreate: boolean;
  icons: FullIcon[];
}

export default function ProjectForm({
  project,
  allSkills,
  links,
  isCreate,
  icons,
}: ProjectFormProps) {
  const singleImageUploadRef = useRef<{ resetFile: () => void } | null>(null);
  const multiImageUploadRef = useRef<{ resetFiles: () => void } | null>(null);
  const linksFormProjectRef = useRef<{ resetLink: () => void } | null>(null);

  const OPTIONS: Option[] = allSkills.map((skill) => ({
    label: skill.title,
    value: skill.title,
    id: skill.id,
  }));

  const [selectedType, setSelectedType] = useState(
    project?.type || "Professionnel"
  );

  // Préparez les compétences associées au projet
  const initialSelectedSkills = project?.skills
    .map((skillTitle) => {
      const skill = OPTIONS.find((option) => option.value === skillTitle.title);
      return skill ? skill : null;
    })
    .filter(Boolean) as Option[];

  const [selectedSkills, setSelectedSkills] = useState<Option[]>(
    initialSelectedSkills
  );

  const BtnSubmit = () => {
    const { pending } = useFormStatus();
    return isCreate ? (
      <SubmitButton pending={pending} />
    ) : (
      <UpdateButton pending={pending} />
    );
  };

  // Mettez à jour la fonction pour gérer le tableau d'options
  const handleSkillChange = (options: Option[]) => {
    // Mettez à jour l'état avec les valeurs des options sélectionnées
    setSelectedSkills(options); // Obtenez les ID des compétences sélectionnées
  };

  const handleSubmit = async (formData: FormData) => {
    const linksLenght = formData.getAll("links.url").length;
    const links = Array.from({ length: linksLenght }).map((_, index) => ({
      id: String(formData.getAll("links.id")[index] || ""),
      url: String(formData.getAll("links.url")[index] || ""),
      title: String(formData.getAll("links.title")[index] || ""),
      inNav: String(formData.getAll("links.inNav")[index] || ""),
      iconId: String(formData.getAll("links.iconId")[index] || ""),
      iconName: String(formData.getAll("icon")[index] || ""),
    }));

    // Combinez tout dans un seul objet
    const projectData = {
      status: String(formData.get("status") || ""),
      actionType: String(formData.get("actionType") || ""),
      ID: String(formData.get("ID") || ""),
      title: String(formData.get("title") || ""),
      shortDesc: String(formData.get("shortDesc") || ""),
      longDesc: String(formData.get("longDesc") || ""),
      order: String(formData.get("order") || "1"),
      type: String(formData.get("type") || ""),
      cover: formData.get("cover") as File,
      medias: formData.getAll("medias") as File[],
      skills: selectedSkills?.map((skill) => String(skill.id)) || [],
      links: links, // Tableau des liens reconstruits
    };
    const result = await upsertProject(projectData);

    const actionType = isCreate ? "creer" : "modifier";
    if (result?.serverError || result?.validationErrors) {
      ToastProjectAction({
        actionType,
        serverError: result?.serverError,
        validationErrors: result?.validationErrors,
      });
      return;
    }

    // Affichage du message de succès
    if (result?.data) {
      ToastProjectAction({ data: result.data, actionType });
      if (isCreate) {
        //setProjectCount((prevCount) => prevCount + 1);
        setSelectedSkills([]);
        setSelectedType("Professionnel");
        if (linksFormProjectRef.current) {
          linksFormProjectRef.current.resetLink();
        }
      }

      // REMISE A ZERO DES LIENS ET DES IMAGES
      if (singleImageUploadRef.current) {
        singleImageUploadRef.current.resetFile();
      }
      if (multiImageUploadRef.current) {
        multiImageUploadRef.current.resetFiles();
      }
    }
  };

  return (
    <CardForm
      title={isCreate ? "Création d'un projet" : "Modification du projet"}
      name={project?.title}
    >
      <Form action={handleSubmit}>
        <input type="hidden" name="ID" value={project?.id} />
        <input
          type="hidden"
          name="status"
          value={isCreate ? "create" : "edit"}
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-left gap-4">
            <Label htmlFor="title">Titre du projet</Label>
            <Input
              required
              type="text"
              name="title"
              id="title"
              placeholder="Titre"
              className="w-full"
              defaultValue={project?.title}
            />

            <Label htmlFor="shortDesc">Description court pour la carte</Label>
            <Input
              required
              type="text"
              name="shortDesc"
              id="shortDesc"
              placeholder="description court"
              className="w-full"
              defaultValue={project?.shortDesc}
            />
            <Label htmlFor="longDesc">Description complete du projet</Label>
            <Textarea
              required
              name="longDesc"
              id="longDesc"
              className="w-full h-40"
              placeholder="Description complete du projet"
              defaultValue={project?.longDesc}
            />
            <Label htmlFor="type">Type</Label>
            <Select
              name="type"
              value={selectedType}
              onValueChange={(value) => setSelectedType(value)}
            >
              <SelectTrigger className="w-full" id="type">
                <SelectValue placeholder="Type de projet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Personnel">Personnel</SelectItem>
                <SelectItem value="Professionnel">Professionnel</SelectItem>
              </SelectContent>
            </Select>

            <Label htmlFor="order">Ordre</Label>
            <Input
              type="number"
              name="order"
              id="order"
              className="w-full"
              defaultValue={project?.order || 1}
            />
            <MultipleSelector
              defaultOptions={OPTIONS}
              placeholder="Selection des compétences ..."
              value={selectedSkills}
              onChange={handleSkillChange}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  Aucune compétences trouver.
                </p>
              }
            />
          </div>
          <div className="flex flex-col gap-4">
            <SingleImageUpload
              ref={singleImageUploadRef}
              label="Image de couverture"
              image={project ? project.cover : null}
              isCreate={isCreate}
            />
            <MultiImageUpload
              ref={multiImageUploadRef}
              label="Médias"
              images={project ? project.medias : []}
              isCreate={isCreate}
            />
          </div>
        </div>
        <LinksFormProject
          initialLinks={links}
          icons={icons}
          ref={linksFormProjectRef}
        />
        <div className="w-full flex justify-center items-center p-12 ">
          <BtnSubmit />
        </div>
      </Form>
    </CardForm>
  );
}
