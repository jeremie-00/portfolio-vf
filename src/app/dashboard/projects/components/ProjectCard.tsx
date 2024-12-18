import { DeleteAlerteButton } from "@/app/components/Buttons";
import { MotionCard } from "@/app/components/framer-motion/MotionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FullProject } from "@/types/prismaTypes";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { deleteProjectAction } from "../services/project.action";
import { ToastProjectAction } from "./ToastProject";

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
    <div
      className="h-full w-full relative"
      style={{
        perspective: "1200px",
      }}
    >
      {/* className="relative flex h-full flex-col transition duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-primary" */}
      <MotionCard isRotate={true}>
        <div className="absolute flex flex-col top-0 left-0 w-full h-full items-center justify-center rounded-xl p-4 bg-black bg-opacity-80 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
          {isAdmin ? (
            <div className="flex items-center justify-center w-full gap-8 p-3 md:flex-row h-16">
              <Link href={`/dashboard/projects/${project.id}`}>
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
            </div>
          ) : (
            <Link href={`/pages/projects/${project.id}`}> Voir le projet </Link>
          )}
        </div>
        <CardHeader className="w-full flex-col flex items-center justify-between p-2">
          {isAdmin ? (
            <div className="w-full flex items-center justify-between">
              <span>{project.order}</span>
              <span>{project.type}</span>
            </div>
          ) : null}
          <div className="h-[150px] w-full">
            {project.cover ? (
              <Image
                src={project.cover.url}
                alt={project.cover.alt}
                width={400}
                height={200}
                className="object-cover w-full rounded-lg h-full w-full h-full"
                priority={true}
              />
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="w-full flex flex-1 p-3 gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <hr className="w-20 border-primary"></hr>
            <p className="flex text-gray-300 ">{project.shortDesc}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap content-start w-full gap-2 p-3">
          {project.skills.map((skill) => (
            <Badge key={skill.id} variant="secondary" className="w-fit ">
              {skill.title}
            </Badge>
          ))}
        </CardFooter>
      </MotionCard>
    </div>
  );
}
