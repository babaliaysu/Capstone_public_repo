// 3D Səhnə — arxa plan dağ paralaksı, hərəkət edən buludlar və yumşaq kamera "dolly".
// Latın olmayan hərflər səbəbindən "Kəndim" yazısı HTML overlay ilə üstə qoyulur,
// burada yalnız Three.js 3D mühit qurulur.

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";
import * as THREE from "three";
import xinaliqDag from "@/frontend/medialar/banner/xinaliq-mountains.jpg";

// Arxa plan — dağ şəkli bir plane kimi yerləşdirilir.
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

// Kamera "dolly" — z oxunda yumşaq irəli/geri ping-pong.
// Sıçanın mövqeyinə görə yüngül paralaks da əlavə edir.
const KameraDolly = ({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) => {
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    // -1.5 və 1.5 arasında yumşaq sinusoidal hərəkət
    const z = 6 - Math.sin(t * 0.18) * 1.5;
    state.camera.position.z += (z - state.camera.position.z) * 0.04;

    // Mausa doğru yüngül baxış (paralaks)
    const hedefX = mouse.current.x * 0.6;
    const hedefY = mouse.current.y * 0.3;
    state.camera.position.x += (hedefX - state.camera.position.x) * 0.05;
    state.camera.position.y += (hedefY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// Sürünən bulud qrupu — yavaş-yavaş sağa hərəkət edir,
// ekrandan çıxdıqda solundan yenidən girir.
const SurunenBuludlar = () => {
  const qrup = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!qrup.current) return;
    qrup.current.position.x += delta * 0.25;
    if (qrup.current.position.x > 12) qrup.current.position.x = -12;
  });
  return (
    <group ref={qrup}>
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud
          seed={1}
          segments={28}
          bounds={[12, 2.5, 2]}
          volume={6}
          color="#ffffff"
          opacity={0.65}
          position={[-4, 2, -3]}
        />
        <Cloud
          seed={2}
          segments={20}
          bounds={[8, 2, 2]}
          volume={4}
          color="#f5f7fa"
          opacity={0.5}
          position={[4, 3.2, -2]}
        />
        <Cloud
          seed={3}
          segments={16}
          bounds={[6, 1.5, 2]}
          volume={3}
          color="#ffffff"
          opacity={0.45}
          position={[0, 1.4, -1]}
        />
      </Clouds>
    </group>
  );
};

type Props = {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
};

export const Sehne3D = ({ mouse }: Props) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <Suspense fallback={null}>
        <DagPaneli />
        <SurunenBuludlar />
      </Suspense>
      <KameraDolly mouse={mouse} />
    </Canvas>
  );
};
