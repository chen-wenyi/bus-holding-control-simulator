'use client';
import { PorcessedPolicyOutputData } from '@/types';
import { Html } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import { useSimStore } from '@/store/useSimStore';
import { LiaUserClockSolid } from 'react-icons/lia';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { roadSectionCurves } from './stations';

const curves = roadSectionCurves;
const maxPassenger = 100;

const getCurrentOccupancy = (
  occupancy: PorcessedPolicyOutputData['occupancy']
) => {
  const rate = occupancy[1];
  return Math.floor(rate * maxPassenger);
};

export function Bus({
  id,
  operationData,
}: {
  id: number;
  operationData: PorcessedPolicyOutputData[];
}) {
  const multiplier = useSimStore((store) => store.timer.multiplier);
  const removeOnRoadBus = useSimStore((store) => store.removeOnRoadBus);
  const busRef = useRef<THREE.Mesh>(null!);
  const progress = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFinished = useRef(false);
  const [isDwelling, setIsDwelling] = useState(false);
  const hasDewelled = useRef(false);
  const [occupancy, setOccupancy] = useState(
    getCurrentOccupancy(operationData[0].occupancy)
  );

  const gltf = useLoader(GLTFLoader, '/assets/bus.glb', (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-gltf/');
    (loader as GLTFLoader).setDRACOLoader(dracoLoader);
  });

  useFrame((_, delta) => {
    if (isFinished.current || isDwelling) return;

    const curve = curves[currentIndex];
    const { duration, dwell, occupancy } = operationData[currentIndex];

    if (!hasDewelled.current) {
      setIsDwelling(true);
      setTimeout(() => {
        setIsDwelling(false);
        setOccupancy(getCurrentOccupancy(occupancy));
      }, (dwell * 1000) / multiplier);
      hasDewelled.current = true;
      const position = curve.getPointAt(0);
      const tangent = curve.getTangentAt(0);

      busRef.current.position.copy(position);
      busRef.current.lookAt(position.clone().add(tangent));
      return;
    }

    // const safeDelta = Math.min(delta, 0.1);
    const newProgress = progress.current + delta / (duration / multiplier);
    progress.current = newProgress;

    if (newProgress >= 1) {
      if (currentIndex < operationData.length - 1) {
        setCurrentIndex((v) => v + 1);
        progress.current = 0;
        hasDewelled.current = false;
      } else {
        isFinished.current = true;
        removeOnRoadBus(id);
      }
      return;
    }

    const position = curve.getPointAt(newProgress);
    const tangent = curve.getTangentAt(newProgress);

    busRef.current.position.copy(position);
    busRef.current.lookAt(position.clone().add(tangent));
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
          {isDwelling ? (
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 1)',
                color: 'white',
                padding: '0',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
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
              <LiaUserClockSolid style={{ fontSize: '15px' }} />
            </div>
          ) : (
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
              {occupancy}
            </div>
          )}
        </Html>
      </mesh>
    </>
  );
}
