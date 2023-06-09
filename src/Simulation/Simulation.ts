import { Planet } from './Planet';
import { OrbitalSystem } from './System/EarthMoonSystem';

export class Simulation {
  system: OrbitalSystem;
  static elapsedTime: number;

  constructor(system: OrbitalSystem) {
    this.system = system;
  }

  getPlanetByName(name: string): Planet | undefined {
    return this.system.planets.find((planet) => planet.name === name);
  }

  getPlanets(): Planet[] {
    return this.system.planets;
  }

  simulate() {
    this.system.update();
  }
}