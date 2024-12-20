"use client";
import { MotionBox } from "@/app/components/framer-motion/MotionBox";
import { MotionCard } from "@/app/components/framer-motion/MotionCard";
import { MotionCircleBox } from "@/app/components/framer-motion/MotionCircleBox";
import Loader from "@/app/components/Loader";
import { useIsMobile } from "@/hooks/use-mobile";
import { FullSkill } from "@/types/prismaTypes";
//import { useIsMobile } from "@/hooks/use-mobile";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SkillsAnimatedRound({
  skills,
}: {
  skills: FullSkill[];
}) {
  const isMobile = useIsMobile();
  const sizeMultiplier = isMobile ? 0.3 : 0.5; // Définit le facteur multiplicateur de taille en fonction du type de périphérique
  const circleRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState(0);

  const skillsCentral = skills.filter((skill) => skill.title === "skills"); // Filtre pour l'élément central "Skills"
  const skillsOthers = skills.filter((skill) => skill.title !== "skills"); // Filtre pour les autres compétences

  useEffect(() => {
    const updateSize = () => {
      if (circleRef.current) {
        const rect = circleRef.current.getBoundingClientRect();
        const maxSize = Math.min(rect.width, rect.height); // Récupère la dimension la plus petite entre largeur et hauteur
        setContainerSize(maxSize * sizeMultiplier + skillsOthers.length * 10);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [skillsOthers.length, sizeMultiplier, containerSize]);

  const radius = containerSize / 2 + skillsOthers.length;

  if (!skills) {
    return <div>not skills</div>;
  }

  return (
    <div
      ref={circleRef}
      className="relative w-full h-full flex flex-col items-center justify-center"
    >
      <MotionCircleBox layout size={containerSize}>
        <MotionBox
          size={containerSize / 2}
          zIndex={50}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {skillsCentral[0] &&
          skillsCentral[0].image &&
          skillsCentral[0].image.url ? (
            <Image
              src={skillsCentral[0].image.url}
              alt={skillsCentral[0].image.alt}
              width={100}
              height={100}
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            "Mes skills"
          )}
        </MotionBox>

        {containerSize ? (
          skillsOthers.map((item, index) => {
            // Calcule la position sur le cercle
            const totalElements = skillsOthers.length; // Nombre total d'éléments
            const angle = (index / totalElements) * 360; // Angle en degrés
            const radians = (angle * Math.PI) / 180; // Conversion en radians
            const x = Math.cos(radians) * radius; // Position horizontale
            const y = Math.sin(radians) * radius; // Position verticale
            const roundedX = parseFloat(x.toFixed(2)); // Arrondi à 2 décimales
            const roundedY = parseFloat(y.toFixed(2)); // Arrondi à 2 décimales
            const boxSize = containerSize / 4.2;

            return (
              <MotionBox
                size={boxSize}
                zIndex={index + 10}
                key={item.id}
                initial={{ opacity: 0, translateX: 0, translateY: 0 }}
                animate={{
                  opacity: 1,
                  translateX: `${roundedX}px`,
                  translateY: `${roundedY}px`,
                }}
                exit={{ opacity: 0, translateX: 0, translateY: 0 }}
                transition={{ delay: index * 0.1, duration: 0.1 }}
              >
                <MotionCard
                  key={item.id}
                  position="absolute"
                  size={{ width: boxSize, height: boxSize }}
                  isRounded={true}
                  isRotate={true}
                >
                  <Image
                    src={item.image?.url || "/globe.svg"}
                    alt={`${item.title} logo`}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </MotionCard>
              </MotionBox>
            );
          })
        ) : (
          <div className="absolute">
            <Loader />
          </div>
        )}
      </MotionCircleBox>
    </div>
  );
}
