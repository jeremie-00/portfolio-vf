import { Transition } from "@/app/components/Transition";
import HeroSection from "@/app/components/pages/HeroSection";
import { getSectionByTypeAction } from "@/app/dashboard/sections/services/section.action";
import { getAllSkillsAction } from "@/app/dashboard/skills/services/skill.action";
import { FullSkill } from "@/types/prismaTypes";
import Skills from "./components/Skills";

function shuffleArray(array: FullSkill[]) {
  return array.slice().sort(() => Math.random() - 0.5);
}

export default async function SkillsClientPage() {
  const skills = await getAllSkillsAction();
  const section = await getSectionByTypeAction("skills");
  const shuffledSkillsLeft = shuffleArray(skills);
  const shuffledSkillsRight = shuffleArray(skills);
  return (
    <Transition>
      <HeroSection section={section} />
      <section className="flex flex-1 flex-col gap-20 items-center justify-center border border-background border-1 overflow-hidden py-10">
        <div className="bg-sidebar rotate-3 p-2 w-[110%]">
          <div className="flex items-center justify-center py-2">
            <Skills skills={shuffledSkillsLeft} translate={"left"} />
          </div>
        </div>
        <div className="bg-sidebar rotate-negative-3 p-2 w-[110%] max-md:hidden">
          <div className="flex items-center justify-center py-2">
            <Skills skills={shuffledSkillsRight} translate={"right"} />
          </div>
        </div>
      </section>
    </Transition>
  );
}
