"use client";
import DynamicIcon from "@/app/dashboard/icons/components/DynamicIcon";
import { ReactNode, useState } from "react";

export default function Collaps({
  children,
  title,
}: {
  children: ReactNode;
  title: string | undefined;
}) {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <div className="container-collaps">
      <div
        className={`collaps bg-sidebar gap-4 p-5 rounded-t-lg  ${
          active ? "rounded-t-lg" : "rounded-lg"
        }`}
      >
        <DynamicIcon name="AlignLeft" size={24} className="text-primary" />
        <h2 className="flex flex-1 font-bold">{title}</h2>
        <div onClick={handleToggle}>
          <DynamicIcon
            name="ChevronDown"
            size={40}
            className={
              active
                ? "arrow-collaps rotate text-primary"
                : "arrow-collaps text-primary "
            }
          />
        </div>
      </div>

      <div
        className={
          active ? "content-collaps visible " : "content-collaps hidden"
        }
      >
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
