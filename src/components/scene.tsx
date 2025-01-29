'use client';

export default function Scene() {
  return (
    <>
      {/* Lighting and helper tools */}
      <ambientLight intensity={1.9} />
      <directionalLight position={[10, 20, 10]} intensity={1.4} castShadow />
      <directionalLight position={[-10, 20, -10]} intensity={1} />
      <directionalLight position={[-0, 20, 10]} intensity={1.4} />
      <hemisphereLight color={'#ffffff'} groundColor={'#444444'} intensity={1.1} />
    </>
  );
}