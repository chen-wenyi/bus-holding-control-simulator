'use client';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useMemo } from 'react';
import * as THREE from 'three';
import { stations } from './stations';

const SCALE_FACTOR = 10;

function SingleBusStop({ position, offset }: { position: THREE.Vector3; offset?: THREE.Vector3 }) {
  const gltf = useLoader(GLTFLoader, '/assets/bus-stop.glb');
  const clonedScene = gltf.scene.clone();

  const adjustedPosition = position.clone();
  if (offset) {
    adjustedPosition.add(offset);
  }

  return (
    <group position={adjustedPosition.toArray()}>
      <primitive object={clonedScene} scale={SCALE_FACTOR * 0.05} />
    </group>
  );
}

export default function BusStops() {
  const stationData = useMemo(
    () =>
      stations
        .filter((station) => station.type === 'Station')
        .map((station) => ({
          position: new THREE.Vector3(
            station.position.x * SCALE_FACTOR,
            station.position.y + 44,
            station.position.z * SCALE_FACTOR
          ),
          offset: station.offset, // 传递 offset
        })),
    []
  );

  console.log('Filtered Station Positions:', stationData);

  return (
    <>
      {stationData.map((station, index) => (
        <SingleBusStop
          key={`bus-stop-${index}`}
          position={station.position}
          offset={station.offset}
        />
      ))}
    </>
  );
}