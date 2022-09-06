
import { Color3, Mesh, MeshBuilder, PhysicsImpostor, ShadowGenerator, StandardMaterial, Vector3 } from "babylonjs";
import { scene } from "./scene";

export function makeCube(): Mesh {

    // const cube = MeshBuilder.CreateBox("Cube", { size: 1});
    const cube = MeshBuilder.CreateTorus("torus", { diameter: 1, thickness: 0.5, tessellation: 20 }, scene);
    cube.rotate(Vector3.Forward(), Math.PI/3);
    cube.position = new Vector3(0, 2, 0);
    cube.physicsImpostor = new PhysicsImpostor(cube, PhysicsImpostor.MeshImpostor, { mass: 1, restitution: 0.8 }, scene);
    
    const cubeMaterial = new StandardMaterial("green", scene);
    cubeMaterial.diffuseColor = Color3.Green();
    cube.material = cubeMaterial;

    const shadowGenerator = scene.getLightByName("dir")?.getShadowGenerator() as ShadowGenerator;
    shadowGenerator.addShadowCaster(cube, true);

    return cube;
}