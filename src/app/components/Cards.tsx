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
import { FullSectionPage } from "@/types/prismaTypes";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ToastSectionAction } from "../dashboard/sections/components/ToastSection";
import { deleteSectionAction } from "../dashboard/sections/services/section.action";
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

export function CardForm({ title, name, children }: CardsProps) {
  return (
    <Card className="w-full max-w-[700px]">
      <CardHeader className="flex flex-col">
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
    <Card className="flex items-center justify-center px-2 py-4">
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
            <Pencil
              style={{ width: "26px", height: "26px" }}
              color="#ffffff"
              strokeWidth={1.5}
              absoluteStrokeWidth
            />
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
