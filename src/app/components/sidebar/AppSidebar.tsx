import {
  getAllLinksAdminAction,
  getAllLinksClientAction,
} from "@/app/dashboard/links/services/links.action";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { AppSidebarClient } from "./AppSidebarClient";

export async function AppSidebar() {
  const session = await getServerSession(authOptions);
  const linksClient = await getAllLinksClientAction();
  const linksAdmin = session ? await getAllLinksAdminAction() : null;
  return (
    <AppSidebarClient
      clientLinks={linksClient}
      adminLinks={linksAdmin}
      session={session}
    />
  );
}
