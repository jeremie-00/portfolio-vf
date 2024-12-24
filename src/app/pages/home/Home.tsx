import { getSectionByTypeAction } from "@/app/dashboard/sections/services/section.action";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Home({ children }: { children: ReactNode }) {
  const section = await getSectionByTypeAction("home");

  if (!section) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
        Oups, pas le moindre contenu à l&apos;horizon ! 🤦‍♂️
      </div>
    );
  }
  return (
    <section className="w-full h-full flex md:px-12 py-4 px-4 md:gap-4">
      <div className="flex flex-col justify-start items-center mt-2 sm:mt-3 md:mt-4 xl:mt-5 max-md:hidden">
        <div className="w-5 h-5 rounded-full bg-primary" />
        <div className="w-1 min-[900px]:h-80 h-48 bg-gradient-to-b from-primary" />
      </div>

      <div className="w-full h-full flex flex-col gap-3 max-md:text-center">
        <h1 className="font-extrabold text-textColor xl:text-[50px] lg:text-[46px] md:text-[44px] sm:text-[40px] text-[28px]">
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
            className="flex-1 w-full h-full flex flex-col p-2 text-textColor font-medium xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px]"
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
          {children}
        </div>
      </div>
      <div className="flex flex-col justify-end items-center mt-2 sm:mt-3 md:mt-4 xl:mt-5 max-md:hidden">
        <div className="w-1 min-[900px]:h-80 h-48 bg-gradient-to-t from-primary" />
        <div className="w-5 h-5 rounded-full bg-primary" />
      </div>
    </section>
  );
}
