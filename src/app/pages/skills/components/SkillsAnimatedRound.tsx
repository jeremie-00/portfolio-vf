"use client";
import { MotionBox } from "@/app/components/framer-motion/MotionBox";
import { MotionCard } from "@/app/components/framer-motion/MotionCard";
import { MotionCircleBox } from "@/app/components/framer-motion/MotionCircleBox";
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
  //const [circleSize, setCircleSize] = useState(0);
  const [containerSize, setContainerSize] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (circleRef.current) {
        const rect = circleRef.current.getBoundingClientRect();
        //setCircleSize(rect.width); // Ou `rect.height` si nécessaire
        //console.log("Taille réelle du cercle :", rect.width);
        const maxSize = Math.min(rect.width, rect.height); // Récupère la dimension la plus petite entre largeur et hauteur
        setContainerSize(maxSize * sizeMultiplier + skills.length * 10);
        //console.log("maxSize du cercle :", maxSize);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [skills.length, sizeMultiplier]);

  const radius = containerSize / 2 + skills.length; // Calcule le rayon du cercle : moitié du conteneur + marge basée sur le nombre de compétences

  if (!skills) {
    return <div>not skills</div>;
  }

  return (
    <div
      ref={circleRef}
      className="relative w-full h-full flex flex-col items-center justify-center min-h-[60vh]"
    >
      {/* <AnimatePresence mode="popLayout"> */}
      <MotionCircleBox layout>
        <MotionBox
          size={containerSize / 2}
          zIndex={50}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {skills[0] && skills[0].image && skills[0].image.url ? (
            <Image
              src={skills[0].image.url}
              alt={skills[0].image.alt}
              width={100}
              height={100}
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            "Mes skills"
          )}
        </MotionBox>

        {skills.map((item, index) => {
          // Calcule la position sur le cercle
          const totalElements = skills.length; // Nombre total d'éléments
          const angle = (index / totalElements) * 360; // Angle en degrés
          const radians = (angle * Math.PI) / 180; // Conversion en radians
          const x = Math.cos(radians) * radius; // Position horizontale
          const y = Math.sin(radians) * radius; // Position verticale
          const roundedX = parseFloat(x.toFixed(2)); // Arrondi à 2 décimales
          const roundedY = parseFloat(y.toFixed(2)); // Arrondi à 2 décimales
          const boxSize = containerSize / 3.3;

          return boxSize ? (
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
              </MotionCard>{" "}
            </MotionBox>
          ) : (
            <h2 key={index} className="absolute">
              Loading...
            </h2>
          );
        })}
      </MotionCircleBox>
      {/*  </AnimatePresence> */}
    </div>
  );
}

/* const Grid = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <div className="gridBox w-full h-full" ref={ref}>
        {children}
      </div>
    );
  }
);

const MotionGrid = motion(Grid); */

{
  /* <MotionGrid>
        <motion.div
          key={skillsCentral[0].id}
          initial={{ opacity: 1, scale: 1.75 }}
          animate={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ delay: skills.length * 0.12 }}
          style={{
            position: "absolute",
            //width: "150px",
            //height: "150px",
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            top: 0,
            borderRadius: "8px",
            zIndex: 2, // zIndex initial
          }}
        >
          <SkillCard
            skill={skillsCentral[0]}
            isAdmin={false}
            roundedFull={true}
          />
        </motion.div>
        {skillsOthers.map((item, index) => (
          <motion.div
            key={item.id + "item"}
            layout
            transition={{ delay: index * 0.1 }} // Délai progressif pour chaque élément
            style={{
              position: position,
              display: "flex",
              justifyContent: "center", // Centre le contenu horizontalement dans chaque case
              top: 0,
              alignItems: "center", // Centre le contenu verticalement dans chaque case
              borderRadius: "8px",
              zIndex: 1,
            }}
          >
            <SkillCard skill={item} isAdmin={false} roundedFull={true} />
          </motion.div>
        ))}
      </MotionGrid> */
}
{
  /*   <motion.div
        layout
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gridAutoRows: "minmax(150px, auto)",
          gridGap: 8,
          maxWidth: 768,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyItems: "center",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {skillsOthers.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            transition={{ delay: index * 0.1 }} // Délai progressif pour chaque élément
            style={{
              position: position,
              //width: "150px",
              //height: "150px",
              display: "flex",
              justifyContent: "center", // Centre le contenu horizontalement dans chaque case
              top: 0,
              alignItems: "center", // Centre le contenu verticalement dans chaque case
              borderRadius: "8px",
              zIndex: 1,
            }}
          >
            <SkillCard skill={item} isAdmin={false} roundedFull={true} />
          </motion.div>
        ))}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={skillsCentral[0].id}
            initial={{ opacity: 1, scale: 1.75 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: skillsOthers.length * 0.12 }}
            style={{
              position: "absolute",
              //width: "150px",
              //height: "150px",
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
              top: 0,
              borderRadius: "8px",
              zIndex: 2, // zIndex initial
            }}
          >
            <SkillCard
              skill={skillsCentral[0]}
              isAdmin={false}
              roundedFull={true}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div> */
}

/* import SkillCard from "@/app/dashboard/skill/components/SkillCard";
import { FullSkill  } from "@/app/types/prismaTypes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SkillComponent({ skills }: { skills: FullSkill [] }) {
  const skillsCentral = skills.filter((skill) => skill.title === "Skills");
  const skillsOthers = skills.filter((skill) => skill.title !== "Skills");

  const [center, setCenter] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const calculateCenter = () => {
      const wrapper = document.getElementById("wrapper");
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setCenter({ x: centerX, y: centerY });
      }
    };

    calculateCenter(); // Initial calculation
    window.addEventListener("resize", calculateCenter); // Recalculate on resize
    return () => window.removeEventListener("resize", calculateCenter);
  }, []);
  console.log(center);
  if (center.x === 0 && center.y === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full h-full">
    
      <div
        className="absolute bg-white rounded-full"
        style={{
          width: "10px",
          height: "10px",
          top: `${center.y}px`,
          left: `${center.x}px`,
          transform: "translate(-50%, -50%)",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
        }}
      ></div>


      <motion.div
        className="absolute z-10 cursor-pointer w-max origin-center flex items-center justify-center m-auto"
        initial={{
          x: center.x - 75,
          y: center.y + 75,
        }}
        animate={{
          x: center.x - 75,
          y: center.y + 75,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
      >
        <SkillCard
          skill={skillsCentral[0]}
          isAdmin={false}
          roundedFull={false}
        />
      </motion.div>

 
      {skillsOthers.map((skill, index) => (
        <motion.div
          key={skill.id}
          className="absolute z-0 cursor-pointer w-max origin-center flex items-center justify-center m-auto"
          initial={{
            x: center.x - 75,
            y: center.y + 75,
            opacity: 0,
          }}
          animate={{
            x: center.x - skill.order + 75 * 2,
            y: center.y / 2,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: index * 0.2,
          }}
        >
          <SkillCard skill={skill} isAdmin={false} roundedFull={false} />
        </motion.div>
      ))}
    </div>
  );
}
 */
