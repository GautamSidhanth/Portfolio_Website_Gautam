"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * (index % 15), // Modulo 15 creates a wave effect without huge delays
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-212 scroll-mt-28 text-center sm:mb-40 px-4"
    >
      <SectionHeading>My Skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-200">
        {skillsData.map((skill, index) => (
          <motion.li
            className=""
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: false,
            }}
            custom={index}
          >
            <motion.div
                 className="bg-white/10 border border-white/10 rounded-xl px-5 py-3 text-white/80 transition hover:scale-105 hover:bg-white/20 cursor-default shadow-sm"
                 animate={{ y: [0, -6, 0] }}
                 transition={{
                   duration: 3 + (index % 3), 
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
            >
              {skill}
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
