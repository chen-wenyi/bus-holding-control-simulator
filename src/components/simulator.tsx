'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Vector3, CatmullRomCurve3 } from 'three';
import { Bus } from './bus';
import { Legend } from './legend';
import RouteLine, { SCALE_FACTOR } from './route';
import Scene from './scene';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { stations } from './stations';
import BusStops from './busstop';


// MapModel component for rendering the map
function MapModel({ position, scale }: { position: [number, number, number]; scale: [number, number, number] }) {
  const { scene } = useGLTF('/assets/CITY_1216.glb');
  return <primitive object={scene} position={position} scale={scale} />;
}

// AdjustCamera component for top-down view and margin
function AdjustCamera({ mapPosition }: { mapPosition: [number, number, number] }) {
  const { camera, size } = useThree();

  useEffect(() => {
    const viewportHeight = size.height; // Get the canvas height
    const leaveBlank = viewportHeight * 0.10; // Leave 10% bottom margin

    // Adjust the camera position
    camera.position.set(mapPosition[0], mapPosition[1] + 200, mapPosition[2] + 200); // Set camera above the map
    camera.lookAt(mapPosition[0], mapPosition[1] - leaveBlank / 2, mapPosition[2]); // Focus map center with bottom margin
  }, [camera, mapPosition, size.height]);

  return null;
}

export default function Simulator() {
  const scaledCurve = new CatmullRomCurve3(
    stations.map((station) =>
      new Vector3(
        station.position.x * SCALE_FACTOR,
        station.position.y + 33,
        station.position.z * SCALE_FACTOR
      )
    ),
    true
  );

  return (
    <>
      <Legend />
      <Canvas
        camera={{
          fov: 75,
          near: 1,
          far: 2000,
        }}
        style={{ width: '100vw', height: '100vh' }}
      >

        {/* Add orbit controls */}
        <OrbitControls
          maxPolarAngle={Math.PI / 3} // Lock camera to top-down view
          minDistance={50}
          maxDistance={500} 
          target={[30, 0, 150]} // Adjust target for centering
        />

        {/* Camera adjustment */}
        <AdjustCamera mapPosition={[60, 120, 120]} />

        {/* Main scene content */}
        <Scene />

        {/* Map model */}
        <Suspense fallback={null}>
          <MapModel position={[0, 0, 0]} scale={[4, 4, 4]} />
          <Bus curve={scaledCurve} />
          <BusStops />
        </Suspense>

        {/* Route line */}
        <RouteLine visible={false} />
      </Canvas>
    </>
  );
}