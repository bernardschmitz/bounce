
import 'regenerator-runtime/runtime';
import { scene, engine } from './src/scene';
import Ammo from 'ammojs-typed';
import { AmmoJSPlugin, Vector3 } from 'babylonjs';
import { makeGround } from './src/ground';
import { makeCube } from './src/cube';


async function main(): Promise<void> {
    
    const ammo = await Ammo();
    const physics = new AmmoJSPlugin(true, ammo);
    
    scene.enablePhysics(new Vector3(0, -9.81, 0), physics);
    makeCube();
    makeGround();

    engine.runRenderLoop(() => scene.render());
}

main();
