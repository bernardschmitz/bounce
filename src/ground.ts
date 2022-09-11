
import { Color3, Mesh, MeshBuilder, PhysicsImpostor, StandardMaterial } from "babylonjs";
import { scene } from "./scene";

export function makeGround(): Mesh {
    
    const size = 15;
    const ground = MeshBuilder.CreateGround("Ground", { width: size, height: size}, scene);
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

    const groundMaterial = new StandardMaterial("brown", scene);
    groundMaterial.diffuseColor = new Color3(0.5, 0.2, 0.1);
    // ground.material = groundMaterial;

    ground.receiveShadows = true;

    return ground;
}
