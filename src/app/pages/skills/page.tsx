import { Transition } from "@/app/components/framer-motion/Transition";
import HeroSection from "@/app/components/pages/HeroSection";
import { getSectionByTypeAction } from "@/app/dashboard/sections/services/section.action";
import { getAllSkillsAction } from "@/app/dashboard/skills/services/skill.action";
import SkillsAnimatedRound from "./components/SkillsAnimatedRound";

export default async function SkillsClientPage() {
  const skills = await getAllSkillsAction();
  const section = await getSectionByTypeAction("skills");
  return (
    <Transition>
      <HeroSection section={section} />
      <SkillsAnimatedRound skills={skills} />
    </Transition>
  );
}
