// 3D Səhnə — arxa plan dağ paralaksı, az miqdarda bulud və uzaqda kiçik kənd evləri.
// Qeyd: arxa fon mausla DƏYİŞMİR (paralaks ləğv edilib).

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";
import * as THREE from "three";
import xinaliqDag from "@/frontend/medialar/banner/xinaliq-mountains.jpg";

// Arxa plan — dağ şəkli plane.
const DagPaneli = () => {
  const tex = useLoader(THREE.TextureLoader, xinaliqDag);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh position={[0, 0, -8]}>
      <planeGeometry args={[40, 22]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
};

// Yumşaq sinusoidal "nəfəs" — yalnız z oxunda, mausa reaksiya YOXDUR.
const KameraNefes = () => {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const z = 6 - Math.sin(t * 0.18) * 0.8;
    state.camera.position.z += (z - state.camera.position.z) * 0.04;
    state.camera.position.x += (0 - state.camera.position.x) * 0.05;
    state.camera.position.y += (0 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// Daha az və daha şəffaf buludlar — sis effekti azaldılıb.
const SurunenBuludlar = () => {
  const qrup = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!qrup.current) return;
    qrup.current.position.x += delta * 0.18;
    if (qrup.current.position.x > 12) qrup.current.position.x = -12;
  });
  return (
    <group ref={qrup}>
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud
          seed={1}
          segments={18}
          bounds={[8, 1.6, 2]}
          volume={3}
          color="#ffffff"
          opacity={0.28}
          position={[-3, 2.6, -3]}
        />
        <Cloud
          seed={2}
          segments={14}
          bounds={[6, 1.2, 2]}
          volume={2}
          color="#f5f7fa"
          opacity={0.22}
          position={[4, 3.1, -2]}
        />
      </Clouds>
    </group>
  );
};



export const Sehne3D = ({}: { mouse?: any }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[3, 4, 5]} intensity={0.6} />
      <Suspense fallback={null}>
        <DagPaneli />
        <SurunenBuludlar />
        {/* KendQrupu ləğv edildi */}
      </Suspense>
      <KameraNefes />
    </Canvas>
  );
};