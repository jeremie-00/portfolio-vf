"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { FullLink } from "@/types/prismaTypes";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { SlLogout } from "react-icons/sl";

export function AppSidebarClient({
  clientLinks,
  adminLinks,
  session,
}: {
  clientLinks: FullLink[];
  adminLinks: FullLink[] | null;
  session: Session | null;
}) {
  const isAuthenticated = session?.user?.id;

  const { status } = useSession();
  const isLoading = status === "loading";

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {clientLinks.map((link) => (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton asChild>
                    {isLoading ? (
                      <Skeleton className="h-8 w-full" />
                    ) : (
                      <Link href={link.url}>
                        <span>{link.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {isAuthenticated ? (
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminLinks &&
                  adminLinks.map((link) => (
                    <SidebarMenuItem key={link.id}>
                      <SidebarMenuButton asChild>
                        {isLoading ? (
                          <Skeleton className="h-8 w-full" />
                        ) : (
                          <Link href={link.url}>
                            <span>{link.title}</span>
                          </Link>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </SidebarContent>
      <SidebarFooter>
        {isAuthenticated ? (
          isLoading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <Button
              className={
                buttonVariants({
                  variant: "default",
                  size: "sm",
                }) + "w-full"
              }
              onClick={async () => {
                await signOut({
                  redirect: true,
                  callbackUrl: "/",
                });
              }}
            >
              <SlLogout style={{ color: "white" }} />
            </Button>
          )
        ) : null}
      </SidebarFooter>
    </Sidebar>
  );
}
