
import { Animation, Behavior, Color3, CSG, FadeInOutBehavior, GroundMesh, HingeJoint, Mesh, MeshBuilder, MotorEnabledJoint, PhysicsImpostor, PhysicsJoint, Scalar, SceneLoaderAnimationGroupLoadingMode, ShadowGenerator, StandardMaterial, Vector3 } from "babylonjs";
import { scene } from "./scene";

export function makeGround(): void {
    
    const size = 500;
    // const g = MeshBuilder.CreateGround("Ground", { width: size, height: size}, scene);
    const ground = MeshBuilder.CreateBox("Ground", { width: size, depth: size, height: 0.5}, scene);
    // ground.position.y -= 0.25;
    // const ground = MeshBuilder.CreateCylinder("Ground", { diameter: size, height:0.2, tessellation: 30 }, scene);

    const gmesh: Mesh[] = [];

    gmesh.push(ground);

    // const g = MeshBuilder.CreatePolyhedron("Ground", { type: 3, size: 2 }, scene);
    // const g = MeshBuilder.CreateSphere("Ground", { diameter: 4 });
    // const g = MeshBuilder.CreateBox("Ground", { size: 4 });
    
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    // ground.physicsImpostor = new PhysicsImpostor(g, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1, friction: 0.75 }, scene);
    // g.physicsImpostor = new PhysicsImpostor(g, PhysicsImpostor.MeshImpostor, { mass: 0, restitution: 0.1, friction: 0.75 }, scene);
    // g.position = new Vector3(0, -1, 0);
    // g.rotate(new Vector3(1,0,1), Math.PI/2);
    // ground.receiveShadows = true;
    ground.isVisible = false;

    const N = 100;

    // const box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
    // box.isVisible = false;

    for(let i=0; i<N; i++) {
        const s = Scalar.RandomRange(0.5, 3);
        const g = MeshBuilder.CreateBox("Ground"+i, { size: s }, scene);
        // const g = box.clone("Ground"+i);
        g.isVisible = false;
        // g.scaling = new Vector3(s, s, s);
        g.position = new Vector3(Math.trunc(Scalar.RandomRange(-20, 20)), s/2, Math.trunc(Scalar.RandomRange(-20, 20)));
        // g.physicsImpostor = new PhysicsImpostor(g, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1, friction: 0.75 }, scene);
        // g.receiveShadows = true;
        gmesh.push(g);

        // g.physicsImpostor = new PhysicsImpostor(g, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
        g.parent = ground;
    }   

    const gr = Mesh.MergeMeshes(gmesh, false);
    gr.receiveShadows = true;
    gr?.parent = ground;
    // gr.enableEdgesRendering();

    for(let k of gmesh) {
        k.physicsImpostor = new PhysicsImpostor(k, PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    }

    // ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.NoImpostor, { mass: 0, restitution: 0.1, friction: 0.75 }, scene);


    // const shadowGenerator = scene.getLightByName("spot")?.getShadowGenerator() as ShadowGenerator;
    // if(shadowGenerator == null) {
    //     throw "shadowGenerator not found";
    // }
    // shadowGenerator.addShadowCaster(gr);

    // gr.physicsImpostor = new PhysicsImpostor(g, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1, friction: 0.75 }, scene);

    // for(let x=-10; x<=10; x+=1) {
    //     for(let z=-10; z<=10; z+=1) {
    //         if(x == 0 && z == 0) continue;
    //         const g = MeshBuilder.CreateCylinder("Ground"+x+"."+z, { diameter: size, height:0.2, tessellation: 30 }, scene);
    //         g.position.x = x*6;
    //         g.position.y = 0;
    //         g.position.z = z*6;
    //         g.physicsImpostor = new PhysicsImpostor(g, PhysicsImpostor.MeshImpostor, { mass: 0, restitution: 0.1, friction: 0.75 }, scene);
    //         g.receiveShadows = true;

    //         gmesh.push(g);

    //     }
    // }



    // for(let x=-10; x<=10; x+=1) {
    //     for(let z=-10; z<=10; z+=1) {
    //         if(x == 0 && z == 0) continue;
    //         const g = MeshBuilder.CreateCylinder("Groundq"+x+"."+z, { diameter: size/1.5, height:0.2, tessellation: 30 }, scene);
    //         g.physicsImpostor = new PhysicsImpostor(g, PhysicsImpostor.MeshImpostor, { mass: 0, restitution: 0.1, friction: 0.75 }, scene);
    //         g.position.x = x*6;
    //         g.position.y = 5;
    //         g.position.z = z*6;
    //         // g.position.add(new Vector3(-3,6,3));
    //         g.receiveShadows = true;

    //         gmesh.push(g);
    //     }
    // }

    // const ground = Mesh.MergeMeshes(gmesh) as Mesh;
    // ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.MeshImpostor, { mass: 0, restitution: 0.1, friction: 0.75 }, scene);

    // ground.receiveShadows = true;

    // const fade = new FadeInOutBehavior();
    // fade.delay = 1000;
    // fade.fadeInTime = 500;
    // fade.attach(ground);
    // fade.init();
    // fade.fadeIn(true);

    // let doFadeIn = false;
    // setInterval(() => {
    //     if(doFadeIn) {
    //         setTimeout(()=>{ 
    //             ground.physicsImpostor?.dispose();
    //         }, fade.delay+fade.fadeInTime/2);
    //     }
    //     else {
    //         setTimeout(()=>{
    //             ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.MeshImpostor, { mass: 0, restitution: 0.1, friction: 0.75 }, scene);
    //         }, fade.delay+fade.fadeInTime/2);
    //     }
    //     fade.fadeIn(doFadeIn);
    //     doFadeIn = !doFadeIn;
    // }, 10000);


    // return ground;
}
