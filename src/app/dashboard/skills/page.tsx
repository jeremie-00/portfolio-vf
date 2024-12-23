import { CardSkill } from "@/app/components/Cards";
import { getAllSkillsAction } from "./services/skill.action";

export default async function SkillPage() {
  const skills = await getAllSkillsAction();
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
    <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 sm:p-16 p-8 z-[0]">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="min-[380px]:px-12 min-[450px]:px-20 min-[550px]:px-28 sm:p-0"
        >
          <CardSkill skill={skill} />
        </div>
      ))}
    </section>
  );
}
