import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

import { AnimatePresence } from "motion/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./components/collaps/style/collaps.css";
import "./components/desktopSvg/style/animationSvg.css";
import SessionWrapper from "./components/SessionWrapper";
import { AppSidebar } from "./components/sidebar/AppSidebar";
import "./components/slider/style/slider.css";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeremie Herault portfolio",
  description:
    "Découvrez le portfolio de Jeremie Herault, développeur web passionné spécialisé dans les technologies modernes telles que React, Next.js et TailwindCSS. Plongez dans mes réalisations, qui combinent design élégant, performances optimisées et interactivité. Ce portfolio met en lumière mon parcours, mes compétences techniques, et mon approche créative pour concevoir des solutions numériques adaptées aux besoins actuels. Explorez un univers où professionnalisme et authenticité se rencontrent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="fr" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-mono)] antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="flex-1 overflow-x-auto">
                <SidebarTrigger />
                <AnimatePresence mode="wait">{children}</AnimatePresence>
                <Toaster />
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
