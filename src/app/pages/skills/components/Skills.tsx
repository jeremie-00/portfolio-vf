"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { FullSkill } from "@/types/prismaTypes";
import { motion } from "framer-motion"; // Utilisation de 'framer-motion'
import Image from "next/image";

export default function Skills({
  skills,
  direction = "left",
  speed = 50,
}: {
  skills: FullSkill[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const isMobile = useIsMobile();
  const isLeft = direction === "left";
  const translateX = "-50.5%";
  const animation = isLeft ? ["0%", translateX] : [translateX, "0%"];

  return (
    <motion.div
      className="flex gap-10 whitespace-nowrap"
      style={{
        width: "max-content",
      }}
      animate={{
        x: animation,
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        duration: speed,
        ease: "linear",
      }}
    >
      {[...skills, ...skills].map((skill, index) => (
        <div
          key={`${skill.id}-${index}`}
          className="shadow-md rounded-xl border border-border dark:border-secondary dark:shadow-xl"
        >
          <Image
            src={skill.image?.url || "/globe.svg"}
            alt={`${skill.title} logo`}
            className="object-cover rounded-xl p-1"
            width={isMobile ? 70 : 100}
            height={isMobile ? 70 : 100}
          />
        </div>
      ))}
    </motion.div>
  );
}
