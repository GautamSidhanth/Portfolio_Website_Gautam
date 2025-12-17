"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/context/theme-context";

export default function Background3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars mouse={mouse} />
      </Canvas>
    </div>
  );
}

function Stars({ mouse }: { mouse: { x: number; y: number } }) {
  const { theme } = useTheme();
  const ref = useRef<THREE.Points>(null!);
  
  // Generate random positions for stars
  const positions = useMemo(() => {
    const count = 4000; 
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 15 + Math.random() * 35; 
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Basic rotation
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;

      // Mouse parallax
      const x = (mouse.x * 0.2 - ref.current.rotation.y) * 0.1;
      const y = (mouse.y * 0.2 - ref.current.rotation.x) * 0.1;
      ref.current.rotation.x += y;
      ref.current.rotation.y += x;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color={theme === 'light' ? "#3b82f6" : "#ffffff"}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}
