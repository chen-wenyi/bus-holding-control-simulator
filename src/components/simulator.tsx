'use client';

import { useSimStore } from '@/store/useSimStore';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Bus } from './bus2';
import BusStops from './busstop';
import { AnimatedCharacter } from './character';
import { Legend } from './legend';
import RouteLine from './route';
import Scene from './scene';

function MapModel({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: [number, number, number];
}) {
  const { scene } = useGLTF('/assets/CITY_1216.glb');
  return scene ? (
    <primitive object={scene} position={position} scale={scale} />
  ) : null;
}

function AdjustCamera({
  mapPosition,
}: {
  mapPosition: [number, number, number];
}) {
  const { camera, size } = useThree();

  useEffect(() => {
    camera.position.set(
      mapPosition[0],
      mapPosition[1] + 200,
      mapPosition[2] + 200
    );
    camera.lookAt(mapPosition[0], mapPosition[1], mapPosition[2]);
  }, [camera, mapPosition, size.height]);

  return null;
}

const mapPosition: [number, number, number] = [50, 130, 70];

export default function Simulator() {
  const busesOnRoad = useSimStore((state) => state.busOperation.busesOnRoad);
  const isDebug = useSimStore((state) => state.debuge);

  return (
    <>
      <Legend />
      <Canvas
        camera={{ fov: 65, near: 1, far: 2000 }}
        style={{ width: '80vw', height: '100vh' }}
      >
        <OrbitControls
          maxPolarAngle={Math.PI / 3}
          minDistance={30}
          maxDistance={700}
          target={[30, 50, 150]}
        />
        {/* <AdjustCamera mapPosition={[40, 120, 120]} /> */}
        <AdjustCamera mapPosition={mapPosition} />
        <Suspense fallback={null}>
          <Scene />
          <BusStops />
        </Suspense>
        <Suspense fallback={null}>
          {!isDebug && <MapModel position={[0, 0, 0]} scale={[4, 4, 4]} />}
          {busesOnRoad.map((_, idx) => (
            <Bus
              id={busesOnRoad[idx].id}
              key={busesOnRoad[idx].id}
              operationData={busesOnRoad[idx].value}
            />
          ))}
          {!isDebug && (
            <Suspense fallback={null}>
              <AnimatedCharacter
                modelPath='/assets/dadkid.glb'
                position={[32, 31.5, 80]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/man.glb'
                position={[-142, 31.5, 200]}
                scale={5}
              />
              <AnimatedCharacter
                modelPath='/assets/couple.glb'
                position={[28, 31.5, 145]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/2people.glb'
                position={[-43, 31.5, 80]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/woman2.glb'
                position={[187, 31.5, 200]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/woman.glb'
                position={[-83, 31.5, -26]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/kids.glb'
                position={[-11, 31.5, 204]}
                scale={0.05}
              />
              <AnimatedCharacter
                modelPath='/assets/lady.glb'
                position={[-120, 31.5, -30]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/programmer.glb'
                position={[135, 31.5, 160]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/older.glb'
                position={[100, 31.5, 35]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/runner.glb'
                position={[100, 31.5, -15]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/cafegirl.glb'
                position={[172, 31.5, -34]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/2longhairgirl.glb'
                position={[83, 31.5, 93]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/baseballman.glb'
                position={[-193, 30.8, 155]}
                scale={3.8}
              />
              <AnimatedCharacter
                modelPath='/assets/1longhair.glb'
                position={[-75, 31.5, 204]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/backpacker.glb'
                position={[238, 41.3, 194]}
                scale={1.7}
              />
              <AnimatedCharacter
                modelPath='/assets/punk_girl.glb'
                position={[140, 31.5, 198]}
                scale={0.8}
              />
              <AnimatedCharacter
                modelPath='/assets/godette.glb'
                position={[-197, 31.5, 194]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/guitarist.glb'
                position={[15, 31.5, 200]}
                scale={6}
              />
              <AnimatedCharacter
                modelPath='/assets/walkingphoneman.glb'
                position={[-32, 31.5, 20]}
                scale={0.2}
              />
              <AnimatedCharacter
                modelPath='/assets/skater.glb'
                position={[-77, 27.8, -29]}
                scale={1}
              />
            </Suspense>
          )}
        </Suspense>
        <RouteLine visible={isDebug} />
      </Canvas>
    </>
  );
}
