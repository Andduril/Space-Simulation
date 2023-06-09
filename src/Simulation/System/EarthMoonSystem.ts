import { kmToUnit } from '../units';
import { App } from '../../App';
import { Planet } from '../Planet';
import * as THREE from 'three';

export interface OrbitalSystem {
  planets: Planet[];
  update: () => void;
  getPlanet: (name: string) => Planet | undefined;
}

export class EarthMoonSystem implements OrbitalSystem {
  planets: Planet[] = [];
  distance: number = 384400;
  moonRotationPeriod: number = 27.3 * 24 * 60 * 60;

  constructor() {
    const earth = new Planet('Earth', 5.9736*10^24, 6378, {x: 0, y: 0, z: 0}, {x: THREE.MathUtils.degToRad(-23.5), y: 0, z: 0}, 24*60*60);
    const moon = new Planet('Moon', 7.3477*10^22, 1737.4, {x: 0, y: 0, z: 0}, {x: 0, y: 0, z: 0}, 27.3*24*60*60);
    this.planets.push(earth, moon);
  }

  getPlanet(name: string): Planet | undefined {
    return this.planets.find((planet) => planet.name === name);
  };

  update() {
    // calcul orbite lunaire
    const moonPosition = this.getPlanet('Moon')!.position;
    const angle = (App.elapsedTime / this.moonRotationPeriod) * Math.PI * 2;

    moonPosition.x = Math.cos(-angle) * kmToUnit(this.distance);
    moonPosition.z = Math.sin(-angle) * kmToUnit(this.distance);

    // calcul rotation de chaque astre
    this.planets.forEach((planet) => {
      planet.update();
    });

  };
}