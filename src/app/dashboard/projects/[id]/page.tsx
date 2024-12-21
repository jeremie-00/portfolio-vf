import ProjectForm from "@/app/dashboard/projects/components/ProjectForm";
import { getProjectByIdAction } from "@/app/dashboard/projects/services/project.action";

import { WrapperForm } from "@/app/components/WrapperForm";
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
      <section className="h-screen w-full items-center justify-center flex flex-col pt-10 gap-2">
        <Link href="/dashboard/project">Retour</Link>
        <p>Project not found</p>
      </section>
    );
  }

  return (
    <WrapperForm>
      <ProjectForm
        isCreate={paramsId === "create"}
        project={project}
        links={project?.links || []}
        allSkills={skills}
        icons={icons}
      />
    </WrapperForm>
  );
}
