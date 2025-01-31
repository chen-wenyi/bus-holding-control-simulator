import * as THREE from 'three';
import { SCALE_FACTOR } from './route';

interface bus_stations {
  id: string;
  position: THREE.Vector3;
  type: 'Station' | 'Inflection';
  offset?: THREE.Vector3;
}

export const stations: bus_stations[] = [
  {
    id: 'Station1',
    position: new THREE.Vector3(8, -0.56525, -4.9),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 6.3),
  },
  {
    id: 'Inflection1',
    position: new THREE.Vector3(12.2, -0.2, -5.5),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Inflection2',
    position: new THREE.Vector3(12.7, -0.2, -9.1),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station2',
    position: new THREE.Vector3(15.25, -0.56525, -9.5),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 6),
  },
  {
    id: 'Station3',
    position: new THREE.Vector3(20.68, -0.56525, -9.5),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 6),
  },
  {
    id: 'Station4',
    position: new THREE.Vector3(25.6, -0.56525, -9.5),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 6),
  },
  {
    id: 'Inflection3',
    position: new THREE.Vector3(27, -0.56525, -9),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station5',
    position: new THREE.Vector3(27.3, -0.56525, -7),
    type: 'Station',
    offset: new THREE.Vector3(-5, 0, 0),
  },
  {
    id: 'Station6',
    position: new THREE.Vector3(27.3, -0.56525, -4),
    type: 'Station',
    offset: new THREE.Vector3(-5, 0, 0),
  },
  {
    id: 'Inflection4',
    position: new THREE.Vector3(27.2, -0.56525, -2.3),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station7',
    position: new THREE.Vector3(25.6, -0.56525, -2),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, -6),
  },
  {
    id: 'Station8',
    position: new THREE.Vector3(21.2, -0.56525, -2),
    type: 'Station',
    offset: new THREE.Vector3(-6, 0, -6),
  },
  {
    id: 'Station9',
    position: new THREE.Vector3(15, -0.56525, -2),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, -6),
  },
  {
    id: 'Inflection5',
    position: new THREE.Vector3(11.7, -0.45, -1.9),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station10',
    position: new THREE.Vector3(11.5, -0.45, -1),
    type: 'Station',
    offset: new THREE.Vector3(-8.5, 0, 0),
  },
  {
    id: 'Station11',
    position: new THREE.Vector3(11.5, -0.45, 4),
    type: 'Station',
    offset: new THREE.Vector3(-8.5, 0, 0),
  },
  {
    id: 'Station12',
    position: new THREE.Vector3(11.5, -0.45, 8),
    type: 'Station',
    offset: new THREE.Vector3(-8.5, 0, 0),
  },
  {
    id: 'Inflection6',
    position: new THREE.Vector3(11.7, -0.45, 11.3),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station13',
    position: new THREE.Vector3(15, -0.56524, 11.3),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 6),
  },
  {
    id: 'Station14',
    position: new THREE.Vector3(19, -0.56524, 11.3),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 6),
  },
  {
    id: 'Station15',
    position: new THREE.Vector3(23, -0.56524, 11.3),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 6),
  },
  {
    id: 'Inflection7',
    position: new THREE.Vector3(27, -0.56524, 11.6),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station16',
    position: new THREE.Vector3(27.2, -0.56524, 14.5),
    type: 'Station',
    offset: new THREE.Vector3(-4, 0, 0),
  },
  {
    id: 'Station17',
    position: new THREE.Vector3(27.2, -0.56524, 18.5),
    type: 'Station',
    offset: new THREE.Vector3(-4, 0, 0),
  },
  {
    id: 'Inflection8',
    position: new THREE.Vector3(27, -0.56524, 20.4),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station18',
    position: new THREE.Vector3(23.4, -0.56524, 20.9),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, -4),
  },
  {
    id: 'Station19',
    position: new THREE.Vector3(17.8, -0.56524, 20.9),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, -4),
  },
  {
    id: 'Station20',
    position: new THREE.Vector3(13.6, -0.56524, 20.7),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, -4),
  },
  {
    id: 'Inflection9',
    position: new THREE.Vector3(12.8, -0.56524, 20.7),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station21',
    position: new THREE.Vector3(12.6, -0.56524, 16.8),
    type: 'Station',
    offset: new THREE.Vector3(6, 0, 0),
  },
  {
    id: 'Station22',
    position: new THREE.Vector3(12.6, -0.56524, 13),
    type: 'Station',
    offset: new THREE.Vector3(6, 0, 0),
  },
  {
    id: 'Inflection10',
    position: new THREE.Vector3(12.4, -0.56524, 10.6),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station23',
    position: new THREE.Vector3(8.5, -0.59143, 10.2),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, -8),
  },
  {
    id: 'Station24',
    position: new THREE.Vector3(4, -0.59143, 10.2),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, -8),
  },
  {
    id: 'Inflection11',
    position: new THREE.Vector3(2.7, -0.59143, 10.6),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station25',
    position: new THREE.Vector3(2.6, -0.59143, 14),
    type: 'Station',
    offset: new THREE.Vector3(-7.5, 0, -1),
  },
  {
    id: 'Station26',
    position: new THREE.Vector3(2.6, -0.59143, 20.2),
    type: 'Station',
    offset: new THREE.Vector3(-7.5, 0, -3),
  },
  {
    id: 'Inflection12',
    position: new THREE.Vector3(2.3, -0.56524, 21),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station27',
    position: new THREE.Vector3(-2.5, -0.56524, 21),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, -5.5),
  },
  {
    id: 'Station28',
    position: new THREE.Vector3(-8.3, -0.56524, 21),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, -5.5),
  },
  {
    id: 'Station29',
    position: new THREE.Vector3(-14.8, -0.56524, 21),
    type: 'Station',
    offset: new THREE.Vector3(-5, 0, -5.5),
  },
  {
    id: 'Inflection13',
    position: new THREE.Vector3(-20.2, -0.56524, 20.8),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station30',
    position: new THREE.Vector3(-20.4, -0.56524, 19),
    type: 'Station',
    offset: new THREE.Vector3(5, 0, 0),
  },
  {
    id: 'Station31',
    position: new THREE.Vector3(-20.4, -0.56524, 15),
    type: 'Station',
    offset: new THREE.Vector3(5, 0, 0),
  },
  {
    id: 'Inflection14',
    position: new THREE.Vector3(-20.2, -0.56524, 11.6),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station32',
    position: new THREE.Vector3(-16.6, -0.56524, 11.2),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 6.5),
  },
  {
    id: 'Station33',
    position: new THREE.Vector3(-10.4, -0.56524, 11.2),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 6.5),
  },
  {
    id: 'Inflection15',
    position: new THREE.Vector3(-5, -0.56524, 10.8),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station34',
    position: new THREE.Vector3(-4.5, -0.56524, 7.5),
    type: 'Station',
    offset: new THREE.Vector3(8, 0, 0),
  },
  {
    id: 'Station35',
    position: new THREE.Vector3(-4.5, -0.56524, 1.2),
    type: 'Station',
    offset: new THREE.Vector3(8, 0, 0),
  },
  {
    id: 'Inflection16',
    position: new THREE.Vector3(-4.8, -0.56524, -1.2),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station36',
    position: new THREE.Vector3(-8, -0.56525, -1.8),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, -7.5),
  },
  {
    id: 'Station37',
    position: new THREE.Vector3(-12.8, -0.56525, -1.8),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, -7.5),
  },
  {
    id: 'Station38',
    position: new THREE.Vector3(-17, -0.56525, -1.8),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, -7.5),
  },
  {
    id: 'Inflection17',
    position: new THREE.Vector3(-20.4, -0.56524, -2.2),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station39',
    position: new THREE.Vector3(-20.6, -0.55314, -4),
    type: 'Station',
    offset: new THREE.Vector3(8, 0, 0),
  },
  {
    id: 'Station40',
    position: new THREE.Vector3(-20.6, -0.56525, -7.4),
    type: 'Station',
    offset: new THREE.Vector3(8, 0, 0),
  },
  {
    id: 'Inflection18',
    position: new THREE.Vector3(-20.4, -0.56524, -9),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station41',
    position: new THREE.Vector3(-17, -0.56525, -9.8),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 9),
  },
  {
    id: 'Station42',
    position: new THREE.Vector3(-12.8, -0.55314, -9.8),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 9),
  },
  {
    id: 'Station43',
    position: new THREE.Vector3(-8, -0.56525, -9.8),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 9),
  },
  {
    id: 'Inflection19',
    position: new THREE.Vector3(-5.8, -0.56524, -9.3),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station44',
    position: new THREE.Vector3(-5.3, -0.56525, -6.5),
    type: 'Station',
    offset: new THREE.Vector3(-10, 0, 0),
  },
  {
    id: 'Inflection20',
    position: new THREE.Vector3(-5, -0.56525, -5),
    type: 'Inflection',
    offset: new THREE.Vector3(0, 0, 0),
  },
  {
    id: 'Station45',
    position: new THREE.Vector3(-2, -0.56525, -4.8),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 6.3),
  },
  {
    id: 'Station46',
    position: new THREE.Vector3(3.5, -0.56525, -4.8),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 6.3),
  },
  {
    id: 'Station1',
    position: new THREE.Vector3(8, -0.56525, -4.9),
    type: 'Station',
    offset: new THREE.Vector3(0, 0, 6.3),
  },
];

