import SkillTab from "./components/SkillTab";
import { getAllSkillsAction } from "./services/skill.action";

export default async function SkillPage() {
  const skills = await getAllSkillsAction();
  return <SkillTab isAdmin={true} skills={skills} />;
}
