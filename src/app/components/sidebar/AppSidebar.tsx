import { getAllLinks } from "@/app/links/services/links.action";
import { AppSidebarClient } from "./AppSidebarClient";

export async function AppSidebar() {
  const links = await getAllLinks();
  console.log(links);
  return <AppSidebarClient links={links} />;
}
