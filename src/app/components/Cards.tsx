"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FullSectionPage, FullSkill } from "@/types/prismaTypes";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconPencil } from "../dashboard/icons/components/DynamicIcon";
import { ToastSectionAction } from "../dashboard/sections/components/ToastSection";
import { deleteSectionAction } from "../dashboard/sections/services/section.action";
import { ToastSkillAction } from "../dashboard/skills/components/ToastSkill";
import { deleteSkillAction } from "../dashboard/skills/services/skill.action";
import { DeleteAlerteButton } from "./Buttons";

interface CardsProps {
  title: string;
  name?: string;
  href?: string;
  desc?: string;
  children: React.ReactNode;
  type?: string;
  order?: string;
}

export function CardSkill({ skill }: { skill: FullSkill }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDeletedSkill = async () => {
    setIsLoading(true);
    const result = await deleteSkillAction({
      ID: skill?.id,
      imageId: skill?.image?.id,
      imageUrl: skill?.image?.url,
    });
    setIsLoading(false);
    const actionType = "supprimer";
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
  return (
    <Card className="relative flex flex-col  px-2 py-4 bg-card">
      <div className="absolute flex flex-col top-0 left-0 w-full h-full items-center justify-center rounded-xl p-4 bg-background/60 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-center w-full gap-8 p-3 md:flex-row h-16">
          <Link href={`/dashboard/skills/${skill.id}`}>
            <Button type="button" size="icon" variant="secondary">
              <IconPencil pending={false} />
            </Button>
          </Link>
          <DeleteAlerteButton
            actionButtonDelete={handleDeletedSkill}
            pendingDelete={isLoading}
          />
        </div>
      </div>
      <CardHeader>
        <CardTitle>{skill.display ? <Eye /> : <EyeClosed />}</CardTitle>
        {/* <CardDescription>{skill.id || "0"}</CardDescription> */}
      </CardHeader>
      <CardContent className="flex items-center p-4">
        {skill && skill.image && skill.image.url ? (
          <Image
            src={skill.image.url}
            alt={skill.image.alt}
            width={100}
            height={100}
            className="object-cover p-3 w-full h-full"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h3 className="lg:text-xl">WEB</h3>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex place-content-center gap-12 p-6">
        {skill ? <h3 className="lg:text-xl">{skill.title}</h3> : null}
      </CardFooter>
    </Card>
  );
}

export function CardForm({ title, name, children }: CardsProps) {
  return (
    <Card className="w-full max-w-[700px]">
      <CardHeader className="flex flex-col ">
        <CardTitle className="px-4 py-8 text-center">
          {title}
          <span className="text-primary text-2xl block p-4">{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function CardSwitch({ title, desc, children }: CardsProps) {
  return (
    <Card className="flex items-center justify-between px-2 py-4 shadow-md">
      <CardHeader className="flex flex-col">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc || "default description"}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center p-4">{children}</CardContent>
    </Card>
  );
}

export function CardsSectionDashboard({
  section,
}: {
  section: FullSectionPage;
}) {
  const { id, type, order, titles, contents } = section;
  const [isLoading, setIsLoading] = useState(false);
  const handleDeletedProject = async () => {
    setIsLoading(true);
    const result = await deleteSectionAction({
      ID: section.id,
      medias: section.images,
    });
    setIsLoading(false);

    const actionType = "supprimer";
    if (result?.serverError || result?.validationErrors) {
      ToastSectionAction({
        actionType,
        serverError: result?.serverError,
        validationErrors: result?.validationErrors,
      });
    }
    if (result?.data) {
      ToastSectionAction({ data: result.data, actionType });
    }
  };

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="flex gap-4 p-4">
        <h3>Type de la section : {type}</h3>
        <h3>Ordre d&apos;affichage : {order}</h3>
      </CardHeader>
      <CardContent className="flex flex-col p-4 gap-6">
        <div className="flex flex-col flex-1 justify-center items-start gap-4">
          {" "}
          {titles.map((title, index) => (
            <CardTitle key={title.id}>
              Titre {index + 1} : {title.text}
            </CardTitle>
          ))}
        </div>
        <div className="flex flex-col flex-1 justify-center items-start gap-4">
          {contents.map((content, index) => (
            <CardDescription key={content.id}>
              Contenu {index + 1} : {content.text || "default description"}
            </CardDescription>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex place-content-center gap-12 p-6">
        <Link href={`/dashboard/sections/${id}`}>
          <Button type="button" size="icon" variant="secondary">
            <IconPencil pending={false} />
          </Button>
        </Link>
        <DeleteAlerteButton
          actionButtonDelete={handleDeletedProject}
          pendingDelete={isLoading}
        />
      </CardFooter>
    </Card>
  );
}
