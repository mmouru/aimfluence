import { fire } from "../game_logic/shooting";
import { scene, camera } from "../../main";
// Get references to the canvas and crosshair elements
const body = document.getElementById("threejs-body");
const crosshair = document.getElementById("crosshair");

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

// Add event listeners to the canvas
body.addEventListener("mouseenter", hideCursorAndShowCrosshair);
body.addEventListener("mouseleave", showCursorAndHideCrosshair);

function handleMouseClick(event) {
    if (event.button == 0) {
        fire(camera, scene);
    }
}

body.addEventListener("mousedown", handleMouseClick);






export {hideCursorAndShowCrosshair};