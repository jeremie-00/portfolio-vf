"use server";
import IconForm from "./components/IconForm";
import { getAllIconsAction } from "./services/icons.action";

export default async function IconFormPage() {
  const icons = await getAllIconsAction();
  return (
    <div className="flex w-auto p-6 items-center justify-center">
      <IconForm icons={icons} />
    </div>
  );
}
