"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

type TypewriterEffectProps = {
  words: string[];
};

export default function TypewriterEffect({ words }: TypewriterEffectProps) {
  const [index, setIndex] = useState(0);
  const baseText = useMotionValue("");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    words[index].slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, words[index].length, {
      type: "tween",
      duration: 1.5, // Typing speed
      ease: "easeInOut",
      onComplete: () => {
        setTimeout(() => {
          // Wait before deleting
          const deleteControls = animate(count, 0, {
            type: "tween",
            duration: 1, // Deleting speed
            ease: "easeInOut",
            onComplete: () => {
              setIndex((prev) => (prev + 1) % words.length);
            },
          });
          return () => deleteControls.stop();
        }, 1500); // Pause at end of word
      },
    });

    return () => controls.stop();
  }, [count, index, words]);

  return (
    <span className="inline-flex items-center">
      <motion.span>{displayText}</motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-6 sm:h-8 bg-gray-950 dark:bg-white ml-1 align-middle"
      />
    </span>
  );
}