export const sections: bus_stations[][] = [
  [
    {
      id: 'Station1',
      position: new THREE.Vector3(8, -0.56525, -4.9),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6.3),
    },
    {
      id: 'Inflection1',
      position: new THREE.Vector3(12.2, -0.2, -5.5),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Inflection2',
      position: new THREE.Vector3(12.7, -0.2, -9.1),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station2',
      position: new THREE.Vector3(15.25, -0.56525, -9.5),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6),
    },
  ],
  [
    {
      id: 'Station2',
      position: new THREE.Vector3(15.25, -0.56525, -9.5),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6),
    },
    {
      id: 'Station3',
      position: new THREE.Vector3(20.68, -0.56525, -9.5),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6),
    },
  ],
  [
    {
      id: 'Station3',
      position: new THREE.Vector3(20.68, -0.56525, -9.5),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6),
    },
    {
      id: 'Station4',
      position: new THREE.Vector3(25.6, -0.56525, -9.5),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6),
    },
  ],
  [
    {
      id: 'Station4',
      position: new THREE.Vector3(25.6, -0.56525, -9.5),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6),
    },
    {
      id: 'Inflection3',
      position: new THREE.Vector3(27, -0.56525, -9),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station5',
      position: new THREE.Vector3(27.3, -0.56525, -7),
      type: 'Station',
      offset: new THREE.Vector3(-5, 0, 0),
    },
  ],
  [
    {
      id: 'Station5',
      position: new THREE.Vector3(27.3, -0.56525, -7),
      type: 'Station',
      offset: new THREE.Vector3(-5, 0, 0),
    },
    {
      id: 'Station6',
      position: new THREE.Vector3(27.3, -0.56525, -4),
      type: 'Station',
      offset: new THREE.Vector3(-5, 0, 0),
    },
  ],
  [
    {
      id: 'Station6',
      position: new THREE.Vector3(27.3, -0.56525, -4),
      type: 'Station',
      offset: new THREE.Vector3(-5, 0, 0),
    },
    {
      id: 'Inflection4',
      position: new THREE.Vector3(27.2, -0.56525, -2.3),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station7',
      position: new THREE.Vector3(25.6, -0.56525, -2),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -6),
    },
  ],
  [
    {
      id: 'Station7',
      position: new THREE.Vector3(25.6, -0.56525, -2),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -6),
    },
    {
      id: 'Station8',
      position: new THREE.Vector3(21.2, -0.56525, -2),
      type: 'Station',
      offset: new THREE.Vector3(-6, 0, -6),
    },
  ],
  [
    {
      id: 'Station8',
      position: new THREE.Vector3(21.2, -0.56525, -2),
      type: 'Station',
      offset: new THREE.Vector3(-6, 0, -6),
    },
    {
      id: 'Station9',
      position: new THREE.Vector3(15, -0.56525, -2),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -6),
    },
  ],
  [
    {
      id: 'Station9',
      position: new THREE.Vector3(15, -0.56525, -2),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -6),
    },
    {
      id: 'Inflection5',
      position: new THREE.Vector3(11.7, -0.45, -1.9),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station10',
      position: new THREE.Vector3(11.5, -0.45, -1),
      type: 'Station',
      offset: new THREE.Vector3(-8.5, 0, 0),
    },
  ],
  [
    {
      id: 'Station10',
      position: new THREE.Vector3(11.5, -0.45, -1),
      type: 'Station',
      offset: new THREE.Vector3(-8.5, 0, 0),
    },
    {
      id: 'Station11',
      position: new THREE.Vector3(11.5, -0.45, 4),
      type: 'Station',
      offset: new THREE.Vector3(-8.5, 0, 0),
    },
  ],
  [
    {
      id: 'Station11',
      position: new THREE.Vector3(11.5, -0.45, 4),
      type: 'Station',
      offset: new THREE.Vector3(-8.5, 0, 0),
    },
    {
      id: 'Station12',
      position: new THREE.Vector3(11.5, -0.45, 8),
      type: 'Station',
      offset: new THREE.Vector3(-8.5, 0, 0),
    },
  ],
  [
    {
      id: 'Station12',
      position: new THREE.Vector3(11.5, -0.45, 8),
      type: 'Station',
      offset: new THREE.Vector3(-8.5, 0, 0),
    },
    {
      id: 'Inflection6',
      position: new THREE.Vector3(11.7, -0.45, 11.3),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station13',
      position: new THREE.Vector3(15, -0.56524, 11.3),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6),
    },
  ],
  [
    {
      id: 'Station13',
      position: new THREE.Vector3(15, -0.56524, 11.3),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6),
    },
    {
      id: 'Station14',
      position: new THREE.Vector3(19, -0.56524, 11.3),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6),
    },
  ],
  [
    {
      id: 'Station14',
      position: new THREE.Vector3(19, -0.56524, 11.3),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6),
    },
    {
      id: 'Station15',
      position: new THREE.Vector3(23, -0.56524, 11.3),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6),
    },
  ],
  [
    {
      id: 'Station15',
      position: new THREE.Vector3(23, -0.56524, 11.3),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6),
    },
    {
      id: 'Inflection7',
      position: new THREE.Vector3(27, -0.56524, 11.6),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station16',
      position: new THREE.Vector3(27.2, -0.56524, 14.5),
      type: 'Station',
      offset: new THREE.Vector3(-4, 0, 0),
    },
  ],
  [
    {
      id: 'Station16',
      position: new THREE.Vector3(27.2, -0.56524, 14.5),
      type: 'Station',
      offset: new THREE.Vector3(-4, 0, 0),
    },
    {
      id: 'Station17',
      position: new THREE.Vector3(27.2, -0.56524, 18.5),
      type: 'Station',
      offset: new THREE.Vector3(-4, 0, 0),
    },
  ],
  [
    {
      id: 'Station17',
      position: new THREE.Vector3(27.2, -0.56524, 18.5),
      type: 'Station',
      offset: new THREE.Vector3(-4, 0, 0),
    },
    {
      id: 'Inflection8',
      position: new THREE.Vector3(27, -0.56524, 20.4),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station18',
      position: new THREE.Vector3(23.4, -0.56524, 20.9),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -4),
    },
  ],
  [
    {
      id: 'Station18',
      position: new THREE.Vector3(23.4, -0.56524, 20.9),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -4),
    },
    {
      id: 'Station19',
      position: new THREE.Vector3(17.8, -0.56524, 20.9),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -4),
    },
  ],
  [
    {
      id: 'Station19',
      position: new THREE.Vector3(17.8, -0.56524, 20.9),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -4),
    },
    {
      id: 'Station20',
      position: new THREE.Vector3(13.6, -0.56524, 20.7),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -4),
    },
  ],
  [
    {
      id: 'Station20',
      position: new THREE.Vector3(13.6, -0.56524, 20.7),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -4),
    },
    {
      id: 'Inflection9',
      position: new THREE.Vector3(12.8, -0.56524, 20.7),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station21',
      position: new THREE.Vector3(12.6, -0.56524, 16.8),
      type: 'Station',
      offset: new THREE.Vector3(6, 0, 0),
    },
  ],
  [
    {
      id: 'Station21',
      position: new THREE.Vector3(12.6, -0.56524, 16.8),
      type: 'Station',
      offset: new THREE.Vector3(6, 0, 0),
    },
    {
      id: 'Station22',
      position: new THREE.Vector3(12.6, -0.56524, 13),
      type: 'Station',
      offset: new THREE.Vector3(6, 0, 0),
    },
  ],
  [
    {
      id: 'Station22',
      position: new THREE.Vector3(12.6, -0.56524, 13),
      type: 'Station',
      offset: new THREE.Vector3(6, 0, 0),
    },
    {
      id: 'Inflection10',
      position: new THREE.Vector3(12.4, -0.56524, 10.6),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station23',
      position: new THREE.Vector3(8.5, -0.59143, 10.2),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -8),
    },
  ],
  [
    {
      id: 'Station23',
      position: new THREE.Vector3(8.5, -0.59143, 10.2),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -8),
    },
    {
      id: 'Station24',
      position: new THREE.Vector3(4, -0.59143, 10.2),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -8),
    },
  ],
  [
    {
      id: 'Station24',
      position: new THREE.Vector3(4, -0.59143, 10.2),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -8),
    },
    {
      id: 'Inflection11',
      position: new THREE.Vector3(2.7, -0.59143, 10.6),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station25',
      position: new THREE.Vector3(2.6, -0.59143, 14),
      type: 'Station',
      offset: new THREE.Vector3(-7.5, 0, -1),
    },
  ],
  [
    {
      id: 'Station25',
      position: new THREE.Vector3(2.6, -0.59143, 14),
      type: 'Station',
      offset: new THREE.Vector3(-7.5, 0, -1),
    },
    {
      id: 'Station26',
      position: new THREE.Vector3(2.6, -0.59143, 20.2),
      type: 'Station',
      offset: new THREE.Vector3(-7.5, 0, -3),
    },
  ],
  [
    {
      id: 'Station26',
      position: new THREE.Vector3(2.6, -0.59143, 20.2),
      type: 'Station',
      offset: new THREE.Vector3(-7.5, 0, -3),
    },
    {
      id: 'Inflection12',
      position: new THREE.Vector3(2.3, -0.56524, 21),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station27',
      position: new THREE.Vector3(-2.5, -0.56524, 21),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -5.5),
    },
  ],
  [
    {
      id: 'Station27',
      position: new THREE.Vector3(-2.5, -0.56524, 21),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -5.5),
    },
    {
      id: 'Station28',
      position: new THREE.Vector3(-8.3, -0.56524, 21),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -5.5),
    },
  ],
  [
    {
      id: 'Station28',
      position: new THREE.Vector3(-8.3, -0.56524, 21),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -5.5),
    },
    {
      id: 'Station29',
      position: new THREE.Vector3(-14.8, -0.56524, 21),
      type: 'Station',
      offset: new THREE.Vector3(-5, 0, -5.5),
    },
  ],
  [
    {
      id: 'Station29',
      position: new THREE.Vector3(-14.8, -0.56524, 21),
      type: 'Station',
      offset: new THREE.Vector3(-5, 0, -5.5),
    },
    {
      id: 'Inflection13',
      position: new THREE.Vector3(-20.2, -0.56524, 20.8),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station30',
      position: new THREE.Vector3(-20.4, -0.56524, 19),
      type: 'Station',
      offset: new THREE.Vector3(5, 0, 0),
    },
  ],
  [
    {
      id: 'Station30',
      position: new THREE.Vector3(-20.4, -0.56524, 19),
      type: 'Station',
      offset: new THREE.Vector3(5, 0, 0),
    },
    {
      id: 'Station31',
      position: new THREE.Vector3(-20.4, -0.56524, 15),
      type: 'Station',
      offset: new THREE.Vector3(5, 0, 0),
    },
  ],
  [
    {
      id: 'Station31',
      position: new THREE.Vector3(-20.4, -0.56524, 15),
      type: 'Station',
      offset: new THREE.Vector3(5, 0, 0),
    },
    {
      id: 'Inflection14',
      position: new THREE.Vector3(-20.2, -0.56524, 11.6),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station32',
      position: new THREE.Vector3(-16.6, -0.56524, 11.2),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6.5),
    },
  ],
  [
    {
      id: 'Station32',
      position: new THREE.Vector3(-16.6, -0.56524, 11.2),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6.5),
    },
    {
      id: 'Station33',
      position: new THREE.Vector3(-10.4, -0.56524, 11.2),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6.5),
    },
  ],
  [
    {
      id: 'Station33',
      position: new THREE.Vector3(-10.4, -0.56524, 11.2),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6.5),
    },
    {
      id: 'Inflection15',
      position: new THREE.Vector3(-5, -0.56524, 10.8),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station34',
      position: new THREE.Vector3(-4.5, -0.56524, 7.5),
      type: 'Station',
      offset: new THREE.Vector3(8, 0, 0),
    },
  ],
  [
    {
      id: 'Station34',
      position: new THREE.Vector3(-4.5, -0.56524, 7.5),
      type: 'Station',
      offset: new THREE.Vector3(8, 0, 0),
    },
    {
      id: 'Station35',
      position: new THREE.Vector3(-4.5, -0.56524, 1.2),
      type: 'Station',
      offset: new THREE.Vector3(8, 0, 0),
    },
  ],
  [
    {
      id: 'Station35',
      position: new THREE.Vector3(-4.5, -0.56524, 1.2),
      type: 'Station',
      offset: new THREE.Vector3(8, 0, 0),
    },
    {
      id: 'Inflection16',
      position: new THREE.Vector3(-4.8, -0.56524, -1.2),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station36',
      position: new THREE.Vector3(-8, -0.56525, -1.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -7.5),
    },
  ],
  [
    {
      id: 'Station36',
      position: new THREE.Vector3(-8, -0.56525, -1.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -7.5),
    },
    {
      id: 'Station37',
      position: new THREE.Vector3(-12.8, -0.56525, -1.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -7.5),
    },
  ],
  [
    {
      id: 'Station37',
      position: new THREE.Vector3(-12.8, -0.56525, -1.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -7.5),
    },
    {
      id: 'Station38',
      position: new THREE.Vector3(-17, -0.56525, -1.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -7.5),
    },
  ],
  [
    {
      id: 'Station38',
      position: new THREE.Vector3(-17, -0.56525, -1.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, -7.5),
    },
    {
      id: 'Inflection17',
      position: new THREE.Vector3(-20.4, -0.56524, -2.2),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station39',
      position: new THREE.Vector3(-20.6, -0.55314, -4),
      type: 'Station',
      offset: new THREE.Vector3(8, 0, 0),
    },
  ],
  [
    {
      id: 'Station39',
      position: new THREE.Vector3(-20.6, -0.55314, -4),
      type: 'Station',
      offset: new THREE.Vector3(8, 0, 0),
    },
    {
      id: 'Station40',
      position: new THREE.Vector3(-20.6, -0.56525, -7.4),
      type: 'Station',
      offset: new THREE.Vector3(8, 0, 0),
    },
  ],
  [
    {
      id: 'Station40',
      position: new THREE.Vector3(-20.6, -0.56525, -7.4),
      type: 'Station',
      offset: new THREE.Vector3(8, 0, 0),
    },
    {
      id: 'Inflection18',
      position: new THREE.Vector3(-20.4, -0.56524, -9),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station41',
      position: new THREE.Vector3(-17, -0.56525, -9.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 9),
    },
  ],
  [
    {
      id: 'Station41',
      position: new THREE.Vector3(-17, -0.56525, -9.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 9),
    },
    {
      id: 'Station42',
      position: new THREE.Vector3(-12.8, -0.55314, -9.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 9),
    },
  ],
  [
    {
      id: 'Station42',
      position: new THREE.Vector3(-12.8, -0.55314, -9.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 9),
    },
    {
      id: 'Station43',
      position: new THREE.Vector3(-8, -0.56525, -9.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 9),
    },
  ],
  [
    {
      id: 'Station43',
      position: new THREE.Vector3(-8, -0.56525, -9.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 9),
    },
    {
      id: 'Inflection19',
      position: new THREE.Vector3(-5.8, -0.56524, -9.3),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station44',
      position: new THREE.Vector3(-5.3, -0.56525, -6.5),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 0),
    },
  ],
  [
    {
      id: 'Station44',
      position: new THREE.Vector3(-5.3, -0.56525, -6.5),
      type: 'Station',
      offset: new THREE.Vector3(-10, 0, 0),
    },
    {
      id: 'Inflection20',
      position: new THREE.Vector3(-5, -0.56525, -5),
      type: 'Inflection',
      offset: new THREE.Vector3(0, 0, 0),
    },
    {
      id: 'Station45',
      position: new THREE.Vector3(-2, -0.56525, -4.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6.3),
    },
  ],
  [
    {
      id: 'Station45',
      position: new THREE.Vector3(-2, -0.56525, -4.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6.3),
    },
    {
      id: 'Station46',
      position: new THREE.Vector3(3.5, -0.56525, -4.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6.3),
    },
  ],
  [
    {
      id: 'Station46',
      position: new THREE.Vector3(3.5, -0.56525, -4.8),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6.3),
    },
    {
      id: 'Station1',
      position: new THREE.Vector3(8, -0.56525, -4.9),
      type: 'Station',
      offset: new THREE.Vector3(0, 0, 6.3),
    },
  ]
];

export const roadSectionCurves = sections.map((section) => {
  return new THREE.CatmullRomCurve3(
    section.map(
      ({ position }) =>
        new THREE.Vector3(
          position.x * SCALE_FACTOR,
          position.y + 33,
          position.z * SCALE_FACTOR
        )
    ),
    false
  );
});