
import { Animation, ArcRotateCamera, Color3, Color4,  CubicEase, EasingFunction, Engine, HemisphericLight, Scene, ShadowGenerator, SpotLight, Vector3 } from '@babylonjs/core';
import { canvas } from './domItems';

export const engine = new Engine(canvas, true);
export const scene = makeScene();

function makeScene(): Scene {
    const scene = new Scene(engine);

    createCamera(scene);
    createLight(scene);

    scene.ambientColor = new Color3(0.4, 0.4, 0.4);
    scene.clearColor = new Color4(0.4, 0.4, 0.4, 1);

    scene.fogColor = new Color3(0.4, 0.4, 0.4);
    scene.fogMode = Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.01;
    
    // scene.environmentTexture = CubeTexture.CreateFromPrefilteredData("/textures/environment.dds", scene);

    return scene;
}

function createCamera(scene: Scene): void  {

    const alpha = Math.PI / 4.0;
    const beta = Math.PI / 3.0;
    const radius = 20.0;
    const target = new Vector3(0.0, 0.0, 0.0);

    const camera = new ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
    camera.attachControl(canvas, true);

    const frameRate = 60;
    const seconds = 60*15;

    const animateAlpha = new Animation("animAlpha", "alpha", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFramesAlpha = [];
    keyFramesAlpha.push({frame: 0, value: 0.0});
    keyFramesAlpha.push({frame: seconds, value: Math.PI*2.0});
    animateAlpha.setKeys(keyFramesAlpha);

    const animateBeta = new Animation("animBeta", "beta", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFramesBeta = [];
    keyFramesBeta.push({frame: 0, value: 0.5});
    keyFramesBeta.push({frame: seconds/2.0, value: Math.PI/2.3});
    keyFramesBeta.push({frame: seconds, value: 0.5});
    animateBeta.setKeys(keyFramesBeta);

    const ease = new CubicEase();
    ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    animateBeta.setEasingFunction(ease);

    camera.animations = [ animateAlpha, animateBeta ];
    scene.beginAnimation(camera, 0, seconds, true, 1);
}

function createLight(scene: Scene): void {

    const light = new HemisphericLight("Light", new Vector3(20, 20, 0), scene);
    light.intensity = 0.25;

    const pos = new Vector3(-10, 25, 15);
    const dir = new SpotLight("spot", pos, Vector3.Zero().subtract(pos), Math.PI/2, 10, scene);
    dir.position = pos;
    dir.intensity = 0.5;
    
    dir.shadowEnabled = true;

    const shadowGenerator = new ShadowGenerator(2048, dir);
    shadowGenerator.darkness = 0.25;

}
