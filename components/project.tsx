"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  githubUrl,
  liveUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-gray-100 max-w-200 border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-100 hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20 shadow-lg hover:shadow-2xl backdrop-blur-[10px] dark:border-white/5 sm:group-hover:scale-[1.02]">
        
        {/* Shine Effect */}
        <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-all duration-700 ease-in-out sm:group-hover:left-full z-10 pointer-events-none"></div>
        <div className="pt-4 pb-4 px-5 sm:pl-10 sm:pr-2 sm:pt-8 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-88 z-20 relative">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-200">
            {title}
          </h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="bg-black/70 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="flex gap-3 mt-4 sm:mt-auto z-20">
            <a
              href={githubUrl}
              target="_blank"
              className="bg-white p-3 text-gray-700 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60 shadow-md hover:shadow-xl"
            >
              <FaGithub size={19} />
            </a>
            
            <a
              href={liveUrl}
              target="_blank"
              className="bg-gray-900 text-white px-5 py-2.5 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition shadow-md hover:shadow-xl dark:bg-white/10 text-sm font-semibold"
            >
              Live Demo{" "}
              <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
            </a>
          </div>
        </div>

        <Image
          src={imageUrl}
          alt="Project I worked on"
          quality={95}
          className="absolute hidden sm:block top-8 -right-40 w-lg h-full object-cover object-top rounded-t-lg shadow-2xl
        transition 
        group-hover:scale-[1.04]
        group-hover:-translate-x-3
        group-hover:translate-y-3
        group-hover:-rotate-2

        group-even:group-hover:translate-x-3
        group-even:group-hover:translate-y-3
        group-even:group-hover:rotate-2

        group-even:right-[initial]
        group-even:-left-40"
        />
      </section>
    </motion.div>
  );
}