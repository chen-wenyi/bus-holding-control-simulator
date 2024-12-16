'use client';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { CatmullRomCurve3, DoubleSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export function Bus({ curve }: { curve: CatmullRomCurve3 }) {
  const busRef = useRef<THREE.Mesh>(null!);
  const [progress, setProgress] = useState(0);
  const isHoldingRef = useRef(false);
  const isHeldRef = useRef(false);

  let holdTimer = 0;
  const duration = 10;
  const holdDuration = 5;

  useFrame((_, delta) => {
    if (progress >= 0.5 && !isHoldingRef.current && !isHeldRef.current) {
      isHoldingRef.current = false;
      holdTimer = holdDuration;
    }

    if (holdTimer > 0) {
      holdTimer -= delta;
      if (holdTimer <= 0) {
        isHoldingRef.current = false;
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

  // Load the GLB file with DRACO support
  const gltf = useLoader(GLTFLoader, '/assets/bus.glb', (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-gltf/'); // Draco decoder path
    if (loader instanceof GLTFLoader) {
      loader.setDRACOLoader(dracoLoader);
    }
  });

  return (
    <mesh ref={busRef}>
      <group position={[3.5, 0, 8]}>
        <primitive object={gltf.scene} scale={7.5} rotation={[0, Math.PI, 0]} />
        <meshBasicMaterial side={DoubleSide} />
      </group>
    </mesh>
  );
}