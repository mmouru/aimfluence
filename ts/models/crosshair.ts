import * as THREE from 'three';

const crosshairMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

// 2. Define the lines' positions
const lineLength = 1; // Adjust the length of the lines as needed
const crosshairGeometry = new THREE.BufferGeometry();
const positions = new Float32Array([
  -lineLength, 0, 0,
  lineLength, 0, 0,
  0, -lineLength, 0,
  0, lineLength, 0,
]);
crosshairGeometry.setIndex([0, 1, 2, 3]);

// 3. Create line objects and add them to the scene
const crosshair = new THREE.LineSegments(crosshairGeometry, crosshairMaterial);

export { crosshair }
