
import { Color4, CreateBox, Mesh, ParticleSystem, PointerEventTypes, SphereParticleEmitter, Texture, Vector3 } from "babylonjs";
import { scene } from "./scene";


export function makeExplosion(): Mesh {

    const exp = new ParticleSystem("flame", 2000, scene);

    //Texture of each particle
    exp.particleTexture = new Texture("textures/CloudSpriteSheet.png");
    
    exp.spriteCellHeight = 256;
    exp.spriteCellWidth = 256;
    exp.startSpriteCellID = 0;
    exp.endSpriteCellID = 0;
    exp.spriteCellChangeSpeed = 1
    exp.isAnimationSheetEnabled = true;


    exp.minEmitPower = 10;
    exp.maxEmitPower = 16;

    exp.minLifeTime = 1.25;
    exp.maxLifeTime = 2.0;

    exp.emitRate = 2000;

    exp.addSizeGradient(0, 1);
    exp.addSizeGradient(0.5, 5);
    exp.addSizeGradient(0.8, 15);
    exp.addSizeGradient(1.0, 20);

    exp.addDragGradient(0, 0.1);
    exp.addDragGradient(0.8, 0.2);
    exp.addDragGradient(1.0, 0.8);

    exp.updateSpeed = 0.03;
    exp.targetStopDuration = 0.5;

    exp.blendMode = ParticleSystem.BLENDMODE_STANDARD;

    exp.minAngularSpeed = 0.0;
    exp.maxAngularSpeed = 1.5;
    exp.minInitialRotation = 0.0;
    exp.maxInitialRotation = 5.0;

    exp.color1 = Color4.FromHexString('#FFD5353C');
    exp.color2 = Color4.FromHexString('#FF22003C');
    exp.colorDead = Color4.FromHexString('#00000080');

    exp.addColorGradient(0.0, new Color4(1,1,1,1), new Color4(1,1,1,1));
    exp.addColorGradient(0.1, Color4.FromHexString('#FFE26080'), Color4.FromHexString('#E2C02580'));
    exp.addColorGradient(0.4, Color4.FromHexString('#FF262680'), Color4.FromHexString('#CA2A2A80'));
    exp.addColorGradient(0.7, Color4.FromHexString('#00000040'), Color4.FromHexString('#00000080'));
    exp.addColorGradient(1.0, Color4.FromHexString('#00000000'), Color4.FromHexString('#00000000'));

    const pos = new Vector3(0, 5, 0);
    const emitter = new SphereParticleEmitter(1.0);

    // Position where the particles are emiited from
    exp.emitter = pos;
    // const smokeEmitter = exp.createSphereEmitter(1.0);
    exp.particleEmitterType = emitter;


    const sparks = new ParticleSystem("sparks", 150, scene);

    //Texture of each particle
    sparks.particleTexture = new Texture("textures/flare.png");


    sparks.minEmitPower = 10;
    sparks.maxEmitPower = 16;

    sparks.minLifeTime = 1.25;
    sparks.maxLifeTime = 2.50;

    sparks.emitRate = 1000;

    sparks.minSize = 0.4;
    sparks.maxSize = 0.6;

    sparks.minScaleX = 1.0;
    sparks.maxScaleX = 2.0;
    sparks.minScaleY = 1.0;
    sparks.maxScaleY = 2.0;


    sparks.addDragGradient(0, 0.1);
    sparks.addDragGradient(0.8, 0.2);
    sparks.addDragGradient(1.0, 0.8);

    sparks.updateSpeed = 0.06;
    sparks.targetStopDuration = 0.75;

    sparks.blendMode = ParticleSystem.BLENDMODE_ONEONE;

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

    scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
            case PointerEventTypes.POINTERTAP:
                // console.log(node.position);
                // particleSystem.emitter = node.position;
                // sparks.emitter = node.position;
                exp.start();
                sparks.start();
            break;
        }
    });

    // scene.onBeforeRenderObservable.add(() => {
    //     exp.emitter = node.position;
    //     sparks.emitter = node.position;
    // });

    const bang = CreateBox("bang", { size: 0.1 });
    bang.isVisible = true;

    sparks.emitter = bang;
    exp.emitter = bang;

    bang.position = pos;

    return bang;
}
