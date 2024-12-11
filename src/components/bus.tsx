'use client';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { CatmullRomCurve3, DoubleSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface BusProps {
  curve: CatmullRomCurve3;
  scale?: number;
}

export function Bus({ curve, scale = 1 }: BusProps) {
  const busRef = useRef<THREE.Mesh>(null!);
  const [progress, setProgress] = useState(0);

  useFrame((_, delta) => {
    const newProgress = (progress + delta * 0.1) % 1;
    setProgress(newProgress);

    const position = curve.getPointAt(newProgress);
    const tangent = curve.getTangentAt(newProgress);
    busRef.current.position.copy(position);
    busRef.current.lookAt(position.clone().add(tangent));
  });

  const gltf = useLoader(GLTFLoader, 'yellow-bus/scene.gltf');

  return (
    <mesh ref={busRef}>
      <group position={[0, 0, 0]}>
        <primitive
          object={gltf.scene}
          scale={scale}
          rotation={[0, Math.PI, 0]}
        />
        <meshBasicMaterial side={DoubleSide} />
      </group>
    </mesh>
  );
}