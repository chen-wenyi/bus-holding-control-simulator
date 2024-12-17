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

function MapModel({ position, scale }: { position: [number, number, number]; scale: [number, number, number] }) {
  const { scene } = useGLTF('/assets/CITY_1216.glb');
  return <primitive object={scene} position={position} scale={scale} />;
}

function AdjustCamera({ mapPosition }: { mapPosition: [number, number, number] }) {
  const { camera, size } = useThree();

  useEffect(() => {
    const viewportHeight = size.height;
    const leaveBlank = viewportHeight * 0.1;
    camera.position.set(mapPosition[0], mapPosition[1] + 200, mapPosition[2] + 200);
    camera.lookAt(mapPosition[0], mapPosition[1] - leaveBlank / 2, mapPosition[2]);
  }, [camera, mapPosition, size.height]);

  return null;
}

export default function Simulator() {
  const scaledCurve = new CatmullRomCurve3(
    stations.map((station) => new Vector3(
      station.position.x * SCALE_FACTOR,
      station.position.y + 33,
      station.position.z * SCALE_FACTOR
    )),
    false
  );

  const stationPositions = stations
  .filter((station) => station.type === 'Station')
  .map((station) =>
    new Vector3(
      station.position.x * SCALE_FACTOR,
      station.position.y + 33,
      station.position.z * SCALE_FACTOR
    )
  );


  return (
    <>
      <Legend />
      <Canvas
        camera={{ fov: 75, near: 1, far: 2000 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <OrbitControls maxPolarAngle={Math.PI / 3} minDistance={50} maxDistance={500} target={[30, 0, 150]} />
        <AdjustCamera mapPosition={[60, 120, 120]} />
        <Scene />
        <Suspense fallback={null}>
          <MapModel position={[0, 0, 0]} scale={[4, 4, 4]} />
          <Bus curve={scaledCurve} stations={stationPositions} />
          <BusStops />
        </Suspense>
        <RouteLine visible={false} />
      </Canvas>
    </>
  );
}
