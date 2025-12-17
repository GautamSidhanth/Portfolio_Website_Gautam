import React from "react";
import { motion } from "framer-motion";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <motion.h2
      className="text-3xl font-medium capitalize mb-8 text-center"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
      }}
      viewport={{
        once: false,
      }}
    >
      {children}
    </motion.h2>
  );
}