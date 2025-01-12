'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LiaUserClockSolid } from 'react-icons/lia';
import { useSimStore } from '@/store/useSimStore';
import { ProcessedPolicyOutputData } from '@/types';
import { roadSectionCurves } from './stations2';

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
  const busRef = useRef<THREE.Mesh>(null);
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

  const [gltf, setGltf] = useState<GLTF | null>(null);

  useEffect(() => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-gltf/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load('/assets/bus.glb', setGltf);
  }, []);

  useFrame((_, delta) => {
    if (isFinished.current || isDwelling || !gltf) return;
    
    if (currentIndex >= curves.length) {
      console.warn('Current index exceeds curve array length, resetting to 0.');
      setCurrentIndex(0);
      return;
    }

    const curve = curves[currentIndex];

    if (!curve) {
      console.warn('Curve is undefined, skipping this frame.');
      return;
    }
    
    const { duration, dwell, occupancy } = operationData[currentIndex];
  
    if (!hasDewelled.current && busRef.current) {
    setIsDwelling(true);
    setTimeout(() => {
      setIsDwelling(false);
      setOccupancy(getCurrentOccupancy(occupancy, passengerCapacity));
    }, (dwell * 1000) / multiplier);
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
  
  if (!gltf) return null;
  
  return (
    <>
      <mesh ref={busRef}>
        <primitive
          object={gltf.scene.clone()}
          scale={[7.5, 7.5, 7.5]}
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
                textAlign: 'center' 
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
                textAlign: 'center' 
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