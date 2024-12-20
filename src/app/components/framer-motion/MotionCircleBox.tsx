import { motion } from "motion/react";
import { forwardRef } from "react";

const CircleBox = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; size: number }
>(({ children, size }, ref) => {
  return (
    <div
      id="circleBox"
      className="relative flex items-center justify-center rounded-full"
      ref={ref}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
});
CircleBox.displayName = "CircleBox";
export const MotionCircleBox = motion.create(CircleBox);
