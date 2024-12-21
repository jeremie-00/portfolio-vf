import React from "react";

// Définir les types pour les props (facultatif, mais recommandé pour TypeScript)
interface WrapperProps {
  children: React.ReactNode; // Les enfants du composant
  className?: string; // Classe personnalisée à ajouter à la section
}

export const WrapperForm: React.FC<WrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <section
      className={`container w-full h-full flex items-center justify-center gap-4 py-8 ${className}`}
    >
      {children}
    </section>
  );
};
