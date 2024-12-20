import ProjectTab from "@/app/components/project/ProjectTab";
import { FullProject, FullSectionPage } from "@/types/prismaTypes";

interface projectProps {
  projects: FullProject[];
  section: FullSectionPage | null;
}

export default function ProjectPage({ projects, section }: projectProps) {
  if (!section) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        SectionPage introuvable
      </div>
    );
  }

  return (
    <section className="w-full h-full flex flex-col md:px-12 p-4 md:gap-4">
      <div className="flex flex-col gap-8">
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
        <div className="flex flex-col text-center text-textColor font-medium xl:text-[34px] lg:text-[30px] md:text-[24px] sm:text-[24px] text-[20px]">
          {section.contents.map((content) => (
            <p key={content.id}>{content.text}</p>
          ))}
        </div>
      </div>
      <ProjectTab isAdmin={false} projects={projects} />
    </section>
  );
}
