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
      <section className="flex flex-1 flex-col gap-20 items-center justify-center border border-background border-1 overflow-hidden py-10 ">
        <div className="bg-sidebar rotate-3 py-6 w-[110%] shadow-lg dark:shadow-md dark:shadow-primary/40">
          <Skills skills={shuffledSkillsLeft} />
        </div>
        <div className="bg-sidebar rotate-negative-3 py-6 w-[110%] shadow-lg dark:shadow-md dark:shadow-primary/40">
          <Skills skills={shuffledSkillsRight} direction={"right"} speed={30} />
        </div>
      </section>
    </Transition>
  );
}
