"use client";
import { DeleteAlerteButton } from "@/app/components/Buttons";
import { MotionCard } from "@/app/components/framer-motion/MotionCard";
import { FullSkill } from "@/types/prismaTypes";

import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconPencil } from "../../icons/components/DynamicIcon";
import { deleteSkillAction } from "../services/skill.action";
import { ToastSkillAction } from "./ToastSkill";

interface SkillCardProps {
  skill: FullSkill | null;
  isAdmin: boolean;
  roundedFull?: boolean;
  bgColor?: boolean;
}

export default function SkillCard({ skill, isAdmin }: SkillCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDeletedSkill = async () => {
    setIsLoading(true);
    const result = await deleteSkillAction({
      ID: skill?.id,
      imageId: skill?.image?.id,
      imageUrl: skill?.image?.url,
    });
    setIsLoading(false);
    const actionType = "supprimer";
    if (result?.serverError || result?.validationErrors) {
      ToastSkillAction({
        actionType,
        serverError: result?.serverError,
        validationErrors: result?.validationErrors,
      });
    }
    if (result?.data) {
      ToastSkillAction({ data: result.data, actionType });
    }
  };
  return (
    <MotionCard>
      {isAdmin && skill ? (
        <>
          <div className="w-full flex items-center justify-between pb-0 px-3 pt-1">
            {skill.display ? <Eye /> : <EyeClosed />}
          </div>
          <div className="absolute flex flex-col top-0 left-0 w-full h-full items-center justify-center rounded-xl p-4 bg-background/60 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-center w-full gap-8 p-3 md:flex-row h-16">
              <Link href={`/dashboard/skills/${skill.id}`}>
                <Button type="button" size="icon" variant="secondary">
                  <IconPencil pending={false} />
                </Button>
              </Link>
              <DeleteAlerteButton
                actionButtonDelete={handleDeletedSkill}
                pendingDelete={isLoading}
              />
            </div>
          </div>
        </>
      ) : null}

      <div className="lg:w-full flex flex-col items-center justify-center p-0">
        {skill && skill.image && skill.image.url ? (
          <Image
            src={skill.image.url}
            alt={skill.image.alt}
            width={100}
            height={100}
            className="object-cover p-3 w-full h-full"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h3 className="lg:text-xl">WEB</h3>
          </div>
        )}
        {isAdmin && skill ? (
          <h3 className="lg:text-xl">{skill.title}</h3>
        ) : null}
      </div>
    </MotionCard>
  );
}
