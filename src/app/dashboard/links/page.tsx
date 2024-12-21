import { WrapperForm } from "@/app/components/WrapperForm";
import { LinkTab } from "./components/LinkTab";
import { getAllLinksAction } from "./services/links.action";

export default async function page() {
  const links = await getAllLinksAction();
  return (
    <WrapperForm>
      <LinkTab links={links} />
    </WrapperForm>
  );
}
