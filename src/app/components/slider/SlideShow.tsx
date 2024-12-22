"use client";
import { useState } from "react";

import { DynamicIcon } from "@/app/dashboard/icons/components/DynamicIcon";
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
    <div className="w-full h-full flex flex-col gap-6">
      <div className="relative aspect-slider shadow-lg w-full h-full m-auto flex items-center justify-center border border-border rounded-xl overflow-hidden">
        {pictures.map((picture, index) => (
          <Image
            key={index}
            className={`absolute w-full h-full bg-cover bg-center object-cover transition-opacity duration-700 rounded-xl ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            src={picture}
            alt={`image ${index}`}
            width={1200}
            height={540}
            priority={true}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-12">
        <div
          className={pictures.length <= 1 ? "hidden" : "cursor-pointer"}
          onClick={handlePrev}
        >
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
        <div
          className={pictures.length <= 1 ? "hidden" : "cursor-pointer"}
          onClick={handleNext}
        >
          <DynamicIcon name="ChevronRight" size={50} className="text-primary" />
        </div>
      </div>
    </div>
  );
}
