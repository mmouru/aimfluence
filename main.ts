import * as THREE from 'three';
//import { plane } from '/plane';
import { setupKeyLogger } from './ts/controls/controls.js';
import { hideCursorAndShowCrosshair } from './ts/controls/handle_cursor.js'
import { playerMove } from './ts/controls/movement.js';
import { plane, shootingWall, skybox } from './ts/models/environment';
import { aimCircles, startGame } from './ts/game_logic/game_logic';
import { currentSettings } from './ts/game_logic/settings.js';

const scene = new THREE.Scene();

// Camera things
const camera = new THREE.PerspectiveCamera( 74, window.innerWidth / window.innerHeight, 0.1, 2000 );
let cameraPos = new THREE.Vector3(5,2,-6);
let cameraTarget = new THREE.Vector3(0,0,0);
const up = new THREE.Vector3(0,1,0);
let cameraDir = cameraPos.clone().sub(cameraTarget);
cameraDir.normalize();

let cameraRight = new THREE.Vector3().crossVectors(up, cameraDir).normalize();

camera.position.copy(cameraPos);
camera.rotation.x -= Math.PI / 180;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

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
const deleteMeshAfterTime = 5.0;

function removeMissedTargets(clock: THREE.Clock, scene: THREE.Scene) {
    const timeNow = clock.getElapsedTime();
    aimCircles.forEach(circle => {
        if(timeNow - circle.createTime > deleteMeshAfterTime) {
            // remove circle from render
            scene.remove(circle.mesh);
            // discard mesh buffers from memory;
            circle.mesh.geometry.dispose();
        }
    });
}

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });


startGame(clock, scene);

scene.add( plane, shootingWall, skybox);

function animate() {
	requestAnimationFrame( animate );
    let delta = clock.getDelta();
    playerMove(camera, delta);
    
    removeMissedTargets(clock, scene);
	renderer.render( scene, camera );
}



/**
 * Cuben ja kameran liikkuminen maailmassa pitää määritellä tämänhetkisen cameran posen mukaan
 */

//calculateMouseMovement();
hideCursorAndShowCrosshair();
setupKeyLogger();
animate();

export { scene, camera, clock };
