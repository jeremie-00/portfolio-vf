"use client";
import { FullSkill } from "@/types/prismaTypes";
import { motion } from "motion/react";
import Image from "next/image";

export default function Skills({
  skills,
  translate,
}: {
  skills: FullSkill[];
  translate?: "left" | "right";
}) {
  const translateX = translate === "left" ? "-100%" : "100%";
  const animateX = translate === "left" ? ["0%", "-100%"] : ["-100%", "0%"];
  return (
    <motion.div
      className="inline-flex md:gap-20 gap-10"
      initial={{ x: translateX }}
      animate={{
        x: animateX,
      }}
      transition={{
        repeat: Infinity,
        duration: 50,
        ease: "linear",
      }}
    >
      {skills.map((skill) => (
        <Image
          key={skill.id}
          src={skill.image?.url || "/globe.svg"}
          alt={`${skill.title} logo`}
          className="object-cover"
          width={100}
          height={100}
        />
      ))}
      {skills.map((skill) => (
        <Image
          key={skill.id}
          src={skill.image?.url || "/globe.svg"}
          alt={`${skill.title} logo`}
          className="object-cover"
          width={100}
          height={100}
        />
      ))}
    </motion.div>
  );
}
