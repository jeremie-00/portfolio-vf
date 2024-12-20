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
        <h2 className="text-3xl text-center flex flex-col gap-4">
          Pas encore de projets dans la base de données...
          <span>L&apos;aventure ne fait que commencer ! 🚀</span>
        </h2>
      </div>
    );
  }
  return (
    <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 justify-center gap-4 p-4 ">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
