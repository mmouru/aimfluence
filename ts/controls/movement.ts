import * as THREE from 'three';

// initial values
let moveForward = false;
let moveBackward = false;
let moveRight = false;
let moveLeft = false;

const movementSpeed = 100.0;
const headHeight = 2;

let velocity = new THREE.Vector3();

export function startMovingForward() {
    moveForward = true;
}

export function stopMovingForward() {
    moveForward = false;
}

export function startMovingBackward() {
    moveBackward = true;
}

export function stopMovingBackward() {
    moveBackward = false;
}

export function startMovingRight() {
    moveRight = true;
}

export function stopMovingRight() {
    moveRight = false;
}

export function startMovingLeft() {
    moveLeft = true;
}

export function stopMovingLeft() {
    moveLeft = false;
}

export function playerMove(camera: THREE.Camera, delta: number) {

    // brake movement 
    velocity.x -= velocity.x * 13.0 * delta;
    velocity.y -= velocity.y * 13.0 * delta;
    velocity.z -= velocity.z * 13.0 * delta;

    // add movement speed to velocity
    if (moveForward) velocity.z -= movementSpeed * delta;
    if (moveBackward) velocity.z += movementSpeed * delta;
    if (moveRight) velocity.x += movementSpeed * delta;
    if (moveLeft) velocity.x -= movementSpeed * delta;

    // sideways
    camera.translateX( velocity.x * delta);
    // forward
    camera.translateZ( velocity.z * delta);
    // restrict the camera to be at head height always
    camera.position.y = headHeight;
}
