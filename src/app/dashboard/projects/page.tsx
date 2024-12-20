import ProjectTab from "../../components/project/ProjectTab";
import { getAllProjectsAction } from "./services/project.action";

export default async function ProjectDahsboardPage() {
  const projects = await getAllProjectsAction();
  return <ProjectTab isAdmin={true} projects={projects} />;
}
