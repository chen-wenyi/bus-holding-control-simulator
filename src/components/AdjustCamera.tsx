import { useSimStore } from '@/store/useSimStore';
import { useThree } from '@react-three/fiber';
import { memo, useEffect } from 'react';
import { OrbitControls } from 'three-stdlib';

const DEFAULT_CAMERA_POSITION: [number, number, number] = [0, 0, 0];

const AdjustCamera = memo(
  ({
    mapPosition = DEFAULT_CAMERA_POSITION,
    controlsRef,
  }: {
    mapPosition?: [number, number, number];
    controlsRef: React.RefObject<OrbitControls | null>;
  }) => {
    const view = useSimStore((state) => state.view);

    const { camera } = useThree();

    useEffect(() => {
      const centerX = mapPosition[0];
      const centerY = mapPosition[1];
      const centerZ = mapPosition[2];
      if (view.pos === 'topView') {
        camera.position.set(centerX, centerY + 450, centerZ);
        camera.lookAt(centerX, centerY, centerZ);
      } else if (view.pos === 'rotatedSouth') {
        camera.position.set(centerX, centerY + 380, centerZ + 300);
        camera.lookAt(centerX, centerY, centerZ);
      } else if (view.pos === 'rotatedNorth') {
        camera.position.set(centerX, centerY + 380, centerZ - 300);
        camera.lookAt(centerX, centerY, centerZ);
      }

      if (controlsRef.current) {
        controlsRef.current.target.set(
          mapPosition[0],
          mapPosition[1],
          mapPosition[2]
        );
        controlsRef.current.update();
      }

      camera.updateProjectionMatrix();
    }, [camera, controlsRef, mapPosition, view]);

    return null;
  }
);

AdjustCamera.displayName = 'AdjustCamera';
export default AdjustCamera;
