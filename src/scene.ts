
import { ArcRotateCamera, Color4, DirectionalLight, Engine, HemisphericLight, Scene, ShadowGenerator, Vector3 } from 'babylonjs';
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

    const light = new HemisphericLight("Light", new Vector3(1, 1, 0), scene);
    light.intensity = 0.1;

    const pos = new Vector3(-10, 50, 50);
    const dir = new DirectionalLight("dir", Vector3.Zero().subtract(pos), scene);
    dir.position = pos;
    dir.intensity = 0.7;

    const shadowGenerator = new ShadowGenerator(1024, dir);   
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 64;
}

function setBackground(scene: Scene): void {
    scene.clearColor = new Color4(0, 0, 0, 1);
}
