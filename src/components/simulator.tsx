
'use client';

import { useSimStore } from '@/store/useSimStore';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Bus } from './bus2';
import BusStops from './busstop';
import Characters from './character';
import RouteLine from './route';
import Scene from './scene';
import ViewControls from './viewControls';
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';


function MapModel({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: [number, number, number];
}) {
  const { scene } = useGLTF('/assets/CITY_final.glb');
  return scene ? (
    <primitive object={scene} position={position} scale={scale} />
  ) : null;
}

function AdjustCamera({
  mapPosition,
  mode,
  controlsRef,
}: {
  mapPosition: [number, number, number];
  mode: 'topView' | 'rotatedSouth' | 'rotatedNorth';
  controlsRef: React.RefObject<ThreeOrbitControls | null>;
}) {
  const { camera, size } = useThree();

  useEffect(() => {
    const centerX = mapPosition[0];
    const centerY = mapPosition[1];
    const centerZ = mapPosition[2];

    if (mode === 'topView') {
      camera.position.set(centerX, centerY + 450, centerZ);
      camera.lookAt(centerX, centerY, centerZ);
    } else if (mode === 'rotatedSouth') {
      camera.position.set(centerX, centerY + 380, centerZ + 300);
      camera.lookAt(centerX, centerY, centerZ);
    } else if (mode === 'rotatedNorth') {
      camera.position.set(centerX, centerY + 380, centerZ - 300);
      camera.lookAt(centerX, centerY, centerZ);
    }

    if (controlsRef.current) {
      controlsRef.current.target.set(mapPosition[0], mapPosition[1], mapPosition[2]);
      controlsRef.current.update();
    }

    camera.updateProjectionMatrix();

  }, [camera, controlsRef, mapPosition, mode]);

  return null;
}


// const mapPosition: [number, number, number] = [30, 160, 20];

export default function Simulator() {
  const busesOnRoad = useSimStore((state) => state.busOperation.busesOnRoad);
  const isDebug = useSimStore((state) => state.debuge);
  const [viewMode, setViewMode] = useState<'topView' | 'rotatedSouth' | 'rotatedNorth'>('rotatedSouth');
  const controlsRef = useRef<ThreeOrbitControls | null>(null);

  const toggleRotatedView = () => {
    setViewMode((prevMode) => (prevMode === 'rotatedSouth' ? 'rotatedNorth' : 'rotatedSouth'));
  };

  return (
    <>
      <ViewControls
        onSetTopView={() => setViewMode('topView')}
        onSetRotatedView={toggleRotatedView}
      />
      {/* <Legend /> */}
      <Canvas
        camera={{ position: [0, 250, 120], fov: 65, near: 1, far: 2000, type: 'PerspectiveCamera', }}
        style={{ width: '80%', height: '100vh', top: 0 }}
      >
        <OrbitControls
          ref={controlsRef}
          maxPolarAngle={Math.PI / 3}
          minDistance={30}
          maxDistance={700}
          enableDamping={true}
        />
        {/* <AdjustCamera mapPosition={[40, 120, 120]} /> */}
        <AdjustCamera mapPosition={[0, 0, 0]} mode={viewMode} controlsRef={controlsRef} />

        <Suspense fallback={null}>
          <Scene />
          <BusStops />
          <RouteLine visible={isDebug} />
          {!isDebug && <MapModel position={[0, 20, -90]} scale={[4, 4, 4]} />}
          {busesOnRoad.map((bus) => (
            <Bus key={bus.id} id={bus.id} operationData={bus.value} />
          ))}
          {!isDebug && <Characters />}
        </Suspense>
      </Canvas>
    </>
  );
}
