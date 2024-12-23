import { CardsSectionDashboard } from "@/app/components/Cards";

import { getAllSectionsAction } from "./services/section.action";
import { Wrapper } from "@/app/components/pages/Wrapper";

export default async function SectionPage() {
  const sections = await getAllSectionsAction();
  return (
    <Wrapper className={"flex-col"}>
      {sections.map((section) => (
        <div key={section.id} className="w-full">
          <CardsSectionDashboard section={section} />
        </div>
      ))}
    </Wrapper>
  );
}
