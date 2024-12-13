import Link from "next/link";
import { getLinkById } from "../services/links.action";
import LinkForm from "../components/LinkForm";

export default async function LinksFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = (await params).id;
  const link = paramsId !== "create" ? await getLinkById(paramsId) : null;

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
      <LinkForm isCreate={paramsId === "create"} link={link} />
    </div>
  );
}
