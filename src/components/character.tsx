'use client';

import React, { useEffect, useRef, Suspense, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const gltfCache = new Map<string, THREE.Group>();

function useGLTFModel(modelPath: string) {
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    if (gltfCache.has(modelPath)) {
      setModel(gltfCache.get(modelPath)!.clone());
      return;
    }

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-gltf/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(modelPath, (gltf) => {
      gltfCache.set(modelPath, gltf.scene);
      setModel(gltf.scene.clone());
    });

  }, [modelPath]);

  return model;
}

export function AnimatedCharacter({
  modelPath,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: {
  modelPath: string;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const model = useGLTFModel(modelPath);

  useEffect(() => {
    if (!model) return;

    if (groupRef.current) {
      groupRef.current.clear();
      groupRef.current.add(model);
    }

    if (mixerRef.current) {
      mixerRef.current.stopAllAction();
    }

    if (model.animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(model);
      model.animations.forEach((clip) => {
        const action = mixerRef.current!.clipAction(clip);
        action.play();
      });
    }
  }, [model]);

  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return <group ref={groupRef} position={position} scale={scale} rotation={rotation} />;
}

const characterData: {
  modelPath: string;
  position: [number, number, number];
  scale: number;
  rotation?: [number, number, number];
}[] = [
  { modelPath: '/assets/1longhair.glb', position: [20, 51.5, -120], scale: 6, rotation: [0, Math.PI, 0] },
  { modelPath: '/assets/kids.glb', position: [30, 51.5, 95], scale: 0.05 },
  { modelPath: '/assets/2longhairgirl.glb', position: [125, 51.4, 148], scale: 6 },
  { modelPath: '/assets/walkingphoneman.glb', position: [-60, 51.5, 20], scale: 0.2 },
  { modelPath: '/assets/1_walking_man.glb', position: [-130, 51.5, 134], scale: 0.9 },
  // { modelPath: '/assets/dadkid.glb', position: [45, 51.5, 90], scale: 6 },
  // { modelPath: '/assets/man.glb', position: [-115, 52, 145], scale: 5 },
  // { modelPath: '/assets/couple.glb', position: [-20, 52.6, 98], scale: 6 },
  // { modelPath: '/assets/2people.glb', position: [-71, 51.5, 72], scale: 6 },
  // { modelPath: '/assets/woman2.glb', position: [-155, 51.5, -138], scale: 5.8, rotation: [0, Math.PI, 0] },
  // { modelPath: '/assets/woman.glb', position: [125, 52, 148], scale: 6 },
  // { modelPath: '/assets/programmer.glb', position: [-100, 51.5, -75], scale: 6 },
  // { modelPath: '/assets/older.glb', position: [70, 51.5, 10], scale: 6 },
  // { modelPath: '/assets/runner.glb', position: [70, 51.5, 45], scale: 6 },
  // { modelPath: '/assets/cafegirl.glb', position: [-195, 51.5, 135], scale: 6 },
  // { modelPath: '/assets/baseballman.glb', position: [160, 50.8, -60], scale: 3.8 },
  // { modelPath: '/assets/backpacker.glb', position: [-195, 61.3, -70], scale: 1.7 },
  // { modelPath: '/assets/punk_girl.glb', position: [-170, 51.5, -70], scale: 0.8 },
  // { modelPath: '/assets/godette.glb', position: [190, 51.5, -80], scale: 6 },
  // { modelPath: '/assets/bernese_dog.glb', position: [-60, 51.5, 70], scale: 4 },
  // { modelPath: '/assets/ladycat.glb', position: [190, 51.8, -140], scale: 6, rotation: [0, Math.PI, 0] },
];

const Characters = React.memo(() => {
  return (
    <Suspense fallback={<div>Loading characters...</div>}>
      {characterData.map((character, idx) => (
        <AnimatedCharacter
          key={idx}
          modelPath={character.modelPath}
          position={character.position}
          scale={character.scale}
          rotation={character.rotation}
        />
      ))}
    </Suspense>
  );
}, () => true);

Characters.displayName = "AnimatedCharacter";
export default React.memo(Characters);
// export default Characters;
