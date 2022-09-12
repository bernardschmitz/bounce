
import { Mesh, MeshBuilder, PhysicsImpostor, Scalar, ShadowGenerator, Vector3 } from "babylonjs";
import { scene } from "./scene";

export function makeGround(): void {
    
    const size = 500;
    const ground = MeshBuilder.CreateBox("Ground", { width: size, depth: size, height: 0.5}, scene);
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    ground.position.y -= 0.25;
    ground.receiveShadows = true;
    ground.isVisible = true;

    // const gm = new PBRMaterial("ground_pbr", scene);
    // gm.forceIrradianceInFragment = true;
    // gm.bumpTexture = new Texture("/textures/floor_bump.png", scene);
    // gm.metallic = 0.0;
    // gm.roughness = 1.0;
    // gm.clearCoat.isEnabled = true;
    // gm.clearCoat.bumpTexture = new Texture("/textures/waterbump.png", scene);
    // ground.material = gm;

    const N = 100;

    const gmesh: Mesh[] = [];

    for(let i=0; i<N; i++) {
        const s = Scalar.RandomRange(0.5, 3);
        const g = MeshBuilder.CreateBox("block_phys"+i, { size: s }, scene);
        g.isVisible = false;
        g.position = new Vector3(Math.trunc(Scalar.RandomRange(-20, 20)), s/2, Math.trunc(Scalar.RandomRange(-20, 20)));
        gmesh.push(g);
    }   

    const blocks = Mesh.MergeMeshes(gmesh, false);
    if(blocks === null) {
        throw "failed merging meshes";
    }

    blocks.name = "Blocks";
    blocks.receiveShadows = true;
    blocks.isVisible = true;

    (scene.getLightByName("spot")?.getShadowGenerator() as ShadowGenerator).addShadowCaster(blocks);

    const ground_phys = new Mesh("block_phy", scene);
    blocks.parent = ground_phys;
    for(let k of gmesh) {
        k.parent = ground_phys;
    }

    for(let k of gmesh) {
        k.physicsImpostor = new PhysicsImpostor(k, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    }

    ground_phys.physicsImpostor = new PhysicsImpostor(ground_phys, PhysicsImpostor.NoImpostor, { mass: 0, restitution: 0.1, friction: 0.75 }, scene);
}
