
import { Animation, Color3, FadeInOutBehavior, GroundMesh, HingeJoint, Mesh, MeshBuilder, MotorEnabledJoint, PhysicsImpostor, PhysicsJoint, Scalar, SceneLoaderAnimationGroupLoadingMode, StandardMaterial, Vector3 } from "babylonjs";
import { scene } from "./scene";

export function makeGround(): void {
    
    const size = 5;
    // const ground = MeshBuilder.CreateGround("Ground", { width: size, height: size}, scene);
    // const ground = MeshBuilder.CreateCylinder("Ground", { diameter: size, height:0.2, tessellation: 30 }, scene);

    const gmesh: Mesh[] = [];

    const g = MeshBuilder.CreatePolyhedron("Ground", { type: 2, size: 2 }, scene);
    g.physicsImpostor = new PhysicsImpostor(g, PhysicsImpostor.MeshImpostor, { mass: 100, restitution: 0.1, friction: 0.75 }, scene);
    g.position = new Vector3(0, -1, 0);
    g.rotate(new Vector3(1,0,1), Math.PI/2);
    g.receiveShadows = true;

    gmesh.push(g);

    for(let x=-10; x<=10; x+=1) {
        for(let z=-10; z<=10; z+=1) {
            if(x == 0 && z == 0) continue;
            const g = MeshBuilder.CreateCylinder("Ground"+x+"."+z, { diameter: size, height:0.2, tessellation: 5 }, scene);
            // const g = MeshBuilder.CreatePolyhedron("Ground"+x+"."+z, { type: 2, size: 2 }, scene);
            g.position.x = x*6;
            g.position.y = 0;
            g.position.z = z*6;
            // g.rotate(new Vector3(1,0,1), Math.PI/2);
            g.physicsImpostor = new PhysicsImpostor(g, PhysicsImpostor.MeshImpostor, { mass: 100, restitution: 0.1, friction: 0.75 }, scene);
            g.receiveShadows = true;

            // const axel = MeshBuilder.CreateCylinder("axel"+x+"."+z, { diameter:1.0, tessellation:10 }, scene);
            // // axel.rotation.y = -Math.PI/2.0;
            // axel.rotation.z = Math.PI/2.0;
            // axel.position.x = x*6;
            // axel.position.y = 0;
            // axel.position.z = z*6;
            // axel.physicsImpostor = new PhysicsImpostor(g, PhysicsImpostor.CylinderImpostor, { mass: 0, friction: 0 }, scene);
            // // scene.removeMesh(axel);

            // const joint = new HingeJoint({
            //     mainAxis: new Vector3(0, 1, 0),
            //     mainPivot: new Vector3(0, 1, 0),
            //     connectedAxis: new Vector3(0, 0, 1),
            //     connectedPivot: new Vector3(0, 0, 1)
            // });
            // g.physicsImpostor.addJoint(axel.physicsImpostor, joint);
            // joint.setMotor(1, 0.5);

            // const flip = new Animation("grot"+x+"."+z, "rotate.z", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
            // flip.setKeys([{frame:0, value:0}, {frame:30, value:Math.PI}, {frame:60, value:0}]);
            // g.animations.push(flip);

            // setTimeout(()=>scene.beginAnimation(g, 0, 60, false)), Math.trunc(2000+Math.random()*10000);

            // scene.beginAnimation(g, 0, 60, false);

            gmesh.push(g);
        }
    }

    scene.onBeforePhysicsObservable.add(() => {

        for(let k of gmesh) {
            if(k.getAbsolutePosition().y < 0) {
                k.physicsImpostor?.applyImpulse(new Vector3(0,9.81/0.8,0), k.getAbsolutePosition());
            }
        }
    });


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
