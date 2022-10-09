
import 'regenerator-runtime/runtime';
import { scene, engine } from './scene';
import Ammo from 'ammojs-typed';
import { makeGround } from './ground';
import { makeCubes } from './cube';
import { canvas } from './domItems';
import { AmmoJSPlugin, Vector3 } from '@babylonjs/core';
import { AdvancedDynamicTexture, Control, Rectangle, TextBlock } from '@babylonjs/gui';


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

    scene.pointerMovePredicate = () => false;
    scene.pointerDownPredicate = () => false;
    scene.pointerUpPredicate = () => false;

    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    const fps_box = new Rectangle();
    fps_box.width = "60px";
    fps_box.height = "30px";
    fps_box.cornerRadius = 20;
    fps_box.color = "salmon";
    fps_box.thickness = 2;
    fps_box.background = "#444";
    fps_box.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    fps_box.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    fps_box.top = "15px";
    fps_box.left = "-10px";
    advancedTexture.addControl(fps_box);    

    const fps_text = new TextBlock();
    fps_text.text = "Hello world";
    fps_text.color = "white";
    fps_text.fontSize = 15;
  
    fps_box.addControl(fps_text);  

    // scene.debugLayer.show();

    engine.runRenderLoop(() => {

        fps_text.text = engine.getFps().toFixed() + " fps";
        scene.render()
    });
}

main();
