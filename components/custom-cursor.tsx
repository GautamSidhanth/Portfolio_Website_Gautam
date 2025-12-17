"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; angle: number }[]
  >([]);
  const particleIdCounter = useRef(0);

  // Motion values for raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for the rocket
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // State to track rotation (calculated from velocity)
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Particle Loop and Rotation Logic
  useEffect(() => {
    let lastX = smoothX.get();
    let lastY = smoothY.get();
    
    // Threshold to consider moving (avoids jitter)
    const MOVE_THRESHOLD = 0.5;

    const interval = setInterval(() => {
      const currentX = smoothX.get();
      const currentY = smoothY.get();

      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only update rotation if moving significantly
      if (dist > MOVE_THRESHOLD) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        // Rocket icon points UP by default, so we add 90 degrees
        setRotation(angle + 90);
      }

      // Spawn particles if moving
      if (dist > 2) {
         // Calculate tail position: Opposite to movement direction
         // Rocket center is at (currentX, currentY)
         // Rocket is visually ~32px, tail is at bottom
         
         // Current rotation in radians (subtract 90 because we added it for visual rotation)
         const moveAngle = Math.atan2(dy, dx);
         
         // Offset from center to tail (approx 16px behind)
         const offset = 16; 
         const tailX = currentX - Math.cos(moveAngle) * offset;
         const tailY = currentY - Math.sin(moveAngle) * offset;

         // Add some randomness
         const scatter = 4;
         const finalX = tailX + (Math.random() - 0.5) * scatter;
         const finalY = tailY + (Math.random() - 0.5) * scatter;

         setParticles((prev) => [
          ...prev.slice(-20), // Keep last 20 particles
          {
            id: particleIdCounter.current++,
            x: finalX,
            y: finalY,
            angle: moveAngle + Math.PI, // Opposite to movement
          },
        ]);
      }

      lastX = currentX;
      lastY = currentY;
    }, 16); // ~60fps check

    return () => clearInterval(interval);
  }, [smoothX, smoothY]);

  // Cleanup old particles independently to ensure they fade out
  useEffect(() => {
    const cleanup = setInterval(() => {
      if (particles.length > 0) {
        setParticles((prev) => prev.slice(1));
      }
    }, 50); // Remove faster for cleaner trail
    return () => clearInterval(cleanup);
  }, [particles.length]);

  if (isMobile) return null;

  return (
    <>
      {/* Gas Particles Layer */}
      <div className="fixed inset-0 pointer-events-none z-9998">
        <AnimatePresence mode="popLayout">
          {particles.map((particle) => (
            <GasParticle key={particle.id} x={particle.x} y={particle.y} />
          ))}
        </AnimatePresence>
      </div>

      {/* Rocket Cursor Layer */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: useTransform(smoothX, (x) => x - 16), // Center offset
          y: useTransform(smoothY, (y) => y - 16), // Center offset
        }}
        animate={{
          rotate: rotation,
        }}
        transition={{
            // Rotation transition
             type: "spring",
             damping: 20,
             stiffness: 200,
        }}
      >
        <RocketIcon />
      </motion.div>
    </>
  );
}

function GasParticle({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.6, scale: 0.2, x: x, y: y }}
      animate={{ 
          opacity: 0, 
          scale: 1.5,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute w-3 h-3 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[1px]"
      style={{ left: -6, top: -6 }} // Center offset
    />
  );
}

function RocketIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-xl"
    >
      <path
        d="M12.0001 2.00003C12.0001 2.00003 12.0001 8.87871 12.0001 10.6869C12.0001 12.495 12.0001 22 12.0001 22"
        strokeWidth="0"
      />
      <path
        d="M11.9999 21.9998C10.7499 20.4998 7.31991 16.7198 7.31991 10.5198C7.31991 10.1298 7.35991 9.73984 7.42991 9.35984C8.01991 5.92984 11.9999 2 11.9999 2C11.9999 2 15.98 5.92994 16.57 9.35994C16.64 9.73994 16.68 10.13 16.68 10.52C16.68 16.72 13.25 20.5 12 22"
        fill="white"
        stroke="#4B5563"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
        fill="#3B82F6"
        stroke="#4B5563"
        strokeWidth="1.5"
      />
      <path
        d="M7.32002 10.52L4.63002 14.56C4.15002 15.28 4.29002 16.24 4.95002 16.78L7.69002 19"
        fill="#EF4444"
        stroke="#4B5563"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.68 10.52L19.37 14.56C19.85 15.28 19.71 16.24 19.05 16.78L16.31 19"
        fill="#EF4444"
        stroke="#4B5563"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
