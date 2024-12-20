import { motion } from "motion/react";
import { forwardRef } from "react";

const Box = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; size: number; zIndex?: number }
>(({ children, size, zIndex = 0 }, ref) => {
  return (
    <div
      className="absolute grid place-content-center"
      style={{
        opacity: 0,
        width: `${size}px`,
        height: `${size}px`,
        zIndex: zIndex,
      }}
      ref={ref}
    >
      {children}
    </div>
  );
});
Box.displayName = "Box";
export const MotionBox = motion.create(Box);
