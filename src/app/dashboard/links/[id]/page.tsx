import Link from "next/link";
import { getAllIconsAction } from "../../icons/services/icons.action";
import LinkForm from "../components/LinkForm";
import { getLinkByIdAction } from "../services/links.action";

export default async function LinksFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = (await params).id;
  const link = paramsId !== "create" ? await getLinkByIdAction(paramsId) : null;
  const icons = await getAllIconsAction();

  if (paramsId !== "create" && !link) {
    return (
      <div className="h-screen w-full items-center justify-center flex flex-col pt-10 gap-2 texte-3xl">
        <Link href="/dashboard/links">Retour</Link>
        <p>Link not found</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <LinkForm isCreate={paramsId === "create"} link={link} icons={icons} />
    </div>
  );
}
