import * as THREE from 'three';
import earthSurface from '../assets/earthmap1.jpg';
import earthCloud from '../assets/earthCloud.png';
import moonSurface from '../assets/moon.jpg';

export interface SurfaceLayer {
  material: THREE.Material;
  surfaceOptions?: (mesh: THREE.Mesh) => void;
}

export interface PlanetTextureData {
  surfaceLayers: SurfaceLayer[];
}

export const planetTextureData: {[key: string]: PlanetTextureData} = {
  Earth: {
    surfaceLayers: [
      {
        material: new THREE.MeshStandardMaterial({
          map: new THREE.TextureLoader().load(earthSurface),
        }),
        surfaceOptions: (mesh: THREE.Mesh) => {
          mesh.receiveShadow = true;
          mesh.castShadow = true;
          mesh.layers.set(0);
        }
      },
      {
        material: new THREE.MeshPhongMaterial({
          map: new THREE.TextureLoader().load(earthCloud),
          transparent: true,
        }),
      }
    ]
  },
  Moon: {
    surfaceLayers: [
      {
        material: new THREE.MeshStandardMaterial({
          map: new THREE.TextureLoader().load(moonSurface),
        }),
        surfaceOptions: (mesh: THREE.Mesh) => {
          mesh.receiveShadow = true;
          mesh.castShadow = true;
          mesh.rotateY(Math.PI * 3)
        }
      }
    ]
  }
}

export const getPlanetTextureData = (name: string): PlanetTextureData | undefined => {
  return planetTextureData[name];
}