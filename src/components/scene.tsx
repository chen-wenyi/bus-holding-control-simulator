'use client';

export default function Scene() {
  return (
    <>
      {/* Lighting and helper tools */}
      <ambientLight intensity={1.6} />
      <directionalLight position={[10, 20, 10]} intensity={2} castShadow />
      <directionalLight position={[-10, 20, -10]} intensity={1.5} />
      <directionalLight position={[-0, 20, 10]} intensity={1.7} />
      <hemisphereLight color={'#ffffff'} groundColor={'#444444'} intensity={1.2} />
    </>
  );
}