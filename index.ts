
import 'regenerator-runtime/runtime';
import { scene, engine } from './src/scene';
import Ammo from 'ammojs-typed';
import { AmmoJSPlugin, PointerEventTypes, Vector3 } from 'babylonjs';
import { makeGround } from './src/ground';
import { makeCubes } from './src/cube';
import { canvas } from './src/domItems';
import { makeExplosion } from './src/particle';


async function main(): Promise<void> {
     
    const ammo = await Ammo();
    const physics = new AmmoJSPlugin(true, ammo);
    
    scene.enablePhysics(new Vector3(0, -9.81/1.5, 0), physics);

    // setTimeout(() => makeCubes(), 1000);
    makeGround();
    makeCubes();
    
    // const e1 = makeExplosion();
    // const e2 = makeExplosion();
    // const e3 = makeExplosion();

    // e1[0].position = new Vector3(5, 5, 0);
    // e2[0].position = new Vector3(0, 5, 0);
    // e3[0].position = new Vector3(-5, 5, 0);

    // scene.onPointerObservable.add((pointerInfo) => {
    //     switch (pointerInfo.type) {
    //         case PointerEventTypes.POINTERTAP:
    //             e1[1].start();
    //             e1[2].start();
    //             e2[1].start();
    //             e2[2].start();
    //             e3[1].start();
    //             e3[2].start();
    //         break;
    //     }
    // });

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

    scene.pointerMovePredicate = () => false;
    scene.pointerDownPredicate = () => false;
    scene.pointerUpPredicate = () => false;



    engine.runRenderLoop(() => {

        const divFps = document.getElementById("fps");
        if(divFps != null) {
            divFps.innerHTML = engine.getFps().toFixed() + " fps";
        }

        scene.render()
    });
}

main();
