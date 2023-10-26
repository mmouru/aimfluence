import * as THREE from 'three';

// initial values
let moveForward = false;
let moveBackward = false;
let moveRight = false;
let moveLeft = false;

const movementSpeed = 100.0;
const headHeight = 4;

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

    // movement forward and sideways
    // does same as this
    // camera.translateX( velocity.x * delta);
    // camera.translateZ( velocity.z * delta);
    // currently walks faster in diagonal direction, pythagoran theorem...
    camera.translateOnAxis(new THREE.Vector3(velocity.x, 0, velocity.z), delta)

    // restrict movement to be inside the box
    camera.position.x = camera.position.x > 14.5 ? 14.5 : camera.position.x;
    camera.position.x = camera.position.x < -14.5 ? -14.5 : camera.position.x;
    camera.position.z = camera.position.z > 14.5 ? 14.5 : camera.position.z;
    camera.position.z = camera.position.z < -14.5 ? -14.5 : camera.position.z;
    // restrict the camera to be at head height always
    camera.position.y = headHeight;
}
