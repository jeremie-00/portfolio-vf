"use client";
import { useState } from "react";

import DynamicIcon from "@/app/dashboard/icons/components/DynamicIcon";
import Image from "next/image";

export default function SlideShow({ pictures }: { pictures: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? pictures.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full lg:h-[38rem] md:h-[28rem] h-[22rem] flex flex-col gap-6 max-w-[1200px]">
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative shadow-lg w-full h-full m-auto flex items-center justify-center border border-border rounded-xl overflow-hidden">
          {pictures.map((picture, index) => (
            <Image
              key={index}
              className={`slide-img ${index === activeIndex ? `active` : ``}`}
              src={picture}
              alt={`image ${index}`}
              width={800}
              height={420}
              priority={true}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-8">
        <div className="cursor-pointer" onClick={handlePrev}>
          <DynamicIcon name="ChevronLeft" size={50} className="text-primary" />
        </div>
        <span
          className={
            pictures.length <= 1
              ? "hidden"
              : "bg-sidebar text-primary text-center rounded-lg px-3 py-1 text-md font-semibold"
          }
        >
          {activeIndex + 1} / {pictures.length}
        </span>
        <div className="cursor-pointer" onClick={handleNext}>
          <DynamicIcon name="ChevronRight" size={50} className="text-primary" />
        </div>
      </div>
    </div>
  );
}
