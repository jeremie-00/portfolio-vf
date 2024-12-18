import { CardsSectionDashboard } from "@/app/components/Cards";
import { FullSectionPage } from "@/types/prismaTypes";
import { getAllSectionsAction } from "./services/section.action";

export default async function SectionPage() {
  const sections = (await getAllSectionsAction()) as FullSectionPage[];
  const sectionHome = sections.filter((section) => section.type === "test");

  return (
    <section className="w-full flex flex-col gap-4 p-12">
      {sectionHome.map((section) => (
        <div key={section.id}>
          <CardsSectionDashboard section={section} />
        </div>
      ))}
    </section>
  );
}
