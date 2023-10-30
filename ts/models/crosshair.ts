import * as THREE from 'three';
import { camera } from './camera';
import { currentSettings, CrosshairRGBColor } from '../game_logic/settings';

let crosshairColor = new THREE.Color(0, 1, 0)
let crosshairLength = currentSettings.crosshairLength; // Adjust the length of the lines

// Define the crosshair's positions
let crosshairPosition = new THREE.Vector3();

// function to update crosshair length
function updateCrosshairLength(length: number) {
  crosshairLength = length;
  crosshair = initCrosshair();
}

function updateCrosshairColor(newColor: CrosshairRGBColor) {
  crosshairColor = new THREE.Color(newColor.r / 255, newColor.g / 255, newColor.b / 255);
  console.log(crosshairColor);
  crosshair = initCrosshair();
}

const crosshairGeometry = new THREE.BufferGeometry();
const positions = new Float32Array([
  0, crosshairLength, 0,
  0, -crosshairLength, 0,
  crosshairLength, 0, 0,
  -crosshairLength, 0, 0,
  0, 0, 0, // Add a central point (optional)
]);
crosshairGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Create the crosshair object and add it to the scene
//const crosshair = new THREE.LineSegments(crosshairGeometry, crosshairMaterial);
function initCrosshair() {
  const crosshairMaterial = new THREE.LineBasicMaterial({ color: crosshairColor });
  const crosshairGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array([
    0, crosshairLength, 0,
    0, -crosshairLength, 0,
    crosshairLength, 0, 0,
    -crosshairLength, 0, 0,
    0, 0, 0, // Add a central point (optional)
  ]);
  crosshairGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Create the crosshair object and add it to the scene
  return new THREE.LineSegments(crosshairGeometry, crosshairMaterial);
};

let crosshair = initCrosshair();

function updateCrosshairLocation() {
  
  camera.getWorldDirection(crosshairPosition);
  crosshairPosition.multiplyScalar(10);
  crosshairPosition.add(camera.position);
  crosshair.position.copy(crosshairPosition);
  crosshair.lookAt(camera.position);
};

export { crosshair, updateCrosshairLocation, updateCrosshairLength, updateCrosshairColor }
