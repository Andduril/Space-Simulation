import * as THREE from "three";
import { Simulation } from "../Simulation/Simulation";
import { Planet3D } from "./Planet3d";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class EarthMoonScene extends THREE.Scene {
  simulation: Simulation;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  planets: Planet3D[] = [];

  focus: Planet3D;

  constructor(
    simulation: Simulation,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls
  ) {
    super();
    this.simulation = simulation;
    this.camera = camera;
    this.controls = controls;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    this.add(light);

    this.simulation.getPlanets().forEach((planet) => {
      const planet3D = new Planet3D(planet);
      planet3D.name = planet.name;
      this.planets.push(planet3D);
      this.add(planet3D);
    });

    // temporaire
    this.focus = this.planets[0];
    this.camera.position.z = simulation.getPlanetByName("Earth")!.radius + 10;
    this.controls.update();
  }

  setFocus(name: string) {
    const planet = this.planets.find((planet) => planet.name === name);
    if (planet) {
      this.focus = planet;
      this.camera.position.add(this.focus.position);
    }
  }

  private focusPlanet() {
    if (this.focus) {
      this.camera.lookAt(this.focus.position);
      this.controls.target.copy(this.focus.position);
    }
  }

  update() {
    this.focusPlanet();

    this.planets.forEach((planet3D) => {
      const planetData = this.simulation.getPlanetByName(planet3D.name);
      if (planetData) {
        if (planet3D === this.focus) {
          planet3D.update(planetData, this.camera);
        } else {
          planet3D.update(planetData);
        }
      }
    });
  }
}
