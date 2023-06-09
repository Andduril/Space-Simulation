import { App } from './App'
import { EarthMoonSystem } from './Simulation/System/EarthMoonSystem';
import './style.css'

const earthMoonSystem = new EarthMoonSystem();
const app = new App(earthMoonSystem);

app.start();
