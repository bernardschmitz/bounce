
import { Color3, Light, Mesh, MeshBuilder, PhysicsImpostor, ShadowGenerator, StandardMaterial, Vector3 } from "babylonjs";
import { scene } from "./scene";

export function makeCube(): Mesh {

    // const cube = MeshBuilder.CreateBox("Cube", { size: 1});
    const cube = MeshBuilder.CreateTorus("torus", { diameter: 1, thickness: 0.5, tessellation: 20 }, scene);
    cube.rotate(Vector3.Forward(), Math.PI/3);
    cube.position = new Vector3(0, 2, 0);
    cube.physicsImpostor = new PhysicsImpostor(cube, PhysicsImpostor.MeshImpostor, { mass: 1, restitution: 0.7 }, scene);
    
    const cubeMaterial = new StandardMaterial("green", scene);
    cubeMaterial.diffuseColor = Color3.Green();
    cube.material = cubeMaterial;

    const light = scene.getLightByName("spot") as Light;
    if(light == null) {
        throw "light not found";
    }
    const shadowGenerator = light.getShadowGenerator() as ShadowGenerator;
    if(shadowGenerator == null) {
        throw "shadowGenerator not found";
    }
    shadowGenerator.addShadowCaster(cube);
    // cube.receiveShadows = true;

    return cube;
}

export function makeTorus(): Mesh {

    const torus = MeshBuilder.CreateTorus("torus", { diameter: 1, thickness: 0.5, tessellation: 20 }, scene);
    torus.rotate(Vector3.Forward(), Math.PI/3);
    torus.position = new Vector3(1, 2, -2);
    torus.physicsImpostor = new PhysicsImpostor(torus, PhysicsImpostor.MeshImpostor, { mass: 1, restitution: 0.9 }, scene);
    
    const cubeMaterial = new StandardMaterial("blue", scene);
    cubeMaterial.diffuseColor = Color3.Blue();
    torus.material = cubeMaterial;

    const shadowGenerator = scene.getLightByName("spot")?.getShadowGenerator() as ShadowGenerator;
    shadowGenerator.addShadowCaster(torus);
    // torus.receiveShadows = true;

    return torus;
}

export function makeBalls(): void {

    const N = 10;

    const shadowGenerator = scene.getLightByName("spot")?.getShadowGenerator() as ShadowGenerator;

    const ballMaterial = new StandardMaterial("red", scene);
    ballMaterial.diffuseColor = Color3.Red();

    const balls: Mesh[] = [];
    for(var i=0; i<N; i++) {
        const ball = MeshBuilder.CreateSphere("ball"+i, { diameter: 0.5, segments: 10 });
        ball.position.x = -5 + i;
        ball.position.y = 5;
        ball.material = ballMaterial;

        ball.physicsImpostor = new PhysicsImpostor(ball, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
        shadowGenerator.addShadowCaster(ball);
        // ball.receiveShadows = true;
        balls.push(ball);
    }
}
