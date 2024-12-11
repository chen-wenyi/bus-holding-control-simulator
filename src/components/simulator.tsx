'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import { CatmullRomCurve3, Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';
import { Bus } from './bus';
import { Legend } from './legend';
import RouteLine from './route';
import Scene from './scene';

const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader');

function createRandomLoopRoute(radius = 50, numPoints = 10) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const randomRadius = radius * (0.7 + Math.random() * 0.3);
    points.push(
      new Vector3(
        Math.cos(angle) * randomRadius,
        71,
        Math.sin(angle) * randomRadius
      )
    );
  }
  points.push(points[0]);
  return new CatmullRomCurve3(points, true);
}

const curve = createRandomLoopRoute(50, 10);

function AdjustCamera({ mapScene }: { mapScene: THREE.Group | null }) {
  const { camera } = useThree();

  useEffect(() => {
    if (mapScene) {
      // Calculate bounding box and center
      const box = new THREE.Box3().setFromObject(mapScene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // Adjust camera position
      const cameraDistance = Math.max(size.x, size.y, size.z) * 1.2;
      camera.position.set(center.x, center.y + cameraDistance, center.z);
      camera.lookAt(center);
    }
  }, [mapScene, camera]);

  return null;
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
      <directionalLight position={[-10, 20, -10]} intensity={0.8} />
      <directionalLight position={[-0, 20, 10]} intensity={0.7} />
      <hemisphereLight color={'#ffffff'} groundColor={'#444444'} intensity={0.8} />
    </>
  );
}

export default function Simulator() {
  const [map, setMap] = useState<THREE.Group | null>(null);

  // load the map model
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/assets/CITY.glb',
      (gltf) => {
        const mapScene = gltf.scene;
        mapScene.scale.set(4, 4, 4);
        mapScene.position.set(-30, 40, 0);
        setMap(mapScene);
      },
      undefined,
      (error) => {
        console.error('Error loading map:', error);
      }
    );
  }, []);

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
        {/* adjust camera */}
        {map && <AdjustCamera mapScene={map} />}

        {/* scene lights */}
        <Lighting />

        {/* camera controller */}
        <OrbitControls
          target={[0, 0, 0]}
          maxPolarAngle={Math.PI / 3}
          minDistance={50}
          maxDistance={500} 
        />

        <Scene />
        <Suspense fallback={null}>
          {/* render map */}
          {map && <primitive object={map} />}
          {/* render bus */}
          <Bus curve={curve} scale={0.00009} />
           {/* bus routeline */}
          {/* <RouteLine curve={curve} /> */}
        </Suspense>
      </Canvas>
    </>
  );
}