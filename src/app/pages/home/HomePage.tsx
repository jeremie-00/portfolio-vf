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
    <>
      <section className="relative w-full h-full flex flex-1 p-12 gap-6 max-[900px]:flex-col">
        <div className="w-full h-full flex gap-6">
          <div className="flex flex-col justify-start items-center mt-2 sm:mt-3 md:mt-4 xl:mt-5">
            <div className="w-5 h-5 rounded-full bg-primary" />
            <div className="w-1 min-[900px]:h-80 h-48 bg-gradient-to-b from-primary" />
          </div>
          <div className="w-full h-full flex flex-col">
            <h1 className="font-black dark:text-white xl:text-[60px] lg:text-[50px] md:text-[44px] sm:text-[40px] text-[28px]">
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
            <div className="flex flex-col dark:text-[#dfd9ff] font-medium xl:text-[34px] lg:text-[30px] md:text-[24px] sm:text-[24px] text-[20px]">
              {section.contents.map((content) => (
                <p key={content.id}>{content.text}</p>
              ))}
            </div>
            <div className="w-full h-full flex pt-10 justify-center min-[900px]:justify-start max-[900px]:pr-8">
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
          </div>
        </div>

        <div className="min-[900px]:absolute min-[900px]:right-8 xl:w-[500px] lg:w-[400px] min-[900px]:w-[370px] w-full h-full flex flex-1 items-center min-[900px]:justify-end justify-center gap-4">
          <DevelopperDesk />
        </div>
      </section>
    </>
  );
}
