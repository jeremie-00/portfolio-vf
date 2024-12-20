"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const MotionCard = ({
  children,
  isRounded = false,
  isRotate = false,
  position = "relative",
  size = { width: 500, height: 500 },
}: {
  children: React.ReactNode;
  isRotate?: boolean;
  isRounded?: boolean;
  position?: "absolute" | "relative";
  size?: { width: number; height: number };
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const [cardSize, setCardSize] = useState({
    width: size.width,
    height: size.width,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardSize({
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y,
      });
    }
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const glareX = useMotionValue(0);
  const glareY = useMotionValue(0);

  const rotateY = useTransform(x, [0, cardSize.height], [20, -20]);
  const rotateX = useTransform(y, [0, cardSize.width], [-20, 20]);

  const rotateSpringY = useSpring(rotateY);
  const rotateSpringX = useSpring(rotateX);

  const springGlareX = useSpring(glareX, { stiffness: 120, damping: 20 });
  const springGlareY = useSpring(glareY, { stiffness: 120, damping: 20 });

  const radius = isRounded ? "50%" : "1rem";

  // Fonction pour calculer la position de la souris/tactile
  const handleMove = (clientX: number, clientY: number) => {
    if (!cardRef.current || !glareRef.current) return;
    const glareRect = glareRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();

    x.set(clientX - cardRect.left);
    y.set(clientY - cardRect.top);
    glareX.set(clientX - cardRect.left - glareRect.width / 2);
    glareY.set(clientY - cardRect.top - glareRect.height / 2);
  };

  const handleLeave = () => {
    if (!cardRef.current || !glareRef.current) return;
    const cardRect = cardRef.current.getBoundingClientRect();
    x.set(cardRect.width / 2);
    y.set(cardRect.height / 2);
    glareX.set(0);
    glareY.set(0);
  };

  return (
    <motion.div
      layout
      ref={cardRef}
      className={`aspect-roundedCard w-full h-full flex items-center justify-center overflow-hidden`}
      style={{
        rotateY: isRotate ? rotateSpringY : 0,
        rotateX: isRotate ? rotateSpringX : 0,
        position: position,
        borderRadius: radius,
      }}
      initial={{ rotateX: 0, rotateY: 0 }}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseLeave={handleLeave}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }}
      onTouchEnd={handleLeave}
    >
      <motion.div
        layout
        ref={glareRef}
        className={`absolute w-full h-full inset-0 bg-radial-custom from-primary from-25% to-background to-75% opacity-85`}
        style={{
          x: springGlareX,
          y: springGlareY,
          borderRadius: radius,
          margin: "auto",
        }}
      />
      <div
        className={`absolute bg-sidebar inset-0.5 content-center text-center text-xl font-bold cursor-pointer overflow-hidden md:p-2 p-1`}
        style={{
          borderRadius: radius,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
MotionCard.displayName = "MotionCard";
