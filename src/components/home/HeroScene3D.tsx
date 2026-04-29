import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* Stylized "village on a plateau" scene — low-poly, premium feel.
   Uses Float for organic motion. Mouse-reactive group rotation. */

const Mountain = ({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) => (
  <mesh position={position} castShadow receiveShadow>
    <coneGeometry args={[scale, scale * 1.6, 5]} />
    <meshStandardMaterial color={color} flatShading roughness={0.9} />
  </mesh>
);

const House = ({ position, color = "#c9a27a", roof = "#8b3a26" }: { position: [number, number, number]; color?: string; roof?: string }) => (
  <group position={position}>
    {/* base */}
    <mesh position={[0, 0.4, 0]} castShadow>
      <boxGeometry args={[0.9, 0.8, 0.9]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
    {/* roof */}
    <mesh position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
      <coneGeometry args={[0.75, 0.55, 4]} />
      <meshStandardMaterial color={roof} roughness={0.6} />
    </mesh>
    {/* door */}
    <mesh position={[0, 0.25, 0.46]}>
      <planeGeometry args={[0.22, 0.4]} />
      <meshStandardMaterial color="#3d2817" />
    </mesh>
    {/* windows */}
    <mesh position={[0.46, 0.5, 0.2]} rotation={[0, Math.PI / 2, 0]}>
      <planeGeometry args={[0.18, 0.18]} />
      <meshStandardMaterial color="#f7d572" emissive="#f7d572" emissiveIntensity={0.5} />
    </mesh>
  </group>
);

const Tree = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.3, 0]} castShadow>
      <cylinderGeometry args={[0.08, 0.1, 0.6]} />
      <meshStandardMaterial color="#5a3a22" />
    </mesh>
    <mesh position={[0, 0.85, 0]} castShadow>
      <coneGeometry args={[0.4, 1, 8]} />
      <meshStandardMaterial color="#4a6a3a" flatShading />
    </mesh>
  </group>
);

const Cloud = ({ position }: { position: [number, number, number] }) => (
  <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.1}>
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={1} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.4, 0.05, 0]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={1} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.4, 0.05, 0]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={1} transparent opacity={0.9} />
      </mesh>
    </group>
  </Float>
);

const VillageScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;
    mouse.current.x = state.pointer.x;
    mouse.current.y = state.pointer.y;
    // Smoothly rotate group based on mouse + slow auto-rotation
    const targetY = mouse.current.x * 0.4 + state.clock.elapsedTime * 0.08;
    const targetX = -mouse.current.y * 0.15;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Plateau / ground */}
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.6, 0.5, 8]} />
        <meshStandardMaterial color="#7a8c4a" roughness={0.9} flatShading />
      </mesh>

      {/* Mountains in back */}
      <Mountain position={[-2, 0.2, -2]} scale={1.5} color="#9b7a55" />
      <Mountain position={[0.5, 0.4, -2.5]} scale={1.9} color="#8a6a45" />
      <Mountain position={[2.2, 0.1, -1.8]} scale={1.3} color="#a88862" />

      {/* Houses cluster (centered on plateau) */}
      <Float speed={1.4} floatIntensity={0.15} rotationIntensity={0.05}>
        <House position={[0, 0, 0.3]} color="#d4a87a" roof="#8b3a26" />
      </Float>
      <Float speed={1.6} floatIntensity={0.2} rotationIntensity={0.05}>
        <House position={[-1, 0, -0.2]} color="#c9985f" roof="#7a3018" />
      </Float>
      <Float speed={1.3} floatIntensity={0.18} rotationIntensity={0.05}>
        <House position={[1.1, 0, 0]} color="#caa278" roof="#9b4022" />
      </Float>

      {/* Trees */}
      <Tree position={[-1.8, 0, 0.8]} scale={0.8} />
      <Tree position={[1.9, 0, 0.6]} scale={0.7} />
      <Tree position={[0.3, 0, 1.4]} scale={0.6} />
      <Tree position={[-0.6, 0, -1.1]} scale={0.5} />

      {/* Clouds floating */}
      <Cloud position={[-2.5, 2.2, 0]} />
      <Cloud position={[2.3, 2.5, -0.5]} />
      <Cloud position={[0.5, 3, 1]} />
    </group>
  );
};

export const HeroScene3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, 1.5, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 8, 4]}
            intensity={1.4}
            color="#fff5e0"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-5, 3, -2]} intensity={0.4} color="#a5c4ff" />

          <VillageScene />

          <ContactShadows position={[0, -0.85, 0]} opacity={0.35} scale={10} blur={2.5} far={4} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
};
