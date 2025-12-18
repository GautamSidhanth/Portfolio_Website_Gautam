"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

export default function Experience() {
  const { ref } = useSectionInView("Timeline", 0.2);

  return (
    <section id="timeline" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My timeline</SectionHeading>
      
      <div className="flex flex-col gap-10 items-center justify-center relative w-full px-4 sm:px-0">
            {/* Central Line */}
            <div className="absolute left-4 sm:left-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700 sm:-translate-x-1/2 rounded-full"></div>

            {experiencesData.map((item, index) => (
              <motion.div
                key={index}
                className={`flex flex-col sm:flex-row items-center justify-between w-full relative group ${
                  index % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline Dot/Icon */}
                <div
                  className={`absolute left-4 sm:left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-gray-900 bg-gray-800 flex items-center justify-center z-10 shadow-md ${
                     index % 2 === 0 ? "sm:-translate-x-1/2" : "sm:-translate-x-1/2"
                  }`}
                >
                  {item.icon}
                </div>

                {/* Spacer for the other side on Desktop */}
                <div className="w-full sm:w-[45%] hidden sm:block"></div>

                {/* Content Card */}
                <div className="w-full sm:w-[45%] pl-12 sm:pl-0 relative z-0">
                  <div className="bg-white/5 p-6 sm:p-8 rounded-lg shadow-md sm:hover:shadow-lg hover:bg-white/10 transition border border-white/5 mx-auto relative overflow-hidden backdrop-blur-sm">
                    <h3 className="font-semibold capitalize text-lg sm:text-xl text-white">
                      {item.title}
                    </h3>
                    <p className="font-normal mt-0! text-white/70 mb-4 text-sm sm:text-base">
                      {item.location}
                    </p>
                    <p className="mt-1! font-normal! text-white/75 leading-relaxed text-sm sm:text-base">
                      {item.description}
                    </p>
                    <p className="text-white/50 text-xs sm:text-sm mt-4 font-medium uppercase tracking-wider">
                      {item.date}
                    </p>
                  </div>

                  {/* Arrow (Visual only - Desktop) */}
                  <div
                    className={`hidden sm:block absolute top-10 w-4 h-4 bg-white/5 rotate-45 border-b border-l border-white/5 z-0 ${
                      index % 2 === 0
                        ? "-right-2 border-t border-r border-b-0 border-l-0" // Left Card: Arrow on Right
                        : "-left-2" // Right Card: Arrow on Left
                    }`}
                  ></div>
                   {/* Arrow (Visual only - Mobile) */}
                   <div className="sm:hidden absolute top-8 left-10 w-4 h-4 bg-white/5 rotate-45 border-b border-l border-white/5 z-0"></div>
                </div>
              </motion.div>
        ))}
      </div>
    </section>
  );
}

