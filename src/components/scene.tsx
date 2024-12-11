'use client';
import { OrbitControls } from '@react-three/drei';

export default function Scene() {
  return (
    <>
      {/* controller */}
      <OrbitControls />
    
      {/* scene lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={2} castShadow />
      <directionalLight position={[-10, 20, -10]} intensity={1} />
      <directionalLight position={[-0, 20, 10]} intensity={1} />

    </>
  );
}