import * as THREE from 'three';
import { SCALE_FACTOR } from './constants';

interface bus_stations {
  id: string;
  position: THREE.Vector3;
  type: 'Station' | 'Inflection';
  offset?: THREE.Vector3;
}

export const stations: bus_stations[] = [
  {
    id: 'Station1',
    position: new THREE.Vector3(-2.09, -0.56525, 10.8),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.5),
  },
  {
    id: 'Station2',
    position: new THREE.Vector3(4, -0.56525, 10.8),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.5),
  },
  {
    id: 'Inflection1.1',
    position: new THREE.Vector3(7.8, -0.56525, 10.9),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection1.2',
    position: new THREE.Vector3(8.8, -0.56525, 11.2),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection1.3',
    position: new THREE.Vector3(9.4, -0.56525, 12),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station3',
    position: new THREE.Vector3(9.5, -0.56525, 12.5),
    type: 'Station',
    offset: new THREE.Vector3(6.5, 0, 5),
  },
  {
    id: 'Inflection2',
    position: new THREE.Vector3(9.9, -0.56525, 15.2),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station4',
    position: new THREE.Vector3(12.4, -0.56525, 15.5),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.5),
  },
  {
    id: 'Station5',
    position: new THREE.Vector3(16.6, -0.56525, 15.5),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.5),
  },
  {
    id: 'Station6',
    position: new THREE.Vector3(21, -0.56525, 15.5),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.5),
  },
  {
    id: 'Inflection3',
    position: new THREE.Vector3(24, -0.56525, 15.2),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station7',
    position: new THREE.Vector3(24.5, -0.56525, 12),
    type: 'Station',
    offset: new THREE.Vector3(-6.5, 0, -5),
  },
  {
    id: 'Inflection4.1',
    position: new THREE.Vector3(24.3, -0.56525, 8.2),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection4.2',
    position: new THREE.Vector3(23.5, -0.56525, 7.9),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station8',
    position: new THREE.Vector3(23, -0.56525, 7.8),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 7.5),
  },
  {
    id: 'Station9',
    position: new THREE.Vector3(18, -0.56525, 7.8),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 7.5),
  },
  {
    id: 'Station10',
    position: new THREE.Vector3(11.2, -0.56525, 7.8),
    type: 'Station',
    offset: new THREE.Vector3(-5, 0, 7.5),
  },
  {
    id: 'Inflection5.1',
    position: new THREE.Vector3(9.4, -0.56525, 7.6),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection5.2',
    position: new THREE.Vector3(8.6, -0.56525, 7.3),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station11',
    position: new THREE.Vector3(8.3, -0.56525, 6),
    type: 'Station',
    offset: new THREE.Vector3(-6.5, 0, -10),
  },
  {
    id: 'Station12',
    position: new THREE.Vector3(8.3, -0.56525, 2.5),
    type: 'Station',
    offset: new THREE.Vector3(-6.5, 0, -10),
  },
  {
    id: 'Station13',
    position: new THREE.Vector3(8.3, -0.56525, -1.5),
    type: 'Station',
    offset: new THREE.Vector3(-6.5, 0, -10),
  },
  {
    id: 'Inflection6.1',
    position: new THREE.Vector3(8.4, -0.56525, -3),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection6.2',
    position: new THREE.Vector3(9, -0.56525, -4.5),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection6.3',
    position: new THREE.Vector3(10.6, -0.56525, -5.1),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station14',
    position: new THREE.Vector3(13.6, -0.56525, -5.3),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.5),
  },
  {
    id: 'Station15',
    position: new THREE.Vector3(19, -0.56525, -5.3),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.5),
  },
  {
    id: 'Inflection7.1',
    position: new THREE.Vector3(23.8, -0.56525, -5.4),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection7.2',
    position: new THREE.Vector3(24.3, -0.56525, -6),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station16',
    position: new THREE.Vector3(24.5, -0.56525, -7.7),
    type: 'Station',
    offset: new THREE.Vector3(-6.5, 0, -10),
  },
  {
    id: 'Station17',
    position: new THREE.Vector3(24.5, -0.56525, -11),
    type: 'Station',
    offset: new THREE.Vector3(-6.5, 0, -10),
  },
  {
    id: 'Inflection8',
    position: new THREE.Vector3(24.1, -0.56525, -14.7),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station18',
    position: new THREE.Vector3(23, -0.56525, -15.2),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 7.5),
  },
  {
    id: 'Station19',
    position: new THREE.Vector3(17, -0.56525, -15.2),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 7.5),
  },
  {
    id: 'Station20',
    position: new THREE.Vector3(11, -0.56525, -15.2),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 7.5),
  },
  {
    id: 'Station21',
    position: new THREE.Vector3(5, -0.56525, -15.2),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 7.5),
  },
  {
    id: 'Inflection9',
    position: new THREE.Vector3(1.7, -0.56525, -14.8),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station22',
    position: new THREE.Vector3(1.4, -0.56525, -12.4),
    type: 'Station',
    offset: new THREE.Vector3(7.5, 0, 10),
  },
  {
    id: 'Station23',
    position: new THREE.Vector3(1.4, -0.56525, -7.5),
    type: 'Station',
    offset: new THREE.Vector3(7.5, 0, 10),
  },
  {
    id: 'Inflection10.1',
    position: new THREE.Vector3(1.2, -0.56525, -5),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection10.2',
    position: new THREE.Vector3(0.7, -0.56525, -4.5),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection10.3',
    position: new THREE.Vector3(-0.1, -0.56525, -4.3),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station24',
    position: new THREE.Vector3(-0.5, -0.56525, -4.2),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 7.5),
  },
  {
    id: 'Station25',
    position: new THREE.Vector3(-4.5, -0.56525, -4.2),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 7.5),
  },
  {
    id: 'Inflection11.1',
    position: new THREE.Vector3(-7.3, -0.56525, -4.6),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection11.2',
    position: new THREE.Vector3(-8.2, -0.56525, -5.8),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection11.3',
    position: new THREE.Vector3(-8.5, -0.56525, -6.6),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station26',
    position: new THREE.Vector3(-8.6, -0.56525, -7),
    type: 'Station',
    offset: new THREE.Vector3(-7.5, 0, -10),
  },
  {
    id: 'Station27',
    position: new THREE.Vector3(-8.6, -0.56525, -12),
    type: 'Station',
    offset: new THREE.Vector3(-7.5, 0, -10),
  },
  {
    id: 'Inflection12',
    position: new THREE.Vector3(-9, -0.56525, -14.8),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station28',
    position: new THREE.Vector3(-11, -0.56525, -15.2),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 6.5),
  },
  {
    id: 'Station29',
    position: new THREE.Vector3(-16.3, -0.56525, -15.2),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 6.5),
  },
  {
    id: 'Station30',
    position: new THREE.Vector3(-21, -0.56525, -15.2),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 6.5),
  },
  {
    id: 'Inflection13',
    position: new THREE.Vector3(-23.2, -0.56525, -14.5),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station31',
    position: new THREE.Vector3(-23.5, -0.56525, -11.5),
    type: 'Station',
    offset: new THREE.Vector3(6.5, 0, 10),
  },
  {
    id: 'Station32',
    position: new THREE.Vector3(-23.5, -0.56525, -7.5),
    type: 'Station',
    offset: new THREE.Vector3(6.5, 0, 10),
  },
  {
    id: 'Inflection14',
    position: new THREE.Vector3(-23.1, -0.56525, -5.5),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station33',
    position: new THREE.Vector3(-20, -0.56525, -5.3),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.5),
  },
  {
    id: 'Station34',
    position: new THREE.Vector3(-14, -0.56525, -5.3),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.5),
  },
  {
    id: 'Inflection15.1',
    position: new THREE.Vector3(-9, -0.45, -5),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection15.2',
    position: new THREE.Vector3(-7.9, -0.45, -4.1),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection15.3',
    position: new THREE.Vector3(-7.5, -0.45, -2.9),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station35',
    position: new THREE.Vector3(-7.4, -0.45, -2.5),
    type: 'Station',
    offset: new THREE.Vector3(6.5, 0, 10),
  },
  {
    id: 'Station36',
    position: new THREE.Vector3(-7.4, -0.45, 1.5),
    type: 'Station',
    offset: new THREE.Vector3(6.5, 0, 10),
  },
  {
    id: 'Station37',
    position: new THREE.Vector3(-7.4, -0.45, 6),
    type: 'Station',
    offset: new THREE.Vector3(6.5, 0, 10),
  },
  {
    id: 'Inflection16.1',
    position: new THREE.Vector3(-7.7, -0.45, 7.3),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection16.2',
    position: new THREE.Vector3(-8.5, -0.45, 7.7),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station38',
    position: new THREE.Vector3(-10.5, -0.45, 7.9),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 6.5),
  },
  {
    id: 'Station39',
    position: new THREE.Vector3(-15.5, -0.45, 7.9),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 6.5),
  },
  {
    id: 'Station40',
    position: new THREE.Vector3(-20, -0.45, 7.9),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 6.5),
  },
  {
    id: 'Inflection17',
    position: new THREE.Vector3(-23.2, -0.45, 8.2),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station41',
    position: new THREE.Vector3(-23.5, -0.45, 10.5),
    type: 'Station',
    offset: new THREE.Vector3(6.5, 0, 10),
  },
  {
    id: 'Inflection18',
    position: new THREE.Vector3(-23.2, -0.45, 15),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station42',
    position: new THREE.Vector3(-21, -0.45, 15.5),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.5),
  },
  {
    id: 'Station43',
    position: new THREE.Vector3(-16.5, -0.45, 15.5),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.5),
  },
  {
    id: 'Station44',
    position: new THREE.Vector3(-11.7, -0.45, 15.5),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.5),
  },
  {
    id: 'Inflection19.1',
    position: new THREE.Vector3(-9.5, -0.45, 15.5),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection19.2',
    position: new THREE.Vector3(-8.8, -0.45, 15),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection19.3',
    position: new THREE.Vector3(-8.7, -0.45, 14),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station45',
    position: new THREE.Vector3(-8.7, -0.45, 13),
    type: 'Station',
    offset: new THREE.Vector3(-6.5, 0, -10),
  },
  {
    id: 'Inflection20.1',
    position: new THREE.Vector3(-8, -0.45, 11.3),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection20.2',
    position: new THREE.Vector3(-7, -0.56525, 10.9),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station1',
    position: new THREE.Vector3(-2.09, -0.56525, 10.8),
    type: 'Station',
    offset: new THREE.Vector3(10, 0, -6.3),
  },
];

