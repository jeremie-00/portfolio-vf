"use client";
import DynamicIcon from "@/app/dashboard/icons/components/DynamicIcon";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { FullLink } from "@/types/prismaTypes";
import { MoreHorizontal } from "lucide-react";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SlLogout } from "react-icons/sl";
import { GithubButton } from "../GithubButton";
import { ThemeToggle } from "../ThemeToggle";

export function AppSidebarClient({
  clientLinks,
  adminLinks,
  session,
}: {
  clientLinks: FullLink[];
  adminLinks: FullLink[] | null;
  session: Session | null;
}) {
  const pathnameComplete = usePathname() || "";
  const segments = pathnameComplete.split("/").filter(Boolean);
  const pathname = "/" + segments[0] + "/" + segments[1];
  const isAuthenticated = session?.user?.id;
  const { status } = useSession();
  const isLoading = status === "loading";
  const githubBtn = clientLinks.find((link) => link.title === "Github");
  const clientLinksFiltered = clientLinks.filter(
    (link) => link.type !== "github"
  );

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <ThemeToggle />
        <GithubButton link={githubBtn} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {clientLinksFiltered.map((link) => (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton asChild isActive={pathname === link.url}>
                    {isLoading ? (
                      <Skeleton className="h-8 w-full" />
                    ) : (
                      <div key={link.id}>
                        <DynamicIcon
                          name={link.icon ? link.icon.name : "CircleOff"}
                          size={40}
                          className="text-primary"
                        />
                        <Link href={link.url}>
                          <span>{link.title}</span>
                        </Link>
                      </div>
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
                      <SidebarMenuButton
                        asChild
                        isActive={
                          pathname === link.url ||
                          pathname === `${link.url}/create`
                        }
                      >
                        {isLoading ? (
                          <Skeleton className="h-8 w-full" />
                        ) : (
                          <div key={link.id}>
                            <DynamicIcon
                              name={link.icon ? link.icon.name : "CircleOff"}
                              size={40}
                              className="text-primary"
                            />
                            <Link href={link.url}>
                              <span>{link.title}</span>
                            </Link>
                          </div>
                        )}
                      </SidebarMenuButton>
                      {link.title !== "Icones" ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuAction>
                              {isLoading ? (
                                <Skeleton className="h-2 w-full" />
                              ) : (
                                <MoreHorizontal />
                              )}
                            </SidebarMenuAction>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" align="start">
                            <DropdownMenuItem>
                              <Link href={`${link.url}/create`}>
                                <span>Création {link.title}</span>
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : null}
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
