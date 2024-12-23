"use client";
import { DeleteAlerteButton } from "@/app/components/Buttons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FullProject } from "@/types/prismaTypes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconPencil } from "../../dashboard/icons/components/DynamicIcon";
import { ToastProjectAction } from "../../dashboard/projects/components/ToastProject";
import { deleteProjectAction } from "../../dashboard/projects/services/project.action";

interface ProjectCardProps {
  project: FullProject;
  isAdmin: boolean;
}

export default function ProjectCard({ project, isAdmin }: ProjectCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDeletedProject = async () => {
    setIsLoading(true);

    const result = await deleteProjectAction({
      ID: project?.id,
      cover: { url: project?.cover?.url, id: project?.cover?.id },
      medias: project?.medias?.map((media) => ({
        url: media.url,
        id: media.id,
      })),
    });

    setIsLoading(false);

    const actionType = "supprimer";
    if (result?.serverError || result?.validationErrors) {
      ToastProjectAction({
        actionType,
        serverError: result?.serverError,
        validationErrors: result?.validationErrors,
      });
    }

    if (result?.data) {
      ToastProjectAction({ data: result.data, actionType });
    }
  };

  return (
    <Card className="max-w-[440px] justify-self-center relative w-full h-full flex flex-col items-center justify-between bg-sidebar p-2 gap-2 hover:border-primary duration-300">
      <div className="absolute flex flex-col top-0 left-0 w-full h-full items-center justify-center rounded-xl p-4 bg-black bg-opacity-40 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
        {isAdmin ? (
          <div className="flex items-center justify-center w-full gap-8 p-3 md:flex-row h-16">
            <Link
              className={buttonVariants({
                variant: "secondary",
                size: "icon",
              })}
              href={`/dashboard/projects/${project.id}`}
            >
              <IconPencil pending={false} />
            </Link>
            <DeleteAlerteButton
              actionButtonDelete={handleDeletedProject}
              pendingDelete={isLoading}
            />
          </div>
        ) : (
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "default",
            })}
            href={`/pages/projects/${project.id}`}
          >
            Voir le projet
          </Link>
        )}
      </div>
      <CardHeader>
        {isAdmin ? (
          <div className="w-full flex items-center justify-between">
            <span>{project.order}</span>
            <span>{project.type}</span>
          </div>
        ) : null}

        {project.cover ? (
          <div className="aspect-imgCard shadow-md w-full m-auto flex items-center justify-center border border-border dark:border-secondary dark:shadow-xl rounded-xl overflow-hidden object-cover">
            <Image
              src={project.cover.url}
              alt={project.cover.alt}
              width={800}
              height={200}
              className="object-cover flex items-center justify-center rounded-lg"
              priority={true}
            />
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="w-full flex flex-1 p-3 gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <hr className="w-20 border-primary border-[1.5px]"></hr>
          <p>{project.shortDesc}</p>
        </div>
      </CardContent>
      <CardFooter className="w-full flex flex-wrap content-start gap-2 p-3">
        {project.skills.map((skill) => (
          <Badge key={skill.id} variant="default" className="w-fit">
            {skill.title}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
