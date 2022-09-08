
import 'regenerator-runtime/runtime';
import { scene, engine } from './src/scene';
import Ammo from 'ammojs-typed';
import { AmmoJSPlugin, Mesh, ShadowGenerator, Vector3 } from 'babylonjs';
import { makeGround } from './src/ground';
import { makeBalls, makeCube, makeTorus } from './src/cube';
import { canvas } from './src/domItems';


async function main(): Promise<void> {
     
    const ammo = await Ammo();
    const physics = new AmmoJSPlugin(true, ammo);
    
    scene.enablePhysics(new Vector3(0, -9.81, 0), physics);
    makeCube();
    makeTorus();
    makeBalls();
    makeGround();

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

    scene.onAfterRenderObservable.add(() => {

        for(var b:Mesh of scene.meshes) {
            if(b.position.y < -1) {
                // console.log('dispose {}', b.name);
                scene.getLightByName
                scene.getLightByName("dir")?.getShadowGenerator()?.removeShadowCaster(b);
                scene.removeMesh(b);
                b.dispose();
            }
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
