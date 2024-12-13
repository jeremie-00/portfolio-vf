import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FullLink } from "@/types/prismaTypes";
import Link from "next/link";

export function AppSidebarClient({ links }: { links: FullLink[] }) {
  const linksClient = links.filter((link) => link.inNav);
  const linksAdmin = links.filter((link) => link.isAdmin);

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {linksClient.map((link) => (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton asChild>
                    <Link href={link.url}>
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {linksAdmin.map((link) => (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton asChild>
                    <Link href={link.url}>
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
