"use client";

import ProjectTab from "@/app/dashboard/projects/components/ProjectTab";
import { FullProject, FullSectionPage } from "@/types/prismaTypes";

interface projectProps {
  projects: FullProject[];
  section: FullSectionPage | null;
}

export default function ProjectPage({ projects, section }: projectProps) {
  if (!section) {
    return <div>SectionPage introuvable</div>;
  }

  if (section) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-12">
        <div className="flex flex-col gap-8">
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
          </h1>
          <div className="flex flex-col text-center dark:text-[#dfd9ff] font-medium xl:text-[34px] lg:text-[30px] md:text-[24px] sm:text-[24px] text-[20px]">
            {section.contents.map((content) => (
              <p key={content.id}>{content.text}</p>
            ))}
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-8 font-[family-name:var(--font-geist-sans)]">
          <ProjectTab isAdmin={false} projects={projects} />
        </div>
      </div>
    );
  }
}
