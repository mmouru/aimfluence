import * as THREE from 'three';

const crosshairColor = new THREE.Color(1, 1, 0)
const crosshairMaterial = new THREE.LineBasicMaterial({ color: crosshairColor });

// 2. Define the crosshair's positions
const lineLength = 0.2; // Adjust the length of the lines as needed
const crosshairGeometry = new THREE.BufferGeometry();
const positions = new Float32Array([
  0, lineLength, 0,
  0, -lineLength, 0,
  lineLength, 0, 0,
  -lineLength, 0, 0,
  0, 0, 0, // Add a central point (optional)
]);
crosshairGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// 3. Create the crosshair object and add it to the scene
const crosshair = new THREE.LineSegments(crosshairGeometry, crosshairMaterial);

export { crosshair }
