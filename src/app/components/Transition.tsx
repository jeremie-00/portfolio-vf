"use client";

import { motion } from "motion/react";

export function Transition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      layout
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
      }}
    >
      {children}
    </motion.div>
  );
}
