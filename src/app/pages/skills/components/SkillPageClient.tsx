"use client";

import { FullSectionPage, FullSkill } from "@/types/prismaTypes";
import SkillsAnimatedRound from "./SkillsAnimatedRound";

interface skillProps {
  skills: FullSkill[];
  section: FullSectionPage | null;
}

export default function SkillPageClient({ skills, section }: skillProps) {
  if (!section) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
        Oups, pas le moindre contenu à l&apos;horizon ! 🤦‍♂️
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-8 flex-1 p-4">
      <h1 className="text-center font-extrabold text-textColor xl:text-[60px] lg:text-[50px] md:text-[44px] sm:text-[40px] text-[28px]">
        {section.titles.map((title, index) =>
          index === 1 ? (
            <span key={title.id} className="text-primary">
              {" " + title.text}
            </span>
          ) : (
            <span key={title.id}>{title.text}</span>
          )
        )}
      </h1>

      {section.contents.map((content) => (
        <p
          key={content.id}
          className="text-center text-textColor font-medium xl:text-[34px] lg:text-[30px] md:text-[24px] sm:text-[24px] text-[20px] mb-12 "
        >
          {content.text}
        </p>
      ))}

      <SkillsAnimatedRound skills={skills} />
    </section>
  );
}
