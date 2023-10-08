import * as THREE from 'three';
//import { plane } from '/plane';
import { setupKeyLogger } from '/controls.js';
import { hideCursorAndShowCrosshair } from '/handle_cursor.js'
import { playerMove } from '/movement.js';
import { plane, plane2 } from '/environment.js';

const scene = new THREE.Scene();

// Camera things
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let cameraPos = new THREE.Vector3(5,2,-6);
let cameraTarget = new THREE.Vector3(0,0,0);
const up = new THREE.Vector3(0,1,0);
let cameraDir = cameraPos.clone().sub(cameraTarget);
cameraDir.normalize();

let cameraRight = new THREE.Vector3().crossVectors(up, cameraDir).normalize();

let cameraUp = new THREE.Vector3().crossVectors(cameraDir, cameraRight);

camera.position.copy(cameraPos);

camera.rotation.x -= Math.PI / 180;

const texture = new THREE.TextureLoader().load('grass_texture.jpg');

const grass_material = new THREE.MeshBasicMaterial({ map:texture })

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, grass_material );
cube.position.y += 0.5;
scene.add( cube );



/**
 * clock to handle movement
 */
const clock = new THREE.Clock();

/**
 * direction vector and function to update looks
 */
let sensitivity = 0.2;

let yaw = 0;
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



document.body.addEventListener("click", async () => {
    await document.body.requestPointerLock({
        unadjustedMovement: true,
    });
    //moveForward = true;
    document.addEventListener('mousemove', mouseMoveEvent);
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



// add plane
scene.add( plane, plane2 );
scene.add( plane2 );

function animate() {
	requestAnimationFrame( animate );
    let delta = clock.getDelta();
    playerMove(camera, delta);
    //console.log(camera.getWorldDirection(new THREE.Vector3()))
	renderer.render( scene, camera );
}

/**
 * Cuben ja kameran liikkuminen maailmassa pitää määritellä tämänhetkisen cameran posen mukaan
 */

//calculateMouseMovement();
hideCursorAndShowCrosshair();
setupKeyLogger(cube, camera);
animate();
