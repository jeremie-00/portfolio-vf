"use server";
import { WrapperForm } from "@/app/components/WrapperForm";
import IconForm from "./components/IconForm";
import { getAllIconsAction } from "./services/icons.action";

export default async function IconFormPage() {
  const icons = await getAllIconsAction();
  return (
    <WrapperForm>
      <IconForm icons={icons} />
    </WrapperForm>
  );
}
