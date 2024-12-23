import { Wrapper } from "@/app/components/pages/Wrapper";
import { LinkTab } from "./components/LinkTab";
import { getAllLinksAction } from "./services/links.action";

export default async function page() {
  const links = await getAllLinksAction();
  return (
    <Wrapper>
      <LinkTab links={links} />
    </Wrapper>
  );
}
