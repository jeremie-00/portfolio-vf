"use client";

import { Button } from "@/components/ui/button";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa"; // Import de l'icône GitHub
import { TbLoader2 } from "react-icons/tb";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (session) {
      setIsRedirecting(true); // Active l'état de redirection
      router.push("/dashboard/sectionPage");
    }
  }, [session, router]);

  const handleSignIn = async () => {
    setIsAuthenticating(true); // Active l'état d'authentification
    try {
      await signIn("github");
      setIsRedirecting(true);
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
    } finally {
      setIsAuthenticating(false); // Désactive l'état d'authentification
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Button
        onClick={handleSignIn}
        disabled={status === "loading" || isAuthenticating || isRedirecting} // Désactive le bouton pendant l'authentification et la redirection
        className="flex items-center gap-2"
      >
        {status === "loading" || isAuthenticating || isRedirecting ? (
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
