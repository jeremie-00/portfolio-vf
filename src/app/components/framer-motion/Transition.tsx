"use client";

import { motion } from "motion/react";

export function SlideAnimate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      layout
      style={{ width: "100%", height: "100%" }}
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: ["100%", "0"], opacity: 1 }}
      exit={{ x: ["0%", "100%"] }}
      transition={{
        duration: 0.5,
        type: "spring",
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Transition() {
  return (
    <>
      <motion.div
        layout
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          //right: "100%",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 90,
          backgroundColor: "rgba(0, 0, 0, 1)",
          borderRadius: "10px",
          margin: "0 auto",
        }}
        initial={{ width: "100%" }}
        animate={{ width: ["0", "100%", "0%"] }}
        exit={{ x: ["0%", "100%"] }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      />
      <motion.div
        layout
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          //right: "100%",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 80,
          backgroundColor: "rgba(255,255, 255, 1)",
          borderRadius: "10px",
          //margin: "0 auto",
        }}
        initial={{ width: "0%" }}
        animate={{ width: ["0", "100%", "0%"] }}
        exit={{ x: ["0%", "100%"] }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.div
        layout
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          //right: "100%",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 70,
          backgroundColor: "#0070f3",
          borderRadius: "10px",
          //margin: "0 auto",
        }}
        initial={{ width: "0%" }}
        animate={{ width: ["0", "100%", "0%"] }}
        exit={{ x: ["0%", "100%"] }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </>
  );
}
