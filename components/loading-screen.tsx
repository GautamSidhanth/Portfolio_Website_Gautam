"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLaunching, setIsLaunching] = useState(false);

  const [stars, setStars] = useState<{ id: number; x: number; y: number; scale: number; width: number; height: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate stars only on client side to avoid hydration mismatch
    const generatedStars = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 0.5 + 0.5,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      duration: 2
    }));
    setStars(generatedStars);

    // Phase 1: Engine warmup (1.5s)
    // Phase 2: Launch (triggered at 1.5s)
    // Phase 3: Cleanup (2.2s)
    
    const launchTimer = setTimeout(() => {
      setIsLaunching(true);
    }, 1800);

    const cleanupTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(launchTimer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-950 text-white"
        >
          <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
            {/* Stars Background for Loader */}
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute bg-white rounded-full"
                initial={{ 
                    x: star.x, 
                    y: star.y,
                    opacity: 0.2,
                    scale: star.scale
                }}
                animate={{
                    y: [null, 1000], // Stars move down to simulate speed
                }}
                transition={{
                    duration: star.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: star.delay
                }}
                style={{
                    width: star.width,
                    height: star.height
                }}
              />
            ))}

            <div className="relative z-10 flex flex-col items-center">
                <Rocket isLaunching={isLaunching} />
                
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 text-2xl font-bold font-mono tracking-widest uppercase text-blue-200"
                >
                    {isLaunching ? "Liftoff!" : "Preparing Launch..."}
                </motion.h2>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Rocket({ isLaunching }: { isLaunching: boolean }) {
    return (
        <motion.div
            className="relative w-32 h-32 md:w-48 md:h-48"
            initial={{ y: 200, opacity: 0 }}
            animate={
                isLaunching 
                ? { y: -1500, transition: { duration: 0.8, ease: "circIn" } } // Blast off
                : { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } // Entry
            }
        >
           {/* Shaking Container for idle/engine rumble */}
            <motion.div
                animate={
                    isLaunching 
                    ? { x: 0, y: 0 } 
                    : { 
                        x: [-1, 1, -1], 
                        y: [0, -2, 0],
                        transition: { repeat: Infinity, duration: 0.1 } 
                      }
                }
                className="w-full h-full relative"
            >
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                    {/* Flames */}
                    <motion.path 
                        d="M85 140 L100 190 L115 140 Z" 
                        fill="#F97316"
                        animate={{ 
                            d: ["M85 140 L100 180 L115 140 Z", "M85 140 L100 210 L115 140 Z", "M85 140 L100 180 L115 140 Z"],
                            fill: ["#F97316", "#EAB308", "#F97316"]
                        }}
                        transition={{ repeat: Infinity, duration: 0.2 }}
                    />
                     <motion.path 
                        d="M90 140 L100 170 L110 140 Z" 
                        fill="#EF4444"
                        animate={{ 
                            d: ["M90 140 L100 160 L110 140 Z", "M90 140 L100 180 L110 140 Z", "M90 140 L100 160 L110 140 Z"]
                        }}
                        transition={{ repeat: Infinity, duration: 0.15 }}
                    />

                    {/* Fins */}
                    <path d="M60 110 L80 140 L60 150 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
                    <path d="M140 110 L120 140 L140 150 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
                    <path d="M100 110 L100 150" stroke="#7F1D1D" strokeWidth="2" /> {/* Center Fin illusion */}

                    {/* Body */}
                    <path d="M100 20 Q150 70 140 140 L60 140 Q50 70 100 20 Z" fill="#F8FAFC" stroke="#334155" strokeWidth="3" />
                    
                    {/* Window */}
                    <circle cx="100" cy="80" r="20" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="3" />
                    <circle cx="103" cy="77" r="5" fill="white" opacity="0.5" />
                </svg>
            </motion.div>
        
            {/* Smoke Particles */}
            {!isLaunching && (
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex justify-center w-20">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="bg-gray-300 rounded-full absolute"
                            initial={{ scale: 0, opacity: 0, y: 0 }}
                            animate={{ 
                                scale: [0, 1.5, 2], 
                                opacity: [0.8, 0.5, 0],
                                y: 40,
                                x: (i - 2) * 10 
                            }}
                            transition={{ 
                                duration: 1, 
                                repeat: Infinity, 
                                delay: i * 0.2,
                                ease: "easeOut" 
                            }}
                            style={{ width: 15, height: 15 }}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
}
