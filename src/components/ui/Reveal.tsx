import { motion } from "framer-motion";
import type { HTMLMotionProps, Variants } from "framer-motion";
import type { ReactNode } from "react";
const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};
type RevealProps = HTMLMotionProps<"div"> & {
  as?: typeof motion.div;
  children: ReactNode;
  className?: string;
  delay?: number;
};
export default function Reveal({
  as: Component = motion.div,
  children,
  className = "",
  delay = 0,
  ...props
}: RevealProps) {
  return (
    <Component
      className={className}
      variants={defaultVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      {...props}
    >
      {children}
    </Component>
  );
}
