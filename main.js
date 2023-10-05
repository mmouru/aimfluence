import * as THREE from 'three';
//import { plane } from '/plane';
import { setupKeyLogger } from '/controls.js';
import { hideCursorAndShowCrosshair, calculateMouseMovement, yaw, pitch } from '/handle_cursor.js'
import { radians } from '/helper.js';

const scene = new THREE.Scene();

// Camera things
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let cameraPos = new THREE.Vector3(0,2,5);
let cameraTarget = new THREE.Vector3(0,0,0);
const up = new THREE.Vector3(0,1,0);
let cameraDir = cameraPos.clone().sub(cameraTarget);
cameraDir.normalize();

let cameraRight = new THREE.Vector3().crossVectors(up, cameraDir).normalize();

let cameraUp = new THREE.Vector3().crossVectors(cameraDir, cameraRight);

camera.position.copy(cameraPos);

camera.rotation.x -= Math.PI / 100;

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

//camera.lookAt(cube.position)

var planeGeometry = new THREE.PlaneGeometry(25, 25); // Width and height of the plane
var planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -Math.PI / 2;

/**
 * clock to handle everything
 */
const clock = new THREE.Clock();

/**
 * direction vector and function to update looks
 */


function updateCameraDirection() {
    //console.log(cameraParams.yaw)
    //console.log(Math.cos(radians(cameraParams.yaw)) * Math.cos(radians(cameraParams.pitch)))
    direction.x = Math.cos(radians(yaw)) * Math.cos(radians(pitch));
    direction.z = Math.sin(radians(yaw)) * Math.cos(radians(pitch));
    direction.y = Math.sin(radians(pitch));
    camera.lookAt(direction);
    //console.log("moeooo ", yaw, pitch)
    //console.log(direction)
}


let direction = new THREE.Vector3();
direction.x = Math.cos(radians(yaw)) * Math.cos(radians(pitch));
direction.z = Math.sin(radians(yaw)) * Math.cos(radians(pitch));
direction.y = Math.sin(radians(pitch));

// add plane
scene.add( plane );

camera.position.y = 2;

function animate() {
	requestAnimationFrame( animate );
    const deltaTime = clock.getDelta();
	cube.position.x += 0 * deltaTime;
    updateCameraDirection();
    //console.log(camera.getWorldDirection(new THREE.Vector3()))
	renderer.render( scene, camera );
}

/**
 * Cuben ja kameran liikkuminen maailmassa pitää määritellä tämänhetkisen cameran posen mukaan
 */

calculateMouseMovement();
hideCursorAndShowCrosshair();
setupKeyLogger(cube, camera);
animate();
