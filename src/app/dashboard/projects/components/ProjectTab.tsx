"use client";

import { FullProject } from "@/types/prismaTypes";
import ProjectCard from "./ProjectCard";

interface ProjectTabProps {
  isAdmin: boolean;
  projects: FullProject[];
}

export default function ProjectTab({ isAdmin, projects }: ProjectTabProps) {
  if (projects.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h2 className="text-3xl text-center">
          Aucun projet enregistrer dans la base de données
        </h2>
      </div>
    );
  }
  return (
    <div className="w-full grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4 ">
      {projects.map((project) => (
        <div key={project.id}>
          <ProjectCard project={project} isAdmin={isAdmin} />
        </div>
      ))}
    </div>
  );
}
