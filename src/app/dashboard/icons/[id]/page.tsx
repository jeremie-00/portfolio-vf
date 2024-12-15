import IconForm from "../components/IconForm";
import { getAllIconsAction, getIconByIdAction } from "../services/icons.action";

export default async function IconFormPage({
  params,
}: {
  params: Promise<{ id: string; isAdmin: string; inNav: string }>;
}) {
  const icons = await getAllIconsAction();
  const paramsId = (await params).id;
  const icon = paramsId !== "create" ? await getIconByIdAction(paramsId) : null;
  return (
    <div className="flex w-auto p-6 items-center justify-center">
      <IconForm icons={icons} icon={icon} />
    </div>
  );
}
