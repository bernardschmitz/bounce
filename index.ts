
import 'regenerator-runtime/runtime';
import { scene, engine } from './src/scene';
import Ammo from 'ammojs-typed';
import { AmmoJSPlugin, Mesh, ShadowGenerator, Vector3 } from 'babylonjs';
import { makeGround } from './src/ground';
import { makeBalls, makeCube, makeCubes, makeTorus } from './src/cube';
import { canvas } from './src/domItems';


async function main(): Promise<void> {
     
    const ammo = await Ammo();
    const physics = new AmmoJSPlugin(true, ammo);
    
    scene.enablePhysics(new Vector3(0, -9.81/1.5, 0), physics);
    // makeCube();
    // makeTorus();
    // makeBalls();
    // setTimeout(() => makeCubes(), 1000);
    makeCubes();
    makeGround();

    // setInterval(() => makeBalls(), 5000);
    setInterval(() => makeCubes(), 5000);

    // const physicsViewer = new PhysicsViewer(scene);

    // scene.meshes.forEach(mesh => {
    //     console.log(mesh);
    //     if (mesh.physicsImpostor) {
    //         physicsViewer.showImpostor(mesh.physicsImpostor, mesh as Mesh);
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

    // const notMoving:{[key: string]: number} = {};

    scene.onAfterRenderObservable.add(() => {

        for(var b:Mesh of scene.meshes) {
            if(b.name.startsWith("Ground")) {
                continue;
            }

            if(b.position.y < -25) {
                // console.log('dispose {}', b.name);
                // scene.getLightByName
                scene.getLightByName("spot")?.getShadowGenerator()?.removeShadowCaster(b);
                scene.removeMesh(b);
                b.physicsImpostor?.dispose();
                b.dispose();
            }
            // else {
            //     const av = b.physicsImpostor?.getLinearVelocity();
            //     if(av != null && av.lengthSquared() < 0.001) {
            //         let k = notMoving[b.id] || 0;
            //         k++;
            //         notMoving[b.id] = k;
            //     }
            //     else {
            //         delete notMoving[b.id];
            //     }
            //     if(notMoving[b.id] > 120) {
            //         delete notMoving[b.id];
            //         scene.removeMesh(b);
            //         b.physicsImpostor?.dispose();
            //         b.dispose();
            //     }
            // }

    });

    engine.runRenderLoop(() => {

        const divFps = document.getElementById("fps");
        if(divFps != null) {
            divFps.innerHTML = engine.getFps().toFixed() + " fps";
        }

        scene.render()
    });
}

main();
