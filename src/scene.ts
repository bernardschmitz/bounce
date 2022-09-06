
// import * as B from 'babylonjs';
import { ArcRotateCamera, Color4, Engine, HemisphericLight, Scene, Vector3 } from 'babylonjs';
import { canvas } from './domItems';

export const engine = new Engine(canvas, true);
export const scene = makeScene();

function makeScene(): Scene {
    const scene = new Scene(engine);

    createCamera(scene);
    createLight(scene);
    setBackground(scene);

    return scene;
}

function createCamera(scene: Scene): void  {

    const alpha = Math.PI / 4.0;
    const beta = Math.PI / 3.0;
    const radius = 8.0;
    const target = new Vector3(0.0, 0.0, 0.0);

    new ArcRotateCamera("Camera", alpha, beta, radius, target, scene).attachControl(canvas, true);
}

function createLight(scene: Scene): void {

    new HemisphericLight("Light", new Vector3(1, 1, 0), scene);
}

function setBackground(scene: Scene): void {
    scene.clearColor = new Color4(0, 0, 0, 1);
}
