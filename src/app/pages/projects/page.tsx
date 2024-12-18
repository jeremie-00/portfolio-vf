import { getAllProjectsAction } from "@/app/dashboard/projects/services/project.action";
import { getSectionByTypeAction } from "@/app/dashboard/sections/services/section.action";
import { FullProject } from "@/types/prismaTypes";
import ProjectPage from "./components/ProjectPage";

export default async function ProjectClientPage() {
  const projects = (await getAllProjectsAction()) as FullProject[];
  const section = await getSectionByTypeAction("test");

  return <ProjectPage projects={projects} section={section} />;
}
