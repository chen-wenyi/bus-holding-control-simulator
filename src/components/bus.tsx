'use client';

import { createCountdown } from '@/lib/utils';
import { useSimStore } from '@/store/useSimStore';
import { ProcessedPolicyOutputData } from '@/types';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LiaUserClockSolid } from 'react-icons/lia';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { roadSectionCurves } from './stations';

const curves = roadSectionCurves;

const getCurrentOccupancy = (
  occupancy: ProcessedPolicyOutputData['occupancy'],
  passengerCapacity: number
) => {
  const rate = occupancy[1];
  return Math.floor(rate * passengerCapacity);
};

export function Bus({
  id,
  operationData,
}: {
  id: number;
  operationData: ProcessedPolicyOutputData[];
}) {
  const multiplier = useSimStore((store) => store.timer.multiplier);
  const removeOnRoadBus = useSimStore((store) => store.removeOnRoadBus);
  const status = useSimStore((store) => store.timer.status);
  const busRef = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFinished = useRef(false);
  const [isDwelling, setIsDwelling] = useState(false);
  const hasDewelled = useRef(false);
  const passengerCapacity = useSimStore(
    (store) => store.busOperation.passengerCapacity
  );
  const [occupancy, setOccupancy] = useState(
    getCurrentOccupancy(operationData[0].occupancy, passengerCapacity)
  );

  const { start, pause, reset, resume } = useMemo(() => {
    return createCountdown(9999 / multiplier);
  }, []);

  // Load the GLTF model
  const [gltf, setGltf] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/assets/green_bus.glb',
      (loadedGltf) => {
        setGltf(loadedGltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error loading bus model:', error);
      }
    );
  }, []);

  useFrame((_, delta) => {
    if (isFinished.current) return;

    if (status === 'paused') {
      pause();
      return;
    } else if (isDwelling) {
      resume();
      return;
    }

    const curve = curves[currentIndex];

    if (!curve) {
      console.warn('Curve is undefined, skipping this bus');
      removeOnRoadBus(id);
      return;
    }

    const { duration, dwell, occupancy } = operationData[currentIndex];

    if (!hasDewelled.current && busRef.current) {
      setIsDwelling(true);
      if (dwell !== 0) {
        reset((dwell * 1000) / multiplier, () => {
          setOccupancy(getCurrentOccupancy(occupancy, passengerCapacity));
          setIsDwelling(false);
        });
        start();
      } else {
        setOccupancy(getCurrentOccupancy(occupancy, passengerCapacity));
        setIsDwelling(false);
      }

      hasDewelled.current = true;

      const position = curve.getPointAt(0);
      const tangent = curve.getTangentAt(0);
      busRef.current.position.copy(position);
      busRef.current.lookAt(position.clone().add(tangent));
      return;
    }

    const newProgress = progress.current + delta / (duration / multiplier);
    progress.current = newProgress;

    if (newProgress >= 1) {
      if (currentIndex < operationData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        progress.current = 0;
        hasDewelled.current = false;
      } else {
        isFinished.current = true;
        removeOnRoadBus(id);
      }
      return;
    }

    if (busRef.current) {
      const position = curve.getPointAt(newProgress);
      const tangent = curve.getTangentAt(newProgress);
      busRef.current.position.copy(position);
      busRef.current.lookAt(position.clone().add(tangent));
    }
  });

  return (
    <>
      <group ref={busRef}>
        {gltf ? (
          <primitive
            object={gltf}
            scale={[3.5, 3.5, 3.5]}
            rotation={[0, 0, 0]}
          />
        ) : (
          <Box />
        )}
        <Html position={[0, 18, 0]} center>
          {isDwelling ? (
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '0',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                border: '2px solid white',
                boxShadow: '0px 6px 10px rgba(0,0,0,0.3)',
                textAlign: 'center',
                transition: 'all 0.1s ease-in-out',
              }}
            >
              <LiaUserClockSolid style={{ fontSize: '20px' }} />
            </div>
          ) : (
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                padding: '8px',
                borderRadius: '50%',
                width: '33px',
                height: '33px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '15px',
                border: '1px solid white',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.3)',
                textAlign: 'center',
                transition: 'all 0.1s ease-in-out',
              }}
            >
              {occupancy}
            </div>
          )}
        </Html>
      </group>
    </>
  );
}

function Box() {
  return (
    <mesh scale={10}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='yellow' />
    </mesh>
  );
}
