"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Colors for the trail (Rainbow)
  const colors = [
    "#ff0000",
    "#ffa500",
    "#ffff00",
    "#008000",
    "#0000ff",
    "#4b0082",
    "#ee82ee"
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {colors.map((color, index) => (
        <CursorDot
          key={index}
          mouseX={mouseX}
          mouseY={mouseY}
          color={color}
          index={index}
        />
      ))}
    </>
  );
}

function CursorDot({ mouseX, mouseY, color, index }: { mouseX: any, mouseY: any, color: string, index: number }) {
    // Vary stiffness/damping to create a fluid trail effect
    const springConfig = { 
        damping: 20 + index * 2, 
        stiffness: 250 - index * 20,
        mass: 0.5
    };
    
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Size decreases slightly for trailing dots
    const size = 16 - index; 

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none"
            style={{
                width: size,
                height: size,
                translateX: x,
                translateY: y,
                backgroundColor: color,
                marginLeft: -size / 2, 
                marginTop: -size / 2,
            }}
        />
    );
}
