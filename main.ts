import * as THREE from 'three';
//import { plane } from '/plane';
import { setupKeyLogger } from './ts/controls/controls.js';
import { hideCursorAndShowCrosshair } from './ts/controls/handle_cursor.js'
import { playerMove } from './ts/controls/movement.js';
import { plane, skybox, startingCircle } from './ts/models/environment';
import { aimCircles, stopGame, gameStarted, gameStartTime } from './ts/game_logic/game_logic';
import { currentSettings } from './ts/game_logic/settings.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { textMesh } from './ts/models/text_models.js';

const scene = new THREE.Scene();

// Camera things
const camera = new THREE.PerspectiveCamera( 74, window.innerWidth / window.innerHeight, 0.1, 2000 );
let cameraPos = new THREE.Vector3(5,3,-6);
let cameraTarget = new THREE.Vector3(0,0,0);
const up = new THREE.Vector3(0,1,0);
let cameraDir = cameraPos.clone().sub(cameraTarget);
cameraDir.normalize();

let cameraRight = new THREE.Vector3().crossVectors(up, cameraDir).normalize();

camera.position.set(0,4,-6);
camera.rotation.x -= Math.PI / 180;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// arena
const loader = new GLTFLoader();

const texture = new THREE.TextureLoader().load( "assets/textures/tekstuuri.png" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 10, 10 );


loader.load('assets/bin/room.glb', function (gltf) {
    const model = gltf.scene;
    //model.rotation.x -= (Math.PI / 180) *;
    model.position.y += 1;
    var mat;
    var geo;
    gltf.scene.traverse( function( object ) {            
                   if ((object instanceof THREE.Mesh))
                    {   
                        object.receiveShadow = true;
                        mat = object.material;
                        geo = object.geometry;
                        mat.map = texture;
                    }
                });
    scene.add(model); })

let sparkModel: THREE.Group<THREE.Object3DEventMap>;
let sparkAnimations: THREE.AnimationClip[];
//
let mixer = new THREE.AnimationMixer(camera);

loader.load('../../assets/bin/spark_mini.glb', function(gltf) {
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




const light = new THREE.AmbientLight( 0x404040, 30);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 30, 0);
directionalLight.target.position.set(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.near = 3
directionalLight.shadow.camera.far = camera.far;
directionalLight.shadow.camera.left = -15
directionalLight.shadow.camera.right = 15
directionalLight.shadow.camera.bottom = -15
directionalLight.shadow.camera.top = 15

directionalLight.shadow.mapSize.x = 2048;
directionalLight.shadow.mapSize.y = 2048;

scene.add(directionalLight);
/**
 * clock to handle movement
 */
const clock = new THREE.Clock();

/**
 * direction vector and function to update looks
 */

// MOUSE LOCK to prevent cursor not falling from screen
var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;
console.log(currentSettings);


window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });


//startBasicGame(clock, scene);
textMesh.position.y += 5;
scene.add( plane, skybox, light, startingCircle, textMesh );

function animate() {
	requestAnimationFrame( animate );
    let delta = clock.getDelta();
    mixer.update(delta);
    playerMove(camera, delta);
    
    if (gameStarted) {
        if (clock.getElapsedTime() - gameStartTime >= 30) {
            stopGame(scene);
        }
    }
    
	renderer.render( scene, camera );
}



/**
 * Cuben ja kameran liikkuminen maailmassa pitää määritellä tämänhetkisen cameran posen mukaan
 */

//calculateMouseMovement();
hideCursorAndShowCrosshair();
setupKeyLogger();
animate();

export { scene, camera, clock, createSparkAnimation };
