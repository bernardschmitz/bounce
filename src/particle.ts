
import { Color4, CreateBox, Mesh, ParticleSystem, SphereParticleEmitter, Texture, Vector3 } from "babylonjs";
import { scene } from "./scene";


class ExplosionManager {

    private explosions:Explosion[] = [];

    constructor() {
        // do nothing
    }

    public addExplosion(position:Vector3):Explosion {
        
        const exp = new Explosion(position);
        exp.start();
        
        const i = this.explosions.findIndex((v) => !v.isAlive());
        if(i >= 0) {
            // console.log(i, this.explosions.length);
            this.explosions[i].dispose();
            this.explosions[i] = exp;
        }
        else {
            this.explosions.push(exp);
        }

        // console.log(this.explosions);

        return exp;
    }

    // public removeExplosion() {
    //     for(let k of this.explosions) {
    //         if(!k.isAlive()) {
    //             k.dispose();
    //         }
    //     }
    // }
};

class Explosion {

    private mesh;
    private flame;
    private sparks;

    constructor(position:Vector3) {
        [this.mesh, this.flame, this.sparks] = makeExplosion();
        this.mesh.position = position; 
    }

    public start():void {
        this.flame.start();
        this.sparks.start();
    }

    public isAlive():boolean {
        return this.flame.isAlive() || this.sparks.isAlive()
    }

    public dispose():void {
        this.flame.dispose();
        this.sparks.dispose();
        this.mesh.dispose();
    }
}


export const explosionManager = new ExplosionManager();



function makeExplosion(): [Mesh, ParticleSystem, ParticleSystem] {

    const exp = new ParticleSystem("flame", 250, scene);
    //Texture of each particle
    exp.particleTexture = new Texture("textures/CloudSpriteSheet.png");
    
    exp.spriteCellHeight = 256;
    exp.spriteCellWidth = 256;
    exp.startSpriteCellID = 0;
    exp.endSpriteCellID = 0;
    exp.spriteCellChangeSpeed = 1
    exp.isAnimationSheetEnabled = true;

    exp.minEmitPower = 2;
    exp.maxEmitPower = 5;

    exp.minLifeTime = 1.0;
    exp.maxLifeTime = 2.0;

    exp.emitRate = 4000;

    // exp.minSize = 0.5;
    // exp.maxSize = 2;

    exp.addSizeGradient(0, 0.5);
    exp.addSizeGradient(0.5, 2.0);
    exp.addSizeGradient(0.7, 3.0);
    exp.addSizeGradient(1.0, 5.0);

    exp.addDragGradient(0, 0.1);
    exp.addDragGradient(0.8, 0.2);
    exp.addDragGradient(1.0, 0.9);

    exp.updateSpeed = 0.05;
    exp.targetStopDuration = 0.2;

    exp.blendMode = ParticleSystem.BLENDMODE_STANDARD;

    exp.minAngularSpeed = 0.0;
    exp.maxAngularSpeed = 1.5;
    exp.minInitialRotation = 0.0;
    exp.maxInitialRotation = 5.0;

    // exp.color1 = Color4.FromHexString('#FFD5353C');
    // exp.color2 = Color4.FromHexString('#FF22003C');
    // exp.colorDead = Color4.FromHexString('#00000080');

    exp.addColorGradient(0.0, new Color4(1,1,1,1), new Color4(1,1,1,1));
    exp.addColorGradient(0.1, Color4.FromHexString('#FFE26080'), Color4.FromHexString('#E2C02580'));
    exp.addColorGradient(0.2, Color4.FromHexString('#FF262680'), Color4.FromHexString('#CA2A2A40'));
    exp.addColorGradient(0.4, Color4.FromHexString('#00000040'), Color4.FromHexString('#00000080'));
    exp.addColorGradient(1.0, Color4.FromHexString('#00000000'), Color4.FromHexString('#00000000'));

    const pos = new Vector3(0, 5, 0);
    const emitter = new SphereParticleEmitter(1.0);

    // Position where the particles are emiited from
    exp.emitter = pos;
    // const smokeEmitter = exp.createSphereEmitter(1.0);
    exp.particleEmitterType = emitter;


    const sparks = new ParticleSystem("sparks", 100, scene);

    //Texture of each particle
    sparks.particleTexture = new Texture("textures/flare.png");


    sparks.minEmitPower = 1;
    sparks.maxEmitPower = 10;

    sparks.minLifeTime = 0.5;
    sparks.maxLifeTime = 1.50;

    sparks.emitRate = 100000;

    sparks.minSize = 0.05;
    sparks.maxSize = 0.1;

    sparks.minScaleX = 1.0;
    sparks.maxScaleX = 2.0;
    sparks.minScaleY = 1.0;
    sparks.maxScaleY = 2.0;


    sparks.addDragGradient(0, 0.1);
    sparks.addDragGradient(0.8, 0.2);
    sparks.addDragGradient(1.0, 0.8);

    sparks.updateSpeed = 0.03;
    sparks.targetStopDuration = 0.1;

    sparks.blendMode = ParticleSystem.BLENDMODE_ONEONE;

    sparks.gravity = new Vector3(0, -4, 0);

    sparks.minAngularSpeed = 0.0;
    sparks.maxAngularSpeed = 0.0;
    sparks.minInitialRotation = 0.0;
    sparks.maxInitialRotation = 0.0;

    sparks.color1 = Color4.FromHexString('#FFD5353C');
    sparks.color2 = Color4.FromHexString('#FF22003C');
    sparks.colorDead = Color4.FromHexString('#00000080');

    // Position where the particles are emiited from
    sparks.emitter = pos;
    // const sparksEmitter = sparks.createSphereEmitter(1.0);
    sparks.particleEmitterType = emitter;

    // scene.onPointerObservable.add((pointerInfo) => {
    //     switch (pointerInfo.type) {
    //         case PointerEventTypes.POINTERTAP:
    //             // console.log(node.position);
    //             // particleSystem.emitter = node.position;
    //             // sparks.emitter = node.position;
    //             exp.start();
    //             sparks.start();
    //         break;
    //     }
    // });

    // scene.onBeforeRenderObservable.add(() => {
    //     exp.emitter = node.position;
    //     sparks.emitter = node.position;
    // });

    const bang = CreateBox("bang", { size: 0.1 });
    bang.isVisible = false;

    sparks.emitter = bang;
    exp.emitter = bang;

    bang.position = pos;

    return [ bang, exp, sparks ];
}
