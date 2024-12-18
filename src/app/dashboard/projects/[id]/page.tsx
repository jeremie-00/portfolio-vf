import ProjectForm from "@/app/dashboard/projects/components/ProjectForm";
import { getProjectByIdAction } from "@/app/dashboard/projects/services/project.action";

import Link from "next/link";
import { getAllIconsAction } from "../../icons/services/icons.action";
import { getAllSkillsAction } from "../../skills/services/skill.action";

export default async function ProjectFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = (await params).id;

  const [skills, icons, project] = await Promise.all([
    getAllSkillsAction(),
    getAllIconsAction(),
    paramsId !== "create" ? getProjectByIdAction(paramsId) : null,
  ]);

  if (paramsId !== "create" && !project) {
    return (
      <div className="h-screen w-full items-center justify-center flex flex-col pt-10 gap-2">
        <Link href="/dashboard/project">Retour</Link>
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div className="w-full items-center justify-center flex flex-col p-6 gap-2">
      <ProjectForm
        isCreate={paramsId === "create"}
        project={project}
        links={project?.links || []}
        allSkills={skills}
        icons={icons}
      />
    </div>
  );
}
