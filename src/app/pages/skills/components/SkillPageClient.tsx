"use client";

import { FullSectionPage, FullSkill } from "@/types/prismaTypes";
import SkillsAnimatedRound from "./SkillsAnimatedRound";

interface skillProps {
  isEdit?: boolean;
  skills: FullSkill[];
  section: FullSectionPage | null;
}

export default function SkillPageClient({
  skills,
  section,
  isEdit = false,
}: skillProps) {
  if (!section) {
    return <div>SectionPage introuvable</div>;
  }

  if (!isEdit && section) {
    return (
      <div className="flex flex-col gap-8 flex-1 p-6">
        <h1 className="text-center font-black dark:text-white xl:text-[60px] lg:text-[50px] md:text-[44px] sm:text-[40px] text-[28px]">
          {section.titles.map((title, index) =>
            index === 1 ? (
              <span key={title.id} className="text-primary">
                {" " + title.text}
              </span>
            ) : (
              <span key={title.id}>{title.text}</span>
            )
          )}
          {/* Mes Compétences Techniques */}
        </h1>
        <div className="flex flex-col text-center dark:text-[#dfd9ff] font-medium xl:text-[34px] lg:text-[30px] md:text-[24px] sm:text-[24px] text-[20px] ">
          {section.contents.map((content) => (
            <p key={content.id}>{content.text}</p>
          ))}
          <p>
            {/*  Découvrez les outils et technologies que j&apos;utilise pour donner
            vie à mes projets, en combinant créativité et expertise technique. */}
          </p>
        </div>
        <SkillsAnimatedRound skills={skills} />
      </div>
    );
  }
}
