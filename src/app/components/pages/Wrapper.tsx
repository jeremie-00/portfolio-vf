import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({
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
