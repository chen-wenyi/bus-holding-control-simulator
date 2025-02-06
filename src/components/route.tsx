import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { stations } from './stations2';
import { SCALE_FACTOR } from './constants';

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
            <sphereGeometry args={[4, 18, 18]} />
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
          station.position.y + 53,
          station.position.z * SCALE_FACTOR
        )
    ),
    true
  );
  routeCurve.tension = 0.4;

  const points = routeCurve.getPoints(1000);

  const stationPoints = stations
    .filter((station) => station.type === 'Station')
    .map(
      (station) =>
        new THREE.Vector3(
          station.position.x * SCALE_FACTOR,
          station.position.y + 53,
          station.position.z * SCALE_FACTOR
        )
    );

  const inflectionPoints = stations
    .filter((station) => station.type === 'Inflection')
    .map(
      (station) =>
        new THREE.Vector3(
          station.position.x * SCALE_FACTOR,
          station.position.y + 53,
          station.position.z * SCALE_FACTOR
        )
    );

  return (
    <>
      {visible && (
        <>
          <Line points={points} color='white' lineWidth={7} dashed={false} />
          
          <DebugPoints points={stationPoints} color='grey' visible={visible} />
          
          <DebugPoints points={inflectionPoints} color='white' visible={false} />
        </>
      )}
    </>
  );
}

export { SCALE_FACTOR };