import { useGLTF } from '@react-three/drei';

export default function Map({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: [number, number, number];
}) {
  const { scene } = useGLTF('/assets/CITY.glb');
  if (!scene) {
    console.error('Failed to load the map model.');
    return null;
  }

  return <primitive object={scene} position={position} scale={scale} />;
}
