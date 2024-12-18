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
    <div className="w-full items-center justify-center flex flex-col p-6 gap-2">
      <SectionForm section={section} />
    </div>
  );
}
