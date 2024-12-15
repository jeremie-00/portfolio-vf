import { LinkTab } from "./components/LinkTab";
import { getAllLinksAction } from "./services/links.action";

export default async function page() {
  const links = await getAllLinksAction();
  return (
    <div className="px-4">
      <LinkTab links={links} />
    </div>
  );
}
