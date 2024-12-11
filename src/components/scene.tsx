'use client';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export default function Scene() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(100, 90, 100);
  }, [camera]);

  return (
    <>
      <gridHelper args={[1000, 1000]} />
      <OrbitControls />
      <axesHelper args={[100]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={3} />
    </>
  );
}
