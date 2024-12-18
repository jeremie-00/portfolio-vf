"use client";

import DevelopperDesk from "@/app/components/desktopSvg/DevelopperDesk";
import { buttonVariants } from "@/components/ui/button";
import { FullSectionPage } from "@/types/prismaTypes";
import Link from "next/link";

interface HomeProps {
  section: FullSectionPage | null;
}

export default function HomeSvgPage({ section }: HomeProps) {
  if (!section) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        SectionPage introuvable
      </div>
    );
  }
  return (
    <section className="w-full h-full flex md:px-12 p-4 md:gap-4">
      <div className="flex flex-col justify-start items-center mt-2 sm:mt-3 md:mt-4 xl:mt-5 max-md:hidden">
        <div className="w-5 h-5 rounded-full bg-primary" />
        <div className="w-1 min-[900px]:h-80 h-48 bg-gradient-to-b from-primary" />
      </div>

      <div className="w-full h-full flex flex-col gap-3">
        <h1 className="font-black dark:text-white xl:text-[50px] lg:text-[46px] md:text-[44px] sm:text-[40px] text-[28px]">
          {section.titles.map((title, index) =>
            index === 1 ? (
              <span key={title.id} className="text-primary">
                {" " + title.text}
              </span>
            ) : (
              <span key={title.id}>{title.text}</span>
            )
          )}
        </h1>
        {section.contents.map((content) => (
          <p
            key={content.id}
            className="flex-1 w-full h-full flex flex-col text-textColor font-medium xl:text-[32px] lg:text-[30px] md:text-[24px] sm:text-[24px] text-[20px]"
          >
            {content.text}
          </p>
        ))}
        <div className="flex w-full h-full flex-col max-sm:items-center justify-center">
          <div className="pt-6">
            <Link
              className={buttonVariants({
                variant: "default",
                size: "default",
              })}
              href="/pages/contact"
            >
              Contactez-moi
            </Link>
          </div>

          <div className="w-full h-full flex items-center justify-center">
            <DevelopperDesk />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end items-center mt-2 sm:mt-3 md:mt-4 xl:mt-5 max-md:hidden">
        <div className="w-1 min-[900px]:h-80 h-48 bg-gradient-to-t from-primary" />
        <div className="w-5 h-5 rounded-full bg-primary" />
      </div>
    </section>
  );
}