export const sections: bus_stations[][] = [
  [
    {
      id: 'Station1',
      position: new THREE.Vector3(-2.09, -0.56525, 10.8),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
    {
      id: 'Station2',
      position: new THREE.Vector3(4, -0.56525, 10.8),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
  ],
  [
    {
      id: 'Station2',
      position: new THREE.Vector3(4, -0.56525, 10.8),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
    {
      id: 'Inflection1.1',
      position: new THREE.Vector3(7.8, -0.56525, 10.9),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection1.2',
      position: new THREE.Vector3(8.8, -0.56525, 11.2),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection1.3',
      position: new THREE.Vector3(9.4, -0.56525, 12),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station3',
      position: new THREE.Vector3(9.5, -0.56525, 12.5),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 5),
    },
  ],
  [
    {
      id: 'Station3',
      position: new THREE.Vector3(9.5, -0.56525, 12.5),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 5),
    },
    {
      id: 'Inflection2',
      position: new THREE.Vector3(9.9, -0.56525, 15.2),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station4',
      position: new THREE.Vector3(12.4, -0.56525, 15.5),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
  ],
  [
    {
      id: 'Station4',
      position: new THREE.Vector3(12.4, -0.56525, 15.5),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
    {
      id: 'Station5',
      position: new THREE.Vector3(16.6, -0.56525, 15.5),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
  ],
  [
    {
      id: 'Station5',
      position: new THREE.Vector3(16.6, -0.56525, 15.5),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
    {
      id: 'Station6',
      position: new THREE.Vector3(21, -0.56525, 15.5),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
  ],
  [
    {
      id: 'Station6',
      position: new THREE.Vector3(21, -0.56525, 15.5),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
    {
      id: 'Inflection3',
      position: new THREE.Vector3(24, -0.56525, 15.2),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station7',
      position: new THREE.Vector3(24.5, -0.56525, 12),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -5),
    },
  ],
  [
    {
      id: 'Station7',
      position: new THREE.Vector3(24.5, -0.56525, 12),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -5),
    },
    {
      id: 'Inflection4.1',
      position: new THREE.Vector3(24.3, -0.56525, 8.2),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection4.2',
      position: new THREE.Vector3(23.5, -0.56525, 7.9),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station8',
      position: new THREE.Vector3(23, -0.56525, 7.8),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
  ],
  [
    {
      id: 'Station8',
      position: new THREE.Vector3(23, -0.56525, 7.8),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
    {
      id: 'Station9',
      position: new THREE.Vector3(18, -0.56525, 7.8),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
  ],
  [
    {
      id: 'Station9',
      position: new THREE.Vector3(18, -0.56525, 7.8),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
    {
      id: 'Station10',
      position: new THREE.Vector3(11.2, -0.56525, 7.8),
      type: 'Station',
      offset: new THREE.Vector3(-5, 0, 7.5),
    },
  ],
  [
    {
      id: 'Station10',
      position: new THREE.Vector3(11.2, -0.56525, 7.8),
      type: 'Station',
      offset: new THREE.Vector3(-5, 0, 7.5),
    },
    {
      id: 'Inflection5.1',
      position: new THREE.Vector3(9.4, -0.56525, 7.6),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection5.2',
      position: new THREE.Vector3(8.6, -0.56525, 7.3),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station11',
      position: new THREE.Vector3(8.3, -0.56525, 6),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -10),
    },
  ],
  [
    {
      id: 'Station11',
      position: new THREE.Vector3(8.3, -0.56525, 6),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -10),
    },
    {
      id: 'Station12',
      position: new THREE.Vector3(8.3, -0.56525, 2.5),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -10),
    },
  ],
  [
    {
      id: 'Station12',
      position: new THREE.Vector3(8.3, -0.56525, 2.5),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -10),
    },
    {
      id: 'Station13',
      position: new THREE.Vector3(8.3, -0.56525, -1.5),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -10),
    },
  ],
  [
    {
      id: 'Station13',
      position: new THREE.Vector3(8.3, -0.56525, -1.5),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -10),
    },
    {
      id: 'Inflection6.1',
      position: new THREE.Vector3(8.4, -0.56525, -3),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection6.2',
      position: new THREE.Vector3(9, -0.56525, -4.5),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection6.3',
      position: new THREE.Vector3(10.6, -0.56525, -5.1),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station14',
      position: new THREE.Vector3(13.6, -0.56525, -5.3),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
  ],
  [
    {
      id: 'Station14',
      position: new THREE.Vector3(13.6, -0.56525, -5.3),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
    {
      id: 'Station15',
      position: new THREE.Vector3(19, -0.56525, -5.3),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
  ],
  [
    {
      id: 'Station15',
      position: new THREE.Vector3(19, -0.56525, -5.3),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
    {
      id: 'Inflection7.1',
      position: new THREE.Vector3(23.8, -0.56525, -5.4),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection7.2',
      position: new THREE.Vector3(24.3, -0.56525, -6),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station16',
      position: new THREE.Vector3(24.5, -0.56525, -7.7),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -10),
    },
  ],
  [
    {
      id: 'Station16',
      position: new THREE.Vector3(24.5, -0.56525, -7.7),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -10),
    },
    {
      id: 'Station17',
      position: new THREE.Vector3(24.5, -0.56525, -11),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -10),
    },
  ],
  [
    {
      id: 'Station17',
      position: new THREE.Vector3(24.5, -0.56525, -11),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -10),
    },
    {
      id: 'Inflection8',
      position: new THREE.Vector3(24.1, -0.56525, -14.7),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station18',
      position: new THREE.Vector3(23, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
  ],
  [
    {
      id: 'Station18',
      position: new THREE.Vector3(23, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
    {
      id: 'Station19',
      position: new THREE.Vector3(17, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
  ],
  [
    {
      id: 'Station19',
      position: new THREE.Vector3(17, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
    {
      id: 'Station20',
      position: new THREE.Vector3(11, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
  ],
  [
    {
      id: 'Station20',
      position: new THREE.Vector3(11, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
    {
      id: 'Station21',
      position: new THREE.Vector3(5, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
  ],
  [
    {
      id: 'Station21',
      position: new THREE.Vector3(5, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
    {
      id: 'Inflection9',
      position: new THREE.Vector3(1.7, -0.56525, -14.8),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station22',
      position: new THREE.Vector3(1.4, -0.56525, -12.4),
      type: 'Station',
      offset: new THREE.Vector3(7.5, 0, 10),
    },
  ],
  [
    {
      id: 'Station22',
      position: new THREE.Vector3(1.4, -0.56525, -12.4),
      type: 'Station',
      offset: new THREE.Vector3(7.5, 0, 10),
    },
    {
      id: 'Station23',
      position: new THREE.Vector3(1.4, -0.56525, -7.5),
      type: 'Station',
      offset: new THREE.Vector3(7.5, 0, 10),
    },
  ],
  [
    {
      id: 'Station23',
      position: new THREE.Vector3(1.4, -0.56525, -7.5),
      type: 'Station',
      offset: new THREE.Vector3(7.5, 0, 10),
    },
    {
      id: 'Inflection10.1',
      position: new THREE.Vector3(1.2, -0.56525, -5),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection10.2',
      position: new THREE.Vector3(0.7, -0.56525, -4.5),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection10.3',
      position: new THREE.Vector3(-0.1, -0.56525, -4.3),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station24',
      position: new THREE.Vector3(-0.5, -0.56525, -4.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
  ],
  [
    {
      id: 'Station24',
      position: new THREE.Vector3(-0.5, -0.56525, -4.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
    {
      id: 'Station25',
      position: new THREE.Vector3(-4.5, -0.56525, -4.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
  ],
  [
    {
      id: 'Station25',
      position: new THREE.Vector3(-4.5, -0.56525, -4.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 7.5),
    },
    {
      id: 'Inflection11.1',
      position: new THREE.Vector3(-7.3, -0.56525, -4.6),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection11.2',
      position: new THREE.Vector3(-8.2, -0.56525, -5.8),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection11.3',
      position: new THREE.Vector3(-8.5, -0.56525, -6.6),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station26',
      position: new THREE.Vector3(-8.6, -0.56525, -7),
      type: 'Station',
      offset: new THREE.Vector3(-7.5, 0, -10),
    },
  ],
  [
    {
      id: 'Station26',
      position: new THREE.Vector3(-8.6, -0.56525, -7),
      type: 'Station',
      offset: new THREE.Vector3(-7.5, 0, -10),
    },
    {
      id: 'Station27',
      position: new THREE.Vector3(-8.6, -0.56525, -12),
      type: 'Station',
      offset: new THREE.Vector3(-7.5, 0, -10),
    },
  ],
  [
    {
      id: 'Station27',
      position: new THREE.Vector3(-8.6, -0.56525, -12),
      type: 'Station',
      offset: new THREE.Vector3(-7.5, 0, -10),
    },
    {
      id: 'Inflection12',
      position: new THREE.Vector3(-9, -0.56525, -14.8),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station28',
      position: new THREE.Vector3(-11, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 6.5),
    },
  ],
  [
    {
      id: 'Station28',
      position: new THREE.Vector3(-11, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 6.5),
    },
    {
      id: 'Station29',
      position: new THREE.Vector3(-16.3, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 6.5),
    },
  ],
  [
    {
      id: 'Station29',
      position: new THREE.Vector3(-16.3, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 6.5),
    },
    {
      id: 'Station30',
      position: new THREE.Vector3(-21, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 6.5),
    },
  ],
  [
    {
      id: 'Station30',
      position: new THREE.Vector3(-21, -0.56525, -15.2),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 6.5),
    },
    {
      id: 'Inflection13',
      position: new THREE.Vector3(-23.2, -0.56525, -14.5),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station31',
      position: new THREE.Vector3(-23.5, -0.56525, -11.5),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 10),
    },
  ],
  [
    {
      id: 'Station31',
      position: new THREE.Vector3(-23.5, -0.56525, -11.5),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 10),
    },
    {
      id: 'Station32',
      position: new THREE.Vector3(-23.5, -0.56525, -7.5),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 10),
    },
  ],
  [
    {
      id: 'Station32',
      position: new THREE.Vector3(-23.5, -0.56525, -7.5),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 10),
    },
    {
      id: 'Inflection14',
      position: new THREE.Vector3(-23.1, -0.56525, -5.5),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station33',
      position: new THREE.Vector3(-20, -0.56525, -5.3),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
  ],
  [
    {
      id: 'Station33',
      position: new THREE.Vector3(-20, -0.56525, -5.3),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
    {
      id: 'Station34',
      position: new THREE.Vector3(-14, -0.56525, -5.3),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
  ],
  [
    {
      id: 'Station34',
      position: new THREE.Vector3(-14, -0.56525, -5.3),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
    {
      id: 'Inflection15.1',
      position: new THREE.Vector3(-9, -0.45, -5),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection15.2',
      position: new THREE.Vector3(-7.9, -0.45, -4.1),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection15.3',
      position: new THREE.Vector3(-7.5, -0.45, -2.9),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station35',
      position: new THREE.Vector3(-7.4, -0.45, -2.5),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 10),
    },
  ],
  [
    {
      id: 'Station35',
      position: new THREE.Vector3(-7.4, -0.45, -2.5),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 10),
    },
    {
      id: 'Station36',
      position: new THREE.Vector3(-7.4, -0.45, 1.5),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 10),
    },
  ],
  [
    {
      id: 'Station36',
      position: new THREE.Vector3(-7.4, -0.45, 1.5),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 10),
    },
    {
      id: 'Station37',
      position: new THREE.Vector3(-7.4, -0.45, 6),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 10),
    },
  ],
  [
    {
      id: 'Station37',
      position: new THREE.Vector3(-7.4, -0.45, 6),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 10),
    },
    {
      id: 'Inflection16.1',
      position: new THREE.Vector3(-7.7, -0.45, 7.3),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection16.2',
      position: new THREE.Vector3(-8.5, -0.45, 7.7),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station38',
      position: new THREE.Vector3(-10.5, -0.45, 7.9),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 6.5),
    },
  ],
  [
    {
      id: 'Station38',
      position: new THREE.Vector3(-10.5, -0.45, 7.9),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 6.5),
    },
    {
      id: 'Station39',
      position: new THREE.Vector3(-15.5, -0.45, 7.9),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 6.5),
    },
  ],
  [
    {
      id: 'Station39',
      position: new THREE.Vector3(-15.5, -0.45, 7.9),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 6.5),
    },
    {
      id: 'Station40',
      position: new THREE.Vector3(-20, -0.45, 7.9),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 6.5),
    },
  ],
  [
    {
      id: 'Station40',
      position: new THREE.Vector3(-20, -0.45, 7.9),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 6.5),
    },
    {
      id: 'Inflection17',
      position: new THREE.Vector3(-23.2, -0.45, 8.2),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station41',
      position: new THREE.Vector3(-23.5, -0.45, 10.5),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 10),
    },
  ],
  [
    {
      id: 'Station41',
      position: new THREE.Vector3(-23.5, -0.45, 10.5),
      type: 'Station',
      offset: new THREE.Vector3(6.5, 0, 10),
    },
    {
      id: 'Inflection18',
      position: new THREE.Vector3(-23.2, -0.45, 15),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station42',
      position: new THREE.Vector3(-21, -0.45, 15.5),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
  ],
  [
    {
      id: 'Station42',
      position: new THREE.Vector3(-21, -0.45, 15.5),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
    {
      id: 'Station43',
      position: new THREE.Vector3(-16.5, -0.45, 15.5),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
  ],
  [
    {
      id: 'Station43',
      position: new THREE.Vector3(-16.5, -0.45, 15.5),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
    {
      id: 'Station44',
      position: new THREE.Vector3(-11.7, -0.45, 15.5),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
  ],
  [
    {
      id: 'Station44',
      position: new THREE.Vector3(-11.7, -0.45, 15.5),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.5),
    },
    {
      id: 'Inflection19.1',
      position: new THREE.Vector3(-9.5, -0.45, 15.5),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection19.2',
      position: new THREE.Vector3(-8.8, -0.45, 15),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection19.3',
      position: new THREE.Vector3(-8.7, -0.45, 14),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station45',
      position: new THREE.Vector3(-8.7, -0.45, 13),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -10),
    },
  ],
  [
    {
      id: 'Station45',
      position: new THREE.Vector3(-8.7, -0.45, 13),
      type: 'Station',
      offset: new THREE.Vector3(-6.5, 0, -10),
    },
    {
      id: 'Inflection20.1',
      position: new THREE.Vector3(-8, -0.45, 11.3),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection20.2',
      position: new THREE.Vector3(-7, -0.56525, 10.9),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station1',
      position: new THREE.Vector3(-2.09, -0.56525, 10.8),
      type: 'Station',
      offset: new THREE.Vector3(10, 0, -6.3),
    },
  ]
];

export const roadSectionCurves = sections.map((section) => {
  return new THREE.CatmullRomCurve3(
    section.map(
      ({ position }) =>
        new THREE.Vector3(
          position.x * SCALE_FACTOR,
          position.y + 53,
          position.z * SCALE_FACTOR
        )
    ),
    false
  );
});
