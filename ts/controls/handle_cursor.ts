import { fire } from "../game_logic/shooting";
import { scene, camera } from "../../main";
import * as THREE from 'three';
import { currentSettings } from "../game_logic/settings";
// Get references to the canvas and crosshair elements
const body = document.getElementById("threejs-body")!;

let yaw = 90;
let pitch = 0;

let newDirection = new THREE.Vector3();

// first time run to get orientation 
// NOT WORKING NOW
//mouseMoveEvent({movementX : 0, movementY : 0}, camera);

// Add event listeners to the canvas

export function mouseMoveEvent(event) {
    let deltaX = event.movementX || 0;
    let deltaY = event.movementY || 0;
    
    yaw += deltaX * currentSettings.sensitivity / 10;
    pitch -= deltaY * currentSettings.sensitivity / 10;
    // camera should not rotate over
    
    pitch = pitch > 89.0 ? 89.0 : pitch;
    pitch = pitch < -89.0 ? -89.0 : pitch;
    console.log(pitch, yaw)

    newDirection.x = Math.cos(THREE.MathUtils.degToRad(yaw)) * 
                     Math.cos(THREE.MathUtils.degToRad(pitch));

    newDirection.y = Math.sin(THREE.MathUtils.degToRad(pitch));

    newDirection.z = Math.sin(THREE.MathUtils.degToRad(yaw)) * 
                     Math.cos(THREE.MathUtils.degToRad(pitch));

    // make the camera look at the new calculated rotation from the point of
    // the cameras position

    // this causes some bug that camera looks at certain direction but cant rotate 
    console.log(newDirection.normalize());
    camera.lookAt(camera.position.clone().add(newDirection.normalize()));
};

function handleMouseClick(event) {
    const canShoot = document.pointerLockElement === document.body;
    if (canShoot && event.button == 0) {
        fire(camera, scene);
    }
}

body.addEventListener("mousedown", handleMouseClick);
