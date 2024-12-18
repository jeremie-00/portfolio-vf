import { getSectionByTypeAction } from "@/app/dashboard/sections/services/section.action";
import { getAllSkillsAction } from "@/app/dashboard/skills/services/skill.action";
import SkillPageClient from "./components/SkillPageClient";

export default async function SkillsClientPage() {
  const skills = await getAllSkillsAction();
  const section = await getSectionByTypeAction("skills");
  return <SkillPageClient skills={skills} section={section} />;
}
