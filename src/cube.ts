
import { Color3, Material, Mesh, MeshBuilder, PhysicsImpostor, Scalar, ShadowGenerator, StandardMaterial, Vector3 } from "babylonjs";
import { scene } from "./scene";


export function makeCubes(): void {

    const N = 500;

    const shadowGenerator = scene.getLightByName("spot")?.getShadowGenerator() as ShadowGenerator;

    const K = 5;
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

    const ins: Mesh[] = [];
    for(var i=0; i<K; i++) {
        const ball = MeshBuilder.CreatePolyhedron("ins"+i, { type: Math.trunc(Scalar.RandomRange(2,5)), size: 0.35 });
        ball.material = mats[Math.trunc(Math.random()*K)];
        ball.isVisible = false;
        ins.push(ball);
    }

    for(var i=0; i<N; i++) {
        const ball = ins[i%K].createInstance("box"+i);
        ball.position.x = Scalar.RandomRange(-20, 20);
        ball.position.y = Scalar.RandomRange(25, 35);
        ball.position.z = Scalar.RandomRange(-20, 20);
        ball.physicsImpostor = new PhysicsImpostor(ball, PhysicsImpostor.MeshImpostor, { mass: 2, friction: 0.7, restitution: 0.1 }, scene);
        shadowGenerator.addShadowCaster(ball);

        setInterval(()=>{ 
            ball.physicsImpostor?.setAngularVelocity(Vector3.Zero());
            ball.physicsImpostor?.setLinearVelocity(Vector3.Zero());
            ball.position.x = Scalar.RandomRange(-20, 20);
            ball.position.y = Scalar.RandomRange(25, 35);
            ball.position.z = Scalar.RandomRange(-20, 20);
        }, Math.trunc(Scalar.RandomRange(10,30))*1000);
    }

    for(const k of ins) {
        scene.removeMesh(k);
    }
}
