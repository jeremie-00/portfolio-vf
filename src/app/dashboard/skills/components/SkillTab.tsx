"use client";

import { FullSkill } from "@/types/prismaTypes";
import SkillCard from "./SkillCard";

interface SkillTabProps {
  isAdmin: boolean;
  skills: FullSkill[];
}

export default function SkillTab({ isAdmin, skills }: SkillTabProps) {
  if (skills.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h2 className=" text-3xl text-center">
          Aucune compétence enregistrer dans la base de données
        </h2>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 sm:p-16 px-8 z-[0]">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="min-[380px]:px-12 min-[450px]:px-20 min-[550px]:px-28 sm:p-0"
        >
          <SkillCard skill={skill} isAdmin={isAdmin} />
        </div>
      ))}
    </div>
  );
}
