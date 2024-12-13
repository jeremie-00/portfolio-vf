"use client";

import { Button } from "@/components/ui/button";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa"; // Import de l'icône GitHub
import { TbLoader2 } from "react-icons/tb";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSignIn = async () => {
    setIsAuthenticating(true); // Active l'état d'authentification
    try {
      await signIn("github", { callbackUrl: "/dashboard/sections" });
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
    }
  };

  if (session)
    return (
      <div className="w-full h-full flex justify-center items-center text-3xl">
        hello {session.user.name}
      </div>
    );

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Button
        onClick={handleSignIn}
        disabled={status === "loading" || isAuthenticating} // Désactive le bouton pendant l'authentification et la redirection
        className="flex items-center gap-2"
      >
        {status === "loading" || isAuthenticating ? (
          <TbLoader2
            className="animate-spin"
            style={{ width: "26px", height: "26px" }}
          />
        ) : (
          <>
            <FaGithub />
            <span>Connexion avec Github</span>
          </>
        )}
      </Button>
    </div>
  );
}
