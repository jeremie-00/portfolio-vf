"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Assure-toi que le rendu est prêt avant d'afficher les icônes dynamiques
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    // Empêche le rendu des icônes avant que le thème ne soit défini
    return <Skeleton className="h-8 w-8 rounded" />;
  }

  return (
    <Button variant="outline" size="iconSideBar" onClick={toggleTheme}>
      {resolvedTheme === "light" ? (
        <Sun className="absolute size-[1.2rem] rotate-90 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
