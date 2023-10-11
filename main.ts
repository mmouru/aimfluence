import * as THREE from 'three';
//import { plane } from '/plane';
import { setupKeyLogger } from './ts/controls/controls.js';
import { hideCursorAndShowCrosshair } from './ts/controls/handle_cursor.js'
import { playerMove } from './ts/controls/movement.js';
import { plane, shootingWall, skybox } from './ts/models/environment';
import { removeMissedTargets } from './helper';
import { aimCircles, startGame } from './ts/game_logic/game_logic';

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
let sensitivity = 0.1;

let yaw = 90;
let pitch = 0;

let newDirection = new THREE.Vector3();

function mouseMoveEvent(event) {
    let deltaX = event.movementX || 0;
    let deltaY = event.movementY || 0;
    
    yaw += deltaX * sensitivity;
    pitch -= deltaY * sensitivity;

    newDirection.x = Math.cos(THREE.MathUtils.degToRad(yaw)) * 
                     Math.cos(THREE.MathUtils.degToRad(pitch));
    newDirection.y = Math.sin(THREE.MathUtils.degToRad(pitch));
    newDirection.z = Math.sin(THREE.MathUtils.degToRad(yaw)) * 
                     Math.cos(THREE.MathUtils.degToRad(pitch));

    // make the camera look at the new calculated rotation from the point of
    // the cameras position
    camera.lookAt(camera.position.clone().add(newDirection.normalize()));
};

// first time run to get orientation
mouseMoveEvent({movementX : 0, movementY : 0});

// MOUSE LOCK to prevent cursor not falling from screen
var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;

const deleteMeshAfterTime = 5.0;

function removeMissedTargets(clock, scene) {
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

document.body.addEventListener("click", async () => {
    
    
});


window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });


let direction = new THREE.Vector3();
direction.x = Math.cos(THREE.MathUtils.degToRad(yaw)) * Math.cos(THREE.MathUtils.degToRad(pitch));
direction.z = Math.sin(THREE.MathUtils.degToRad(yaw)) * Math.cos(THREE.MathUtils.degToRad(pitch));
direction.y = Math.sin(THREE.MathUtils.degToRad(pitch));


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

export { scene, camera };