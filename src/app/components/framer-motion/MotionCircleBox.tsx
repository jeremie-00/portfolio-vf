import { motion } from "motion/react";
import { forwardRef } from "react";

const CircleBox = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; size: number }
>(({ children }, ref) => {
  return (
    <div
      id="circleBox"
      className="relative flex items-center justify-center rounded-full gap-4"
      ref={ref}
    >
      {children}
    </div>
  );
});
CircleBox.displayName = "CircleBox";
export const MotionCircleBox = motion.create(CircleBox);
