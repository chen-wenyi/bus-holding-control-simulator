'use client';
import { Html } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CatmullRomCurve3 } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function Bus({
  curve,
  stations,
  passengerData,
  delay = 0,
  onFinish,
}: {
  curve: CatmullRomCurve3;
  stations: THREE.Vector3[];
  delay?: number;
  passengerData: number[];
  onFinish?: () => void;
}) {
  const busRef = useRef<THREE.Mesh>(null!);
  const [progress, setProgress] = useState(delay);
  const [isStopped, setIsStopped] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [currentPassengers, setCurrentPassengers] = useState(passengerData[0]);
  const [isFinished, setIsFinished] = useState(false);

  const duration = 60;
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
    if (isStopped || isFinished) return;

    const safeDelta = Math.min(delta, 0.1);
    const newProgress = progress + safeDelta / duration;

    if (newProgress >= 1) {
      setIsFinished(true);
      setIsStopped(true);
      if (onFinish) onFinish();
      return;
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
      setCurrentPassengers(passengerData[currentStopIndex]);
      console.log(
        `Bus stopped at Station ${currentStopIndex} - Passengers: ${passengerData[currentStopIndex]}`
      );

      setTimeout(() => {
        if (!isFinished) {
          setIsStopped(false);
          setCurrentStopIndex((prevIndex) => (prevIndex + 1) % stations.length);
        }
      }, 2000); //1000ms = 1s
    }
  });

  return (
    <>
      <mesh ref={busRef}>
        <primitive
          object={gltf.scene.clone()}
          scale={7.5}
          rotation={[0, Math.PI, 0]}
          position={[3.5, 0, 4]}
        />
        <Html position={[0, 18, 0]} center>
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '8px',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '12px',
              border: '1px solid white',
              boxShadow: '0px 2px 5px rgba(0,0,0,0.3)',
              textAlign: 'center',
            }}
          >
            {currentPassengers}
          </div>
        </Html>
      </mesh>
    </>
  );
}
