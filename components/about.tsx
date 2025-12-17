"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");
  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-180 text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I am a <span className="font-medium">Computer Science engineer</span> driven by the art of building software. With a deep focus on{" "}
        <span className="font-medium">Full-Stack Development and DevOps</span>, I don't just write code; I design ecosystems. My journey has been defined by a relentless pursuit of{" "}
        <span className="italic">scalability, performance, and best practices</span>.
      </p>

      <p className="mb-3">
        My technical arsenal includes{" "}
        <span className="font-medium">
          React, Next.js, Node.js, PostgreSQL, and TypeScript
        </span>
        . Beyond applications, I specialize in infrastructure—orchestrating with{" "}
        <span className="font-medium">
          Docker, Kubernetes, and AWS
        </span>
        . I believe in software that performs as beautifully as it looks.
      </p>

      <p>
        Currently, I am leveraging my skills to engineer <span className="underline">secure, high-availability systems</span>. When I'm not coding, I'm exploring new cloud-native technologies, ensuring that I stay at the cutting edge of modern development.
      </p>
    </motion.section>
  );
}