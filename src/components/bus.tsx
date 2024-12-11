'use client';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { CatmullRomCurve3, DoubleSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function Bus({ curve }: { curve: CatmullRomCurve3 }) {
  const busRef = useRef<THREE.Mesh>(null!);
  const [progress, setProgress] = useState(0);
  const isHoldingRef = useRef(false);
  const isHeldRef = useRef(false);

  let holdTimer = 0; // Timer to hold progress at 50%
  const duration = 10; // Total duration to complete the route
  const holdDuration = 5; // Duration to hold at 50% progress

  useFrame((_, delta) => {
    if (progress >= 0.5 && !isHoldingRef.current && !isHeldRef.current) {
      isHoldingRef.current = true;
      holdTimer = holdDuration; // Set the hold timer to 3 seconds
    }

    // If holding, decrement the holdTimer
    if (isHoldingRef.current) {
      holdTimer -= delta;
      if (holdTimer <= 0) {
        isHoldingRef.current = false; // Stop holding after 3 seconds
        isHeldRef.current = true;
      }
    }

    if (!isHoldingRef.current || isHeldRef.current) {
      const currentProgress = progress + (delta * 1) / duration;
      if (currentProgress >= 1) {
        isHeldRef.current = false;
      }
      const newProgress = currentProgress % 1;
      setProgress(newProgress);
      const position = curve.getPointAt(newProgress);
      const tangent = curve.getTangentAt(newProgress);
      busRef.current.position.copy(position);
      busRef.current.lookAt(position.clone().add(tangent));
    }
  });

  const gltf = useLoader(GLTFLoader, 'yellow-bus/scene.gltf');

  return (
    <mesh ref={busRef}>
      <group position={[3.5, 0, 8]}>
        <primitive
          object={gltf.scene}
          scale={0.0001}
          rotation={[0, Math.PI, 0]}
        />
        <meshBasicMaterial side={DoubleSide} />
      </group>
    </mesh>
  );
}
