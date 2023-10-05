// Get references to the canvas and crosshair elements
const body = document.getElementById("threejs-body");
const crosshair = document.getElementById("crosshair");

// Function to hide the cursor and show the crosshair
function hideCursorAndShowCrosshair() {
    body.style.cursor = "none"; // Hide the cursor
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
 
/**
 * Looking around functions
 */

let sensitivity = 1;
// crosshair in middle of the screen
let lastX = body.clientWidth / 2;
let lastY = body.clientHeight / 2

export let yaw = -90;
export let pitch = 0;

function calculateMouseMovement() {
    document.addEventListener('mousemove', (event) => {
        // Get the mouse coordinates from the event
        let xoffset = event.clientX - lastX;
        let yoffset = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;
        xoffset *= sensitivity;
        yoffset *= sensitivity;
        console.log(xoffset, yoffset)
        yaw += xoffset;
        pitch += yoffset;
        // Display the mouse coordinates in your desired format
      });
    
}

export {hideCursorAndShowCrosshair, calculateMouseMovement};