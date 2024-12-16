"use client";
import { DeleteAlerteButton } from "@/app/components/Buttons";
import { MotionCard } from "@/app/components/framer-motion/MotionCard";
import { FullSkill } from "@/types/prismaTypes";

import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  const deletedSkill = async () => {
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
    <MotionCard isRotate={false}>
      {isAdmin && skill ? (
        <>
          <div className="w-full flex items-center justify-between pb-0 px-3 pt-1">
            {skill.display ? <Eye /> : <EyeClosed />}
          </div>
          <div className="absolute flex flex-col top-0 left-0 w-full h-full items-center justify-center rounded-xl p-4 bg-background/60 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-center w-full gap-8 p-3 md:flex-row h-16">
              <Link href={`/dashboard/skills/${skill.id}`}>
                <Button type="button" size="icon" variant="secondary">
                  <Pencil
                    style={{ width: "26px", height: "26px" }}
                    color="#ffffff"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                </Button>
              </Link>
              <DeleteAlerteButton
                actionButtonDelete={deletedSkill}
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
/*   return (
    <Card className="flex items-center justify-center transition duration-200 hover:shadow-xl hover:-translate-y-1 md:flex-col">
      {isAdmin && (
        <CardHeader className="w-full flex-col flex items-center justify-center gap-4 hidden min-[420px]:flex lg:justify-between md:flex-row">
          {skill.display ? <Eye /> : <EyeClosed />}
          <span>{skill.order}</span>
        </CardHeader>
      )}

      <CardContent className="w-full flex flex-col items-center justify-center pt-6 lg:flex-1">
        {image && image.url ? (
          <Image
            src={image.url}
            alt={image.alt}
            width={200}
            height={200}
            className="w-full rounded-lg object-cover w-[200px] h-[200px]"
            priority
          />
        ) : null}
        <h3 className="lg:text-3xl">{skill.title}</h3>
      </CardContent>
      {isAdmin && (
        <CardFooter className="w-full flex flex-col items-center justify-center gap-4 pt-6 md:flex-row lg:justify-between">
          <UpdateButton href={`/dashboard/skill/${skill.id}`} />
          <DeleteButton action={deleteSkill} id={skill.id} />
        </CardFooter>
      )}
    </Card>
  ); */
