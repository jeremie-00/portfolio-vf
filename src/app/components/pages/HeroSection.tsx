import { FullSectionPage } from "@/types/prismaTypes";

export default function HeroSection({
  section,
}: {
  section: FullSectionPage | null;
}) {
  if (!section) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
        Oups, pas le moindre contenu à l&apos;horizon ! 🤦‍♂️
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col md:px-12 p-4 md:gap-4">
      <div className="flex flex-col gap-8">
        <h1 className="text-center font-extrabold text-textColor xl:text-[60px] lg:text-[50px] md:text-[44px] sm:text-[40px] text-[28px]">
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
        <div className="flex flex-col text-center text-textColor font-medium xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px]">
          {section.contents.map((content) => (
            <p key={content.id}>{content.text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
