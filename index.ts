
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
    makeCube();
    makeTorus();
    makeBalls();
    setTimeout(() => makeCubes(), 1000);
    // makeCubes();
    const ground = makeGround();

    setInterval(() => makeBalls(), 5000);
    setInterval(() => makeCubes(), 10000);

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


    const sphere = scene.getMeshByName("torus1");
    if(sphere != null) {
        sphere?.physicsImpostor.registerOnPhysicsCollide(ground.physicsImpostor, function(main, collided) {
            // main.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());

            // console.log(main.object.physicsImpostor.getLinearVelocity());
            
            if(main.object.physicsImpostor.getLinearVelocity().lengthSquared() >= 16) {
                const p = new BABYLON.ParticleSystem("particles", 10, scene);
                p.emitter = main.object.position;
                p.createPointEmitter(new BABYLON.Vector3(-7, 1, 7), new BABYLON.Vector3(7, 1, -7));
                p.disposeOnStop = true;
                p.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
                p.minEmitPower = 5;
                p.maxEmitPower = 8;
                p.minSize = 0.1;
                p.maxSize = 0.4;
                p.minLifeTime = 0.3;
                p.maxLifeTime = 1.0;
                p.color1 = new BABYLON.Color4(0.97, 0.68, 0.64);
                p.color2 = new BABYLON.Color4(1, 0.2, 0.2);
                p.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

                p.gravity = new BABYLON.Vector3(0, -9.81, 0);
                
                p.emitRate = 10000;
                p.start();
                setTimeout(()=>p.stop(), 50);
            }
        });
    }

    engine.runRenderLoop(() => {

        const divFps = document.getElementById("fps");
        if(divFps != null) {
            divFps.innerHTML = engine.getFps().toFixed() + " fps";
        }

        scene.render()
    });
}

main();
