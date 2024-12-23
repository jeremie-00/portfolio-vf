import { Wrapper } from "@/app/components/pages/Wrapper";
import IconForm from "./components/IconForm";
import { getAllIconsAction } from "./services/icons.action";

export default async function IconFormPage() {
  const icons = await getAllIconsAction();
  return (
    <Wrapper>
      <IconForm icons={icons} />
    </Wrapper>
  );
}
