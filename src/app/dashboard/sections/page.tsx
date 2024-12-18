import { CardsSectionDashboard } from "@/app/components/Cards";
import { getAllSectionsAction } from "./services/section.action";

export default async function SectionPage() {
  const sections = await getAllSectionsAction();
  return (
    <section className="w-full flex flex-col gap-4 p-12">
      {sections.map((section) => (
        <div key={section.id}>
          <CardsSectionDashboard section={section} />
        </div>
      ))}
    </section>
  );
}
