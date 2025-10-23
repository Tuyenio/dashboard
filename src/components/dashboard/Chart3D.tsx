import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Box, Sphere } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExportDialog } from "@/components/ui/export-dialog";
import * as THREE from "three";

interface DataPoint {
  x: number;
  y: number;
  z: number;
  value: number;
  label: string;
  color?: string;
}

interface Chart3DProps {
  data: DataPoint[];
  title: string;
  width?: number;
  height?: number;
  showLabels?: boolean;
  animationSpeed?: number;
}

function AnimatedBar({ position, scale, color, delay }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentScale, setCurrentScale] = useState([0.1, 0, 0.1]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScale(scale);
    }, delay * 100);
    return () => clearTimeout(timer);
  }, [scale, delay]);

  return (
    <Box
      ref={meshRef}
      position={position}
      scale={currentScale}
      args={[0.8, 1, 0.8]}
    >
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.2} />
    </Box>
  );
}

function Chart3DScene({ data, showLabels, animationSpeed }: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const maxValue = Math.max(...data.map((d: DataPoint) => d.value));

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Grid */}
      <gridHelper args={[20, 20, "#666666", "#333333"]} position={[0, -5, 0]} />

      {/* Data Bars */}
      {data.map((point: DataPoint, index: number) => (
        <group key={index}>
          <AnimatedBar
            position={[point.x - 5, (point.value / maxValue) * 5 - 2.5, point.z - 5]}
            scale={[0.8, (point.value / maxValue) * 10, 0.8]}
            color={point.color || `hsl(${(index * 360) / data.length}, 70%, 60%)`}
            delay={index}
          />
          
          {showLabels && (
            <Text
              position={[point.x - 5, -4, point.z - 5]}
              fontSize={0.5}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              rotation={[-Math.PI / 2, 0, 0]}
            >
              {point.label}
            </Text>
          )}

          {/* Floating value spheres */}
          <Sphere
            position={[point.x - 5, (point.value / maxValue) * 5 + 1, point.z - 5]}
            args={[0.2]}
          >
            <meshBasicMaterial color="#ffff00" />
          </Sphere>
        </group>
      ))}

      {/* Holographic effect particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Sphere
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 20,
          ]}
          args={[0.05]}
        >
          <meshBasicMaterial 
            color={`hsl(${Math.random() * 360}, 70%, 80%)`}
            transparent
            opacity={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
}

export function Chart3D({ 
  data, 
  title, 
  width = 600, 
  height = 400, 
  showLabels = true,
  animationSpeed = 1 
}: Chart3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-2 hover:border-primary/30 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded">
              4D
            </span>
            <ExportDialog chartTitle={title} chartData={data} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            style={{ width, height }}
            className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          >
            <Canvas
              camera={{ position: [15, 10, 15], fov: 60 }}
              shadows
            >
              <Chart3DScene 
                data={data} 
                showLabels={showLabels}
                animationSpeed={animationSpeed}
              />
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={!isHovered}
                autoRotateSpeed={0.5}
              />
            </Canvas>
            
            {/* Holographic overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/5 to-transparent pointer-events-none" />
            
            {/* Corner indicators */}
            <div className="absolute top-2 left-2 text-white text-xs opacity-70">
              3D View
            </div>
            <div className="absolute top-2 right-2 text-white text-xs opacity-70">
              Interactive
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
