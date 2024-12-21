import { LinkTab } from "./components/LinkTab";
import { getAllLinksAction } from "./services/links.action";

export default async function page() {
  const links = await getAllLinksAction();
  return (
    <section className="px-4 py-8">
      <LinkTab links={links} />
    </section>
  );
}
