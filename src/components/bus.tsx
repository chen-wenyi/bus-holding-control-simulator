'use client';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { CatmullRomCurve3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export function Bus({
  curve,
  stations,
  delay = 0,
}: {
  curve: CatmullRomCurve3;
  stations: THREE.Vector3[];
  delay?: number;
}) {
  const busRef = useRef<THREE.Mesh>(null!);
  const [progress, setProgress] = useState(delay);
  const [isStopped, setIsStopped] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  const duration = 10;
  const stopThreshold = 2.0;

  const gltf = useLoader(GLTFLoader, '/assets/bus.glb', (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-gltf/');
    (loader as GLTFLoader).setDRACOLoader(dracoLoader);
  });

  useEffect(() => {
    setProgress(0);
    setCurrentStopIndex(0);
    setIsStopped(false);
  }, [duration]);

  useFrame((_, delta) => {
    if (isStopped) return;

    const safeDelta = Math.min(delta, 0.1);
    let newProgress = progress + safeDelta / duration;

    if (newProgress >= 1) {
      newProgress = 0;
      setCurrentStopIndex(0);
    }
    setProgress(newProgress);

    const position = curve.getPointAt(newProgress);
    const tangent = curve.getTangentAt(newProgress);

    busRef.current.position.copy(position);
    busRef.current.lookAt(position.clone().add(tangent));

    const currentStop = stations[currentStopIndex];
    const distance = position.distanceTo(currentStop);
    if (distance < stopThreshold) {
      setIsStopped(true);
      console.log(`Stopped at Station: ${currentStopIndex} (Distance: ${distance})`);

      setTimeout(() => {
        setIsStopped(false);
        setCurrentStopIndex((prevIndex) => (prevIndex + 1) % stations.length);
      }, 500); //1000ms = 1s
    }
  });

  return (
    <mesh ref={busRef}>
      <primitive object={gltf.scene} scale={7.5} rotation={[0, Math.PI, 0]} position={[3.5, 0, 4]} />
    </mesh>
  );
}
