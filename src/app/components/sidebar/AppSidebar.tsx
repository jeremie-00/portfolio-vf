import {
  getAllLinksAdmin,
  getAllLinksClient,
} from "@/app/links/services/links.action";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { AppSidebarClient } from "./AppSidebarClient";

export async function AppSidebar() {
  const session = await getServerSession(authOptions);
  const linksClient = await getAllLinksClient();
  const linksAdmin = session ? await getAllLinksAdmin() : null;
  return (
    <AppSidebarClient
      clientLinks={linksClient}
      adminLinks={linksAdmin}
      session={session}
    />
  );
}
