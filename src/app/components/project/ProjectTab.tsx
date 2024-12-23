import { getAllProjectsAction } from "@/app/dashboard/projects/services/project.action";
import ProjectCard from "./ProjectCard";

export default async function ProjectTab({ isAdmin }: { isAdmin: boolean }) {
  const projects = await getAllProjectsAction();

  if (projects.length === 0) {
    return (
      <section className="w-full h-full flex items-center justify-center">
        <h2 className="text-3xl text-center flex flex-col gap-4">
          Pas encore de projets dans la base de données...
          <span>L&apos;aventure ne fait que commencer ! 🚀</span>
        </h2>
      </section>
    );
  }
  return (
    <section className="w-full grid xl:grid-cols-3 lg:grid-cols-2 justify-center gap-4 px-4 py-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} isAdmin={isAdmin} />
      ))}
    </section>
  );
}
