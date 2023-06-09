import { App } from '../App';
import { kmToUnit } from "./units";
// import * as THREE from 'three';

export class Planet {
  name: string;
  mass: number;
  radius: number;
  position: {x: number, y: number, z: number};
  rotation: {x: number, y: number, z: number};

  rotationPeriod: number;
  revertedRotation?: boolean;

  constructor(
    name: string,
    mass: number,
    radius: number,
    position: {x: number, y: number, z: number},
    rotation: {x: number, y: number, z: number},
    rotationPeriod: number,
  ) {
    this.name = name;
    this.mass = mass;
    this.radius = kmToUnit(radius);
    this.position = {x: kmToUnit(position.x), y: kmToUnit(position.y), z: kmToUnit(position.z)};
    this.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};
    this.rotationPeriod = rotationPeriod;
  }

  update() {
    const rotationAngle = (App.elapsedTime / this.rotationPeriod) * Math.PI * 2;
    this.rotation.y = rotationAngle;
    // this.rotation.x = THREE.MathUtils.degToRad(-23.5);
  }
}
