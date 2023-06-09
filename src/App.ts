import * as THREE from "three";
import { EarthMoonScene } from "./3D/EarthMoonScene";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Simulation } from "./Simulation/Simulation";
import { OrbitalSystem } from "./Simulation/System/EarthMoonSystem";
import getTimeFormat from "./utils/getTimeFormat";

export class App {
  static elapsedTime: number = 0;

  // display Part
  timerOutput = document.getElementById("timer-output");
  timeScaleOutput = document.getElementById("time-scale");
  planetList = document.getElementById("focus-manager");

  // logics Part
  simulation: Simulation;
  timeScale: number = 1;

  // ThreeJs Part
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock = new THREE.Clock();
  controls: OrbitControls;
  scene: EarthMoonScene;

  constructor(system: OrbitalSystem, timerOption?: number) {
    // logic part
    this.simulation = new Simulation(system);
    if (timerOption) this.timeScale = timerOption;

    // threeJs Part
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.scene = new EarthMoonScene(
      this.simulation,
      this.camera,
      this.controls
    );

    this.renderer.shadowMap.enabled = true;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // display part
    this.timeScaleOutput!.innerText = `Time x ${this.timeScale}`;
    this.setTimeButtons();
    this.setPlanetButtons();
  }

  setTimeScale(nb: number) {
    this.timeScale = nb;
    this.timeScaleOutput!.innerText = `Time x ${this.timeScale}`;
  }

  start() {
    const tick = () => {
      requestAnimationFrame(tick);
      const deltaTime = this.clock.getDelta() * this.timeScale;
      App.elapsedTime += deltaTime;

      // mise a jour des positions
      this.simulation.simulate();

      //mise a jour de l'affichage ThreeJs
      this.scene.update();

      // mise a jour de l'affichage html
      this.timerOutput!.innerText = getTimeFormat(Math.floor(App.elapsedTime));

      // render the animation
      this.renderer.render(this.scene, this.camera);
    };

    tick();
  }

  setTimeButtons() {
    const timeController = document.getElementById("time-controller");
    const buttons = timeController?.querySelectorAll("svg");

    buttons?.forEach((button, index) => {
      button.addEventListener("click", () => {
        this.setTimeScale(Math.pow(10, index));
        for (var i = 0; i <= index; i++) {
          buttons[i].classList.add("activated");
        }
        for (var j = index + 1; j < buttons.length; j++) {
          buttons[j].classList.remove("activated");
        }
      });
    });
  }

  setPlanetButtons() {
    this.simulation.getPlanets().forEach((planet) => {
      const listItem = document.createElement("li");
      const planetDiv = document.createElement("div");
      const planetName = document.createElement("span");
      const focusButton = document.createElement("button");

      planetName.textContent = planet.name;
      focusButton.textContent = "Focus";
      focusButton.addEventListener('click', () => {
        this.scene.setFocus(planet.name);
      })

      planetDiv.appendChild(planetName);
      planetDiv.appendChild(focusButton);
      listItem.appendChild(planetDiv);
      this.planetList!.appendChild(listItem);
    });
  }
}
