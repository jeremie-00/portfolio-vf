import Link from "next/link";
import SkillForm from "../components/SkillForm";
import { getSkillByIdAction } from "../services/skill.action";

export default async function SkillFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = (await params).id;
  const skill =
    paramsId !== "create" ? await getSkillByIdAction(paramsId) : null;

  if (paramsId !== "create" && !skill) {
    return (
      <div className="h-screen w-full items-center justify-center flex flex-col pt-10 gap-2">
        <Link href="/dashboard/skill">Retour</Link>
        <p>Skill not found</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <SkillForm
        skill={skill}
        image={skill ? skill?.image : null}
        isCreate={paramsId === "create"}
      />
    </div>
  );
}
