"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

export default function Experience() {
  const { ref } = useSectionInView("Experience", 0.2);

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      
      <div className="flex flex-col gap-10 items-center justify-center relative w-full px-4 sm:px-0">
        {/* Central Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700 hidden sm:block sm:left-1/2 sm:-translate-x-1/2 rounded-full"></div>

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
            <div className={`absolute left-8 sm:left-1/2 sm:-translate-x-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-800 flex items-center justify-center z-10 shadow-md ${
                 index % 2 === 0 ? "-translate-x-1/2" : "-translate-x-1/2"
            } hidden sm:flex`}>
               {item.icon}
            </div>

             {/* Spacer for the other side on Desktop */}
            <div className="w-full sm:w-[45%]"></div>

            {/* Content Card */}
            <div className="w-full sm:w-[45%] pl-0 sm:pl-0">
                <div className="bg-gray-100 p-8 rounded-lg shadow-md sm:hover:shadow-lg sm:hover:bg-gray-200 dark:hover:bg-white/20 transition border border-black/5 dark:bg-white/10 dark:border-white/5 mx-auto relative overflow-hidden">
                    <h3 className="font-semibold capitalize text-xl text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="font-normal mt-0! text-gray-700 dark:text-white/70 mb-4">{item.location}</p>
                    <p className="mt-1! font-normal! text-gray-700 dark:text-white/75 leading-relaxed">
                        {item.description}
                    </p>
                     <p className="text-gray-500 dark:text-white/50 text-sm mt-4 font-medium uppercase tracking-wider">
                        {item.date}
                    </p>
                </div>
                
                {/* Arrow (Visual only - Desktop) */}
                <div 
                    className={`hidden sm:block absolute top-10 w-4 h-4 bg-gray-100 dark:bg-gray-800 rotate-45 border-b border-l border-black/5 dark:border-white/5 z-0 ${
                        index % 2 === 0 
                            ? "right-[calc(55%-0.4rem)] border-t border-r border-b-0 border-l-0 dark:bg-[#1f2937]" 
                            : "left-[calc(55%-0.4rem)] dark:bg-[#1f2937]"
                    }`} 
                ></div>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}

