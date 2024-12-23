import { Wrapper } from "@/app/components/pages/Wrapper";
import SectionForm from "../components/SectionForm";
import { getSectionByIdAction } from "../services/section.action";

export default async function SectionFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = (await params).id;

  const section =
    paramsId !== "create" ? await getSectionByIdAction(paramsId) : null;

  return (
    <Wrapper>
      <SectionForm section={section} />
    </Wrapper>
  );
}
