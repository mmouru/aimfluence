import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { camera } from './camera';
import { scene } from '../../main';

const modelLoader = new GLTFLoader();
let sparkModel: THREE.Group<THREE.Object3DEventMap>;
let sparkAnimations: THREE.AnimationClip[];
//
let mixer = new THREE.AnimationMixer(camera);

// load model, do not yet add to scene
modelLoader.load('../../assets/bin/spark_mini.glb', function(gltf) {
    sparkModel = gltf.scene;
    sparkModel.scale.set(1.5,1.5,1.5)
    mixer = new THREE.AnimationMixer(sparkModel);
    //scene.add(model);
    sparkAnimations = gltf.animations;
    gltf.scene.traverse( function( object ) {
      
        if ((object instanceof THREE.Mesh))
        {   
             object.material.color = new THREE.Color(0xFFFF00); 
        }
    });
});

/**
 * Function to add spark animations when a target is hit
 * @param locationX number, location x of spark
 * @param locationY number, location y of spark
 * @param locationZ number, location z of spark
 * @param normal THREE.Vector3, the normal direction of target where hit
 */
function createSparkAnimation(locationX: number = 0, locationY: number = 0, locationZ: number = 0, normal: THREE.Vector3) {
    const newSpark = new THREE.Group<THREE.Object3DEventMap>;
    newSpark.copy(sparkModel);
    mixer = new THREE.AnimationMixer(newSpark);
    console.log(normal)

    newSpark.position.set(locationX, locationY, locationZ);
    newSpark.rotateOnAxis(normal, 90);
    scene.add(newSpark);
    for(let i = 0; i < 5; i++) {
        mixer.clipAction(sparkAnimations[i]).setLoop(THREE.LoopOnce, 1).play();
    }
    setTimeout(() => {
        scene.remove(newSpark);
        newSpark.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
                // Dispose of Mesh-related resources
                child.geometry.dispose();
                child.material.dispose();
              }
        });
    }, 200)
}

export { mixer, createSparkAnimation };