import { FullProject } from "@/types/prismaTypes";
import ProjectTab from "./components/ProjectTab";
import { getAllProjectsAction } from "./services/project.action";

export default async function ProjectDahsboardPage() {
  const projects = (await getAllProjectsAction()) as FullProject[];
  return <ProjectTab isAdmin={true} projects={projects} />;
}
