import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { stations } from './stations';

const SCALE_FACTOR = 10;

function DebugPoints({
  points,
  color,
  visible,
}: {
  points: THREE.Vector3[];
  color: string;
  visible?: boolean;
}) {
  return (
    <>
      {visible &&
        points.map((point, index) => (
          <mesh key={index} position={point}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color={color} />
          </mesh>
        ))}
    </>
  );
}

export default function RouteLine({ visible = true }: { visible?: boolean }) {
  const routeCurve = new THREE.CatmullRomCurve3(
    stations.map(
      (station) =>
        new THREE.Vector3(
          station.position.x * SCALE_FACTOR,
          station.position.y + 33,
          station.position.z * SCALE_FACTOR
        )
    ),
    true
  );
  routeCurve.tension = 0.4;

  const points = routeCurve.getPoints(1000);

  return (
    <>
      {visible && (
        <>
          <Line points={points} color='blue' lineWidth={5} dashed={false} />
          <DebugPoints
            points={stations.map(
              (station) =>
                new THREE.Vector3(
                  station.position.x * SCALE_FACTOR,
                  station.position.y + 33,
                  station.position.z * SCALE_FACTOR
                )
            )}
            color='red'
            visible={visible}
          />
          <DebugPoints points={points} color='black' visible={visible} />
        </>
      )}
    </>
  );
}

export { SCALE_FACTOR };
