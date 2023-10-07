import * as THREE from 'three';

// initial values
let moveForward = false;
let moveBackward = false;
let moveRight = false;
let moveLeft = false;

const up = new THREE.Vector3(0, 1, 0);

const movementSpeed = 100.0;

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

function calculateRightVector(cameraDir) {
    const rightVector =  new THREE.Vector3();
    return rightVector.crossVectors(cameraDir, up);
}

export function playerMove(camera, delta) {

    // brake movement 
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.y -= velocity.y * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    // add movement speed to velocity
    if (moveForward) velocity.z -= movementSpeed * delta;
    if (moveBackward) velocity.z += movementSpeed * delta;
    if (moveRight) velocity.x += movementSpeed * delta;
    if (moveLeft) velocity.x -= movementSpeed * delta;

    // move player model in space
    camera.translateX( velocity.x * delta);
    camera.translateZ( velocity.z * delta);
}
