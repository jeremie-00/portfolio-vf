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
import Footer from "./components/pages/Footer";

import SessionWrapper from "./components/SessionWrapper";
import { AppSidebar } from "./components/sidebar/AppSidebar";
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
  title: "Portfolio de Jérémie Hérault | Développeur Web Full-Stack",
  description:
    "Explorez le portfolio de Jérémie Hérault, développeur web spécialisé en React, Next.js et TailwindCSS. Découvrez des projets modernes, interactifs et performants.",
  keywords: [
    "développeur web",
    "portfolio développeur",
    "React",
    "Next.js",
    "TailwindCSS",
    "Jérémie Hérault",
    "applications web",
    "développement front-end",
    "développement back-end",
  ],

  authors: [{ name: "Jérémie Hérault" }],
  robots: "index, follow",

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "Content-Language": "fr-FR",
    "geo.region": "FR-60",
    "geo.placename": "Neuilly-en-Thelle",
    "geo.position": "49.2273;2.2486",
    ICBM: "49.2273, 2.2486",
  },
  openGraph: {
    title: "Portfolio de Jérémie Hérault | Développeur Web Full-Stack",
    description:
      "Découvrez les réalisations de Jérémie Hérault, développeur web passionné.",
    url: "https://portfolio-vf-mu.vercel.app/",
    siteName: "Portfolio de Jérémie Hérault",
    images: [
      {
        url: "https://portfolio-vf-mu.vercel.app/preview-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aperçu du portfolio de Jérémie Hérault",
      },
    ],
    type: "website",
  },
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
                <Footer />
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
