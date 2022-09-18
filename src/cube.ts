
import { Color3, Color4, FadeInOutBehavior, Light, Material, Mesh, MeshBuilder, PhysicsImpostor, Scalar, ShadowGenerator, StandardMaterial, Vector3 } from "babylonjs";
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

    const N = 100;

    const shadowGenerator = scene.getLightByName("spot")?.getShadowGenerator() as ShadowGenerator;

    const K = 100;
    const mats: Material[] = [];
    for(let i=0; i<K; i++) {
        const mat = new StandardMaterial("mat"+i, scene);
        mat.diffuseColor = new Color3(Scalar.RandomRange(0.25, 1.0), Scalar.RandomRange(0.25, 1.0), Scalar.RandomRange(0.25, 1.0));

        if(Math.random() > 0.75) {
            mat.diffuseColor.r *= 1.5;
        }
        else if(Math.random() > 0.75) {
            mat.diffuseColor.g *= 1.5;
        }
        else if(Math.random() > 0.75) {
            mat.diffuseColor.b *= 1.5;
        }

        mat.diffuseColor.clampToRef(0, 1, mat.diffuseColor);

        mats.push(mat);
    }

    const balls: Mesh[] = [];
    for(var i=0; i<N; i++) {
        // const ball = MeshBuilder.CreateBox("box"+i, { size: 0.7 });
        const ball = MeshBuilder.CreatePolyhedron("box"+i, { type: Math.trunc(Scalar.RandomRange(2,5)), size: 0.35 });

        ball.position.x = Scalar.RandomRange(-20, 20);
        ball.position.y = Scalar.RandomRange(25, 35);
        ball.position.z = Scalar.RandomRange(-20, 20);

        ball.material = mats[Math.trunc(Math.random()*K)];

        // ball.edgesColor = new Color4(0, 0, 0, 1);
        // ball.enableEdgesRendering();

        ball.physicsImpostor = new PhysicsImpostor(ball, PhysicsImpostor.MeshImpostor, { mass: 2, friction: 0.7, restitution: 0.1 }, scene);
        shadowGenerator.addShadowCaster(ball);
        // ball.receiveShadows = true;
        balls.push(ball);

        // const fade = new FadeInOutBehavior();
        // fade.delay = 0;
        // fade.fadeInTime = Math.trunc(Scalar.RandomRange(300, 500));
        // fade.attach(ball);
        // fade.init();
        // fade.fadeIn(true);

        // setInterval(() => {
            // const fade = new FadeInOutBehavior();
            // fade.delay = 0;
            // fade.fadeInTime = 1000;
            // fade.attach(ball);
            // fade.init();
            // fade.fadeIn(true);
            // fade.fadeIn(false);
            setTimeout(()=>{ 
                ball.physicsImpostor?.dispose();
                ball.dispose();
            }, Math.trunc(Scalar.RandomRange(10,30))*1000);
        // }, Math.trunc(Scalar.RandomRange(10000, 20000)));
    }
}
