
import 'regenerator-runtime/runtime';
import { scene, engine } from './src/scene';
import Ammo from 'ammojs-typed';
import { AmmoJSPlugin, Vector3 } from 'babylonjs';
import { makeGround } from './src/ground';
import { makeCubes } from './src/cube';
import { canvas } from './src/domItems';


async function main(): Promise<void> {
     
    const ammo = await Ammo();
    const physics = new AmmoJSPlugin(true, ammo);
    
    scene.enablePhysics(new Vector3(0, -9.81/1.5, 0), physics);

    setTimeout(() => makeCubes(), 1000);
    makeGround();


    canvas.onresize = function() {
        console.log("canvas resize", canvas.width, canvas.height);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        engine.resize(true);
    };
    window.onresize = function() {
        console.log("window resize", window.innerWidth, window.innerHeight);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        engine.resize(true);
    };

    console.log(window.innerWidth, window.innerHeight);
    console.log(canvas.width, canvas.height);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // scene.debugLayer.show();

    engine.runRenderLoop(() => {

        const divFps = document.getElementById("fps");
        if(divFps != null) {
            divFps.innerHTML = engine.getFps().toFixed() + " fps";
        }

        scene.render()
    });
}

main();
