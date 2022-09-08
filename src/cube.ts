
import { Color3, Light, Mesh, MeshBuilder, PhysicsImpostor, ShadowGenerator, StandardMaterial, Vector3 } from "babylonjs";
import { scene } from "./scene";

export function makeCube(): Mesh {

    // const cube = MeshBuilder.CreateBox("Cube", { size: 1});
    const cube = MeshBuilder.CreateTorus("torus1", { diameter: 1, thickness: 0.5, tessellation: 20 }, scene);
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

    const torus = MeshBuilder.CreateTorus("torus2", { diameter: 1, thickness: 0.5, tessellation: 20 }, scene);
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
        ball.position.x = -5 + Math.random()*10;
        ball.position.y = 5 + Math.random()*2;
        ball.position.z = -5 + Math.random()*10;
        ball.material = ballMaterial;

        ball.physicsImpostor = new PhysicsImpostor(ball, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
        shadowGenerator.addShadowCaster(ball);
        // ball.receiveShadows = true;
        balls.push(ball);
    }
}

export function makeCubes(): void {

    const N = 10;

    const shadowGenerator = scene.getLightByName("spot")?.getShadowGenerator() as ShadowGenerator;

    const ballMaterial = new StandardMaterial("yellow", scene);
    ballMaterial.diffuseColor = Color3.Yellow();

    const balls: Mesh[] = [];
    for(var i=0; i<N; i++) {
        const ball = MeshBuilder.CreateBox("box"+i, { size: 0.3 });
        ball.position.x = -4 + Math.random()*8;
        ball.position.y = Math.random()*3+7;
        ball.position.z = -4 + Math.random()*8;
        ball.rotation = new Vector3(Math.random()*Math.PI*2, Math.random()*Math.PI*2, Math.random()*Math.PI*2);
        ball.material = ballMaterial;

        ball.physicsImpostor = new PhysicsImpostor(ball, PhysicsImpostor.BoxImpostor, { mass: 5, restitution: 0.3 }, scene);
        shadowGenerator.addShadowCaster(ball);
        // ball.receiveShadows = true;
        balls.push(ball);
    }
}
