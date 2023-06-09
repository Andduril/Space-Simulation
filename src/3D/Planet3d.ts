import * as THREE from "three";
import { Planet } from "../Simulation/Planet";
import { getPlanetTextureData } from "./planetTextureData";

export class Planet3D extends THREE.Object3D {
  name: string;

  constructor(planet: Planet) {
    super();

    this.name = planet.name;

    const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
    const textureData = getPlanetTextureData(planet.name);
    if (textureData) {
      textureData.surfaceLayers.forEach((surfaceLayer) => {
        const { material, surfaceOptions } = surfaceLayer;
        const mesh = new THREE.Mesh(geometry, material);

        if (surfaceOptions) {
          surfaceOptions(mesh);
        }

        this.add(mesh);
      });
    }
  }

  update(planet: Planet, camera?: THREE.PerspectiveCamera) {
    const previousPosition = this.position.clone();

    this.position.set(planet.position.x, planet.position.y, planet.position.z);
    this.rotation.set(planet.rotation.x, planet.rotation.y, planet.rotation.z);

    const positionDifference = this.position.clone().sub(previousPosition);
    camera?.position.add(positionDifference);
  }
}
