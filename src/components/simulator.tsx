'use client';

import { useSimStore } from '@/store/useSimStore';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import { AdjustCamera } from './AdjustCamera';
import { Bus } from './bus';
import BusStops from './busstop';
import Characters from './character';
import Map from './map';
import RouteLine from './route';
import Scene from './scene';
import ViewControls from './viewControls';

export default function Simulator() {
  const busesOnRoad = useSimStore((state) => state.busOperation.busesOnRoad);
  const isDebug = useSimStore((state) => state.debuge);
  const controlsRef = useRef<ThreeOrbitControls | null>(null);

  return (
    <>
      <ViewControls />
      {/* <Legend /> */}
      <Canvas
        camera={{
          position: [0, 250, 120],
          fov: 65,
          near: 1,
          far: 2000,
          type: 'PerspectiveCamera',
        }}
        style={{ width: '80%', height: '100vh', top: 0 }}
      >
        <OrbitControls
          ref={controlsRef}
          maxPolarAngle={Math.PI / 3}
          minDistance={30}
          maxDistance={700}
          enableDamping={true}
          // onChange={() => setView('freeView')}
        />

        <AdjustCamera controlsRef={controlsRef} />

        <Suspense fallback={null}>
          <Scene />
          <BusStops />
          <RouteLine visible={isDebug} />
          {!isDebug && <Map position={[0, 20, -90]} scale={[4, 4, 4]} />}
          {busesOnRoad.map((bus) => (
            <Bus key={bus.id} id={bus.id} operationData={bus.value} />
          ))}
          {!isDebug && <Characters />}
        </Suspense>
      </Canvas>
    </>
  );
}
