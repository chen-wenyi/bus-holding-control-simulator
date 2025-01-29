'use client';
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SCALE_FACTOR } from './constants';
import { stations } from './stations2';

function SingleBusStop({
  position,
  offset,
  isMainStation,
}: {
  position: THREE.Vector3;
  offset?: THREE.Vector3;
  isMainStation: boolean;
}) {
  const modelPath = isMainStation
    ? '/assets/buszero.glb'
    : '/assets/busstop.glb';
  const gltf = useLoader(GLTFLoader, modelPath);
  const clonedScene = gltf.scene.clone();

  const adjustedPosition = position.clone();
  if (offset) {
    adjustedPosition.add(offset);
  }

  return (
    <group position={adjustedPosition.toArray()}>
      <primitive object={clonedScene} scale={SCALE_FACTOR * 0.075} />
    </group>
  );
}

const BusStops = () => {
  const stationData = useMemo(
    () =>
      stations
        .filter((station) => station.type === 'Station')
        .map((station) => ({
          position: new THREE.Vector3(
            station.position.x * SCALE_FACTOR,
            station.position.y + 70,
            station.position.z * SCALE_FACTOR
          ),
          offset: station.offset,
          isMainStation: station.id === 'Station1',
        })),
    []
  );

  return (
    <>
      {stationData.map((station, index) => (
        <SingleBusStop
          key={`bus-stop-${index}`}
          position={station.position}
          offset={station.offset}
          isMainStation={station.isMainStation}
        />
      ))}
    </>
  );
};

export default BusStops;
