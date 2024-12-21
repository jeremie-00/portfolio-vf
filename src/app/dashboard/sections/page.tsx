import { CardsSectionDashboard } from "@/app/components/Cards";
import { WrapperForm } from "@/app/components/WrapperForm";
import { getAllSectionsAction } from "./services/section.action";

export default async function SectionPage() {
  const sections = await getAllSectionsAction();
  return (
    <WrapperForm className={"flex-col"}>
      {sections.map((section) => (
        <div key={section.id} className="w-full">
          <CardsSectionDashboard section={section} />
        </div>
      ))}
    </WrapperForm>
  );
}
