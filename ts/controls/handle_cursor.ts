import { fire } from "../game_logic/shooting";
import { scene, camera } from "../../main";
import * as THREE from 'three';
// Get references to the canvas and crosshair elements
const body = document.getElementById("threejs-body")!;
const crosshair = document.getElementById("crosshair")!;

// Function to hide the cursor and show the crosshair
function hideCursorAndShowCrosshair() {
    body.style.cursor = "auto"; // Hide the cursor
    crosshair.style.display = "block"; // Show the crosshair
}

// Function to show the cursor and hide the crosshair
function showCursorAndHideCrosshair() {
    body.style.cursor = "auto"; // Show the cursor
    crosshair.style.display = "none"; // Hide the crosshair
}

let yaw = 90;
let pitch = 0;
let sensitivity = 0.1;
let newDirection = new THREE.Vector3();

// first time run to get orientation 
// NOT WORKING NOW
//mouseMoveEvent({movementX : 0, movementY : 0}, camera);

// Add event listeners to the canvas
body.addEventListener("mouseenter", hideCursorAndShowCrosshair);
body.addEventListener("mouseleave", showCursorAndHideCrosshair);

export function mouseMoveEvent(event) {
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

function handleMouseClick(event) {
    if (event.button == 0) {
        fire(camera, scene);
    }
}

body.addEventListener("mousedown", handleMouseClick);






export {hideCursorAndShowCrosshair};