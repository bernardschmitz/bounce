
import { Color3, Color4, Light, Mesh, MeshBuilder, PhysicsImpostor, Scalar, ShadowGenerator, SolidParticleSystem, StandardMaterial, Vector3 } from "babylonjs";
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
        ball.position.x = Scalar.RandomRange(-10, 10);
        ball.position.y = Scalar.RandomRange(5, 10);
        ball.position.z = Scalar.RandomRange(-10, 10);
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
        const ball = MeshBuilder.CreateBox("box"+i, { size: 0.7 });

        ball.position.x = Scalar.RandomRange(-10, 10);
        ball.position.y = Scalar.RandomRange(5, 10);
        ball.position.z = Scalar.RandomRange(-10, 10);

        ball.material = ballMaterial;

        ball.edgesColor = new Color4(0.0, 0.0, 0.0, 1.0);
        ball.enableEdgesRendering();

        ball.physicsImpostor = new PhysicsImpostor(ball, PhysicsImpostor.BoxImpostor, { mass: 2, restitution: 0.5 }, scene);
        shadowGenerator.addShadowCaster(ball);
        // ball.receiveShadows = true;
        balls.push(ball);
    }
}

export function makeSPS(): void {

    const SPS = new SolidParticleSystem("SPS", scene);
    const poly = MeshBuilder.CreatePolyhedron("p", { type: 2, size: 0.5 }, scene);
    poly.edgesColor = new Color4(0.0, 0.0, 0.0, 1.0);
    // poly.edgesShareWithInstances = true;
    poly.enableEdgesRendering();
    SPS.addShape(poly, 100);
    poly.dispose();

    const mesh = SPS.buildMesh();

    SPS.initParticles = () => {
        for(let i=0; i<SPS.nbParticles; i++) {
            const p = SPS.particles[i];
            p.position.x = Scalar.RandomRange(-10, 10);
            p.position.y = Scalar.RandomRange(0, 10);
            p.position.z = Scalar.RandomRange(-10, 10);
            p.color = new Color4(Math.random()*0.5+0.5, Math.random()*0.5+0.5, Math.random()*0.5+0.5, 1.0);
        }
    }

    SPS.initParticles();
    SPS.setParticles();

    mesh.edgesColor = new Color4(0.0, 0.0, 0.0, 1.0);
    // mesh.edgesShareWithInstances = true;
    mesh.enableEdgesRendering();

}
